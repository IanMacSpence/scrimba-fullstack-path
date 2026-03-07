/* ============== */
/*  IMPORTS       */
/* ============== */

/* == External libraries == */
import { useRef } from 'react'
import useQuizGame from '../hooks/useQuizGame'
import { GAME_STATUS } from '../constants/gameStatus'

/* == Components == */
import ConfirmSubmitModal from './ConfirmSubmitModal'
import StartScreen from './StartScreen'
import LoadingScreen from './LoadingScreen'
import GameScreen from './GameScreen'
import ErrorScreen from './ErrorScreen'

/* == Data And Utilities == */

/* == Styles == */
import '../styles/App.css'


export default function App() {
  const {
    status,
    questions,
    isConfirmOpen,
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
  } = useQuizGame()

  const returnFocusRef = useRef(null)

  function handlePrimaryClickWithFocusCapture() {
    returnFocusRef.current = document.activeElement
    handlePrimaryClick()
  }

  function restoreFocusAfterModalClose() {
    if (returnFocusRef.current instanceof HTMLElement) {
      returnFocusRef.current.focus()
    }
  }

  /* User Interfaces */
  const startUI = (
        <StartScreen
          quizOptions={quizOptions}
          setQuizOption={setQuizOption}
          onStart={loadQuestions}
        />
  )
  
  const loadUI = (
        <LoadingScreen onCancel={cancelFetch} />
  )

  const gameUI = (
        <GameScreen
          questions={questions}
          status={status}
          isPlaying={isPlaying}
          isChecked={isChecked}
          numCorrect={numCorrect}
          numQuestions={numQuestions}
          onSelectAnswer={selectAnswer}
          onPrimaryClick={handlePrimaryClickWithFocusCapture}
          onChangeSettings={goToStart}
        />
  )

  const errorUI = (
        <ErrorScreen
          message={errorMessage}
          onRetry={loadQuestions}
          onBackToStart={goToStart}
        />
  )

  const confirmModal = isConfirmOpen 
    ? <ConfirmSubmitModal 
        numUnanswered={numUnanswered} 
        onConfirm={confirmSubmit}
        onCancel={cancelSubmit}
        onBackdropClose={cancelSubmit}
        onAfterClose={restoreFocusAfterModalClose}
      /> 
    : null

  const screens = {
    [GAME_STATUS.START]: startUI,
    [GAME_STATUS.LOADING]: loadUI,
    [GAME_STATUS.PLAYING]: gameUI,
    [GAME_STATUS.CHECKED]: gameUI,
    [GAME_STATUS.ERROR]: errorUI,
  }


  return (
    <main>
      {screens[status] ?? null}
      {confirmModal}
    </main>
  )
}

