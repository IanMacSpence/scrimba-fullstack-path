import { useEffect, useRef, useState } from 'react'
import he from 'he'
import { nanoid } from 'nanoid'
import { GAME_STATUS } from '../constants/gameStatus'

const TOKEN_STORAGE_KEY = 'opentdb-session-token'

// Kept as local helpers so App stays focused on rendering only.
function shuffleAnswers(correctAnswer, incorrectAnswers) {
  const newArray = [correctAnswer, ...incorrectAnswers]

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }

  return newArray
}

// Converts API response into the UI-friendly shape used by QuestionCard.
function normalizeQuestions(data) {
  return data.results.map(q => {
    const incorrectAnswers = q.incorrect_answers.map(a => he.decode(a))
    const correctAnswer = he.decode(q.correct_answer)
    return {
      id: nanoid(),
      question: he.decode(q.question),
      correctAnswer,
      possibleAnswers: shuffleAnswers(correctAnswer, incorrectAnswers),
      selectedAnswer: null,
    }
  })
}

export default function useQuizGame() {
  // 1) Core game state (moved from App.jsx)
  const [status, setStatus] = useState(GAME_STATUS.START)
  const [questions, setQuestions] = useState([])
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [quizOptions, setQuizOptions] = useState({
    amount: '5',
    category: '',
    difficulty: '',
  })

  // 2) Async control refs for race-condition safety (moved from App.jsx)
  // - inFlightRef: blocks rapid double-click requests in the same render frame
  // - abortControllerRef: lets us cancel the active fetch
  // - requestIdRef: ignores stale/out-of-order responses
  const inFlightRef = useRef(false)
  const abortControllerRef = useRef(null)
  const requestIdRef = useRef(0)
  const tokenRef = useRef(null)

  // 3) Derived state consumed by the UI
  const isLoading = status === GAME_STATUS.LOADING
  const isPlaying = status === GAME_STATUS.PLAYING
  const isChecked = status === GAME_STATUS.CHECKED

  const allAnswered = questions.every(q => q.selectedAnswer !== null)
  const numUnanswered = questions.filter(q => q.selectedAnswer === null).length

  const numQuestions = questions.length
  const numCorrect = isChecked
    ? questions.filter(q => q.correctAnswer === q.selectedAnswer).length
    : null

  // 4) User actions exposed to App
  function selectAnswer(questionId, answer) {
    setQuestions(prevQuestions =>
      prevQuestions.map(q =>
        q.id === questionId
          ? { ...q, selectedAnswer: answer }
          : q
      )
    )
  }

  function setQuizOption(name, value) {
    setQuizOptions(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  function createQuizUrl(token) {
    const params = new URLSearchParams()
    const parsedAmount = Number.parseInt(quizOptions.amount, 10)
    const safeAmount = Number.isFinite(parsedAmount)
      ? Math.min(50, Math.max(1, parsedAmount))
      : 5

    params.set('amount', String(safeAmount))

    if (quizOptions.category) {
      params.set('category', quizOptions.category)
    }

    if (quizOptions.difficulty) {
      params.set('difficulty', quizOptions.difficulty)
    }

    if (token) {
      params.set('token', token)
    }

    return `https://opentdb.com/api.php?${params.toString()}`
  }

  function saveToken(token) {
    tokenRef.current = token
    localStorage.setItem(TOKEN_STORAGE_KEY, token)
  }

  function clearToken() {
    tokenRef.current = null
    localStorage.removeItem(TOKEN_STORAGE_KEY)
  }

  async function requestSessionToken(signal) {
    const res = await fetch('https://opentdb.com/api_token.php?command=request', {
      signal,
    })

    if (!res.ok) {
      throw new Error('Failed to request API token')
    }

    const data = await res.json()
    if (data.response_code !== 0 || !data.token) {
      throw new Error('Token request returned invalid response')
    }

    saveToken(data.token)
    return data.token
  }

  async function resetSessionToken(signal) {
    if (!tokenRef.current) {
      return requestSessionToken(signal)
    }

    const res = await fetch(
      `https://opentdb.com/api_token.php?command=reset&token=${tokenRef.current}`,
      { signal }
    )

    if (!res.ok) {
      throw new Error('Failed to reset API token')
    }

    const data = await res.json()
    if (data.response_code !== 0) {
      clearToken()
      return requestSessionToken(signal)
    }

    return tokenRef.current
  }

  async function getSessionToken(signal) {
    if (tokenRef.current) {
      return tokenRef.current
    }

    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY)
    if (storedToken) {
      tokenRef.current = storedToken
      return storedToken
    }

    return requestSessionToken(signal)
  }

  async function fetchQuizData(token, signal) {
    const res = await fetch(createQuizUrl(token), { signal })

    if (!res.ok) {
      throw new Error('Network response was not ok')
    }

    return res.json()
  }

  function getApiErrorMessage(responseCode) {
    if (responseCode === 1) {
      return 'No questions matched your selected settings. Try fewer questions or choose Any category/difficulty.'
    }

    if (responseCode === 5) {
      return 'Too many requests right now. Please wait a few seconds and try again.'
    }

    return 'Something went wrong while fetching questions.'
  }

  async function loadQuestions() {
    // Guard: only one active request at a time
    if (inFlightRef.current) return
    inFlightRef.current = true

    // Mark this request as "latest" so older responses can be ignored
    const myRequestId = ++requestIdRef.current

    const controller = new AbortController()
    abortControllerRef.current = controller

    setErrorMessage('')
    setStatus(GAME_STATUS.LOADING)

    try {
      let token = await getSessionToken(controller.signal)
      let data = await fetchQuizData(token, controller.signal)

      if (data.response_code === 3) {
        token = await requestSessionToken(controller.signal)
        data = await fetchQuizData(token, controller.signal)
      }

      if (data.response_code === 4) {
        token = await resetSessionToken(controller.signal)
        data = await fetchQuizData(token, controller.signal)
      }

      if (data.response_code !== 0) {
        throw new Error(getApiErrorMessage(data.response_code))
      }

      // Ignore stale responses that finished after a newer request
      if (myRequestId !== requestIdRef.current) return

      setQuestions(normalizeQuestions(data))
      setStatus(GAME_STATUS.PLAYING)
    } catch (error) {
      if (error?.name === 'AbortError') {
        return
      }
      console.error('Failed to fetch questions:', error)
      setErrorMessage(error?.message || 'Something went wrong while fetching questions.')
      setStatus(GAME_STATUS.ERROR)
    } finally {
      if (myRequestId === requestIdRef.current) {
        inFlightRef.current = false
        abortControllerRef.current = null
      }
    }
  }

  function checkAnswers() {
    setStatus(GAME_STATUS.CHECKED)
  }

  function handlePrimaryClick() {
    if (status === GAME_STATUS.PLAYING) {
      if (!allAnswered) {
        setIsConfirmOpen(true)
        return
      }
      checkAnswers()
    }

    if (status === GAME_STATUS.CHECKED) {
      loadQuestions()
    }
  }

  function cancelFetch() {
    if (!inFlightRef.current) return

    // Invalidate any currently-running request before aborting it
    requestIdRef.current++
    abortControllerRef.current?.abort()
    abortControllerRef.current = null
    inFlightRef.current = false

    setStatus(GAME_STATUS.START)
  }

  function confirmSubmit() {
    setIsConfirmOpen(false)
    checkAnswers()
  }

  function cancelSubmit() {
    setIsConfirmOpen(false)
  }

  function goToStart() {
    setErrorMessage('')
    setStatus(GAME_STATUS.START)
  }

  // Cleanup when component using this hook unmounts
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort()
      inFlightRef.current = false
    }
  }, [])

  // 5) Public API of the hook (App consumes these values/functions)
  return {
    status,
    questions,
    isConfirmOpen,
    isLoading,
    isPlaying,
    isChecked,
    errorMessage,
    numUnanswered,
    numQuestions,
    numCorrect,
    quizOptions,
    selectAnswer,
    setQuizOption,
    loadQuestions,
    handlePrimaryClick,
    cancelFetch,
    confirmSubmit,
    cancelSubmit,
    goToStart,
  }
}