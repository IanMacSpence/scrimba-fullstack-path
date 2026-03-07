/* ============== */
/*  IMPORTS       */
/* ============== */

/* == External libraries == */
import useQuizGame from '../hooks/useQuizGame'

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
          onPrimaryClick={handlePrimaryClick}
          onChangeSettings={goToStart}
        />
  )

  const errorUI = (
        <ErrorScreen
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
      /> 
    : null

  const screens = {
    start: startUI, 
    loading: loadUI, 
    playing: gameUI, 
    checked: gameUI, 
    error: errorUI
  }


  return (
    <main>
      {screens[status] ?? null}
      {confirmModal}
    </main>
  )
}

