

/* ============== */
/*  IMPORTS       */
/* ============== */

/* == External libraries == */
import { useState  } from 'react'
import he from "he"
import { nanoid } from "nanoid"

/* == Components == */
import QuestionCard from './components/QuestionCard'
import ConfirmSubmitModal from './components/ConfirmSubmitModal'

/* == Data And Utilities == */

/* == Styles == */




import './App.css'


export default function App() {
  /* State variables */
  const [status, setStatus] = useState("start") // start, loading, playing, checked
  const [questions, setQuestions] = useState([]) //need to fetch from API to set this
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

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
    if (isLoading) return // guard against race conditions when fetching questions
    
    setStatus("loading")
    try{
      const res = await fetch("https://opentdb.com/api.php?amount=5")
      if (!res.ok){
        throw new Error("Network response was not ok")
      }
      const data = await res.json()
      if (data.response_code !== 0){
        throw new Error("API returned no questions")
      }
      setQuestions(normalizeQuestions(data))
      setStatus("playing")
    }
    catch(error){
      console.error("Failed to fetch questions:", error)
      setStatus("error")
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
          <p>Some description if needed</p>
          <button 
            onClick={loadQuestions}
            className='start-quiz-btn'
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
          </div>
        </>
  )

  const gameUI = (
        <>
          {questionCards}
          <div className='foot-container'>
            {isChecked && <p className='score-report'>You scored {numCorrect}/{numQuestions} correct answers</p>}
            <button 
              className='primary-btn'
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
            <button onClick={loadQuestions} className="primary-btn">
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

