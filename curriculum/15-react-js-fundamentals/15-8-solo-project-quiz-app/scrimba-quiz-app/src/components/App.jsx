function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/* ============== */
/*  IMPORTS       */
/* ============== */

/* == External libraries == */
import { useState, useRef  } from 'react'
import he from "he"
import { nanoid } from "nanoid"

/* == Components == */
import QuestionCard from './QuestionCard'
import ConfirmSubmitModal from './ConfirmSubmitModal'

/* == Data And Utilities == */

/* == Styles == */
import '../styles/App.css'


export default function App() {
  /* State variables */
  const [status, setStatus] = useState("start") // start, loading, playing, checked
  const [questions, setQuestions] = useState([]) //need to fetch from API to set this
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  /* == Race Condition Controls == */
  /* 
   * Immediate in-flight lock: A ref-based boolean. It protects against double-clicks in the same render frame. State updates are async, so if(isLoading) return could fail if two fetch requests are made and the first one has not run setStatus("loading") yet. Refs update syncronously though, so this will be updated immediately once the first fetch request is made
   * finally: clears the lock 
   */
  const inFlightRef = useRef(false) 
  const abortControllerRef = useRef(null)
  const requestIdRef = useRef(0)

  /* Derived variables */
  const isStart = status === "start"
  const isLoading = status === "loading"
  const isPlaying = status === "playing"
  const isChecked = status === "checked"
  const isError = status === "error"

    // confirmation modal
  const allAnswered = questions.every(q => q.selectedAnswer !== null)
  const numUnanswered = questions.filter(q => q.selectedAnswer === null).length

  const numQuestions = questions.length
  const numCorrect = isChecked 
                      ? questions.filter(q => q.correctAnswer === q.selectedAnswer).length
                      : null


  /* Dynamic renders */
  const questionCards = questions.map(q => (
    <QuestionCard
      key={q.id}
      id={q.id}
      question={q.question}
      correctAnswer={q.correctAnswer}
      possibleAnswers={q.possibleAnswers}
      selectedAnswer={q.selectedAnswer}
      selectAnswer={selectAnswer}
      gameStatus={status}
    />
  ))

  /* Functions */

  // Fisher-Yates shuffle
  function shuffleAnswers(correctAnswer, incorrectAnswers){
    const newArray = [correctAnswer, ...incorrectAnswers]

    for (let i = newArray.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }

    return newArray
  }

  function normalizeQuestions(data){
    return data.results.map(q => {
      const incorrectAnswers = q.incorrect_answers.map(a => he.decode(a))
      const correctAnswer = he.decode(q.correct_answer)
      return {
        id: nanoid(),
        question: he.decode(q.question),
        correctAnswer: correctAnswer,
        possibleAnswers: shuffleAnswers(correctAnswer, incorrectAnswers), 
        selectedAnswer: null
      }})
  }

  function selectAnswer(questionId, answer){
    // if q in prevQuestions has questionId, change selected answer
    // if not, keep the same
    setQuestions(prevQuestions => prevQuestions.map(q => (
      q.id === questionId
        ? {...q, selectedAnswer: answer}
        : q
    )))
  }

  
  async function loadQuestions(){
    if (inFlightRef.current) return // guard against race conditions when fetching questions
    inFlightRef.current = true

    const myRequestId = ++requestIdRef.current 

    const controller = new AbortController()
    abortControllerRef.current = controller

    setStatus("loading")

    try{
      const res = await fetch("https://opentdb.com/api.php?amount=5", {
      signal: controller.signal,
    })

      if (!res.ok){
        throw new Error("Network response was not ok")
      }

      const data = await res.json()

      if (data.response_code !== 0){
        throw new Error("API returned no questions")
      }

      if (myRequestId !== requestIdRef.current) return

      setQuestions(normalizeQuestions(data))
      setStatus("playing")

    } catch(error){
      if (error?.name === "AbortError") {
        // status will be set by cancelFetch()
        return
      }
      console.error("Failed to fetch questions:", error)
      setStatus("error")

    } finally {
        if (myRequestId === requestIdRef.current) {
        inFlightRef.current = false
        abortControllerRef.current = null
      }
    }
  }

  function checkAnswers() {
    setStatus("checked")
  }

  function handlePrimaryClick(){
    if(status === "playing"){
      if(!allAnswered){
        setIsConfirmOpen(true)
        return
      }
      checkAnswers()
    } if(status === "checked") {
      loadQuestions()
    }
  }

  function cancelFetch() {
    if (!inFlightRef.current) return

    requestIdRef.current++

    abortControllerRef.current?.abort()
    abortControllerRef.current = null
    inFlightRef.current = false

    setStatus("start")
  }

  function confirmSubmit(){
    setIsConfirmOpen(false)
    checkAnswers()
  }

  function cancelSubmit(){
    setIsConfirmOpen(false)
  }

  /* UIs */
  const startUI = (
        <>
          <h1>Quizzical</h1>
          {/* category */}
          {/* difficulty */}
          {/* type */}
          {/* number of questions */}
          <button 
            onClick={loadQuestions}
            className='btn start-quiz-btn'
          >
            Start quiz
          </button>
        </>
  )
  
  const loadUI = (
        <>
          <div className="loading-screen">
            <p>Loading new questions…</p>
            <div className="spinner" />
            <button className='btn primary-btn' onClick={cancelFetch}>Cancel</button>
          </div>
        </>
  )

  const gameUI = (
        <>
          {questionCards}
          <div className='foot-container'>
            {isChecked && <p className='score-report'>You scored {numCorrect}/{numQuestions} correct answers</p>}
            <button 
              className='btn primary-btn'
              onClick={handlePrimaryClick}
            >
              {isPlaying ? "Check answers" : "Play again"}
            </button>
          </div>
        </>
  )

  const errorUI = (
        <>
          <p>Something went wrong while fetching questions.</p>

          <div className="foot-container">
            <button onClick={loadQuestions} className="btn primary-btn">
              Try again
            </button>
            <button onClick={() => setStatus("start")} className="start-quiz-btn">
              Back to start
            </button>
          </div>
        </>
  )
  
  const screens = {
    start: startUI, 
    loading: loadUI, 
    playing: gameUI, 
    checked: gameUI, 
    error: errorUI
  }

  const confirmModal = isConfirmOpen 
    ? <ConfirmSubmitModal 
        numUnanswered={numUnanswered} 
        onConfirm={confirmSubmit}
        onCancel={cancelSubmit}
        onBackdropClose={cancelSubmit}
      /> 
    : null


  return (
    <main>
      {screens[status] ?? null}
      {confirmModal}
    </main>
  )
}

