import QuestionCard from './QuestionCard'

export default function GameScreen(props) {
  const {
    questions,
    status,
    isPlaying,
    isChecked,
    numCorrect,
    numQuestions,
    onSelectAnswer,
    onPrimaryClick,
    onChangeSettings,
  } = props

  const questionCards = questions.map(q => (
    <QuestionCard
      key={q.id}
      id={q.id}
      question={q.question}
      correctAnswer={q.correctAnswer}
      possibleAnswers={q.possibleAnswers}
      selectedAnswer={q.selectedAnswer}
      selectAnswer={onSelectAnswer}
      gameStatus={status}
    />
  ))

  return (
    <>
      {questionCards}
      <div className='foot-container'>
        {isChecked && <p className='score-report'>You scored {numCorrect}/{numQuestions} correct answers</p>}
        <button
          type='button'
          className='btn primary-btn'
          onClick={onPrimaryClick}
        >
          {isPlaying ? 'Check answers' : 'Play again'}
        </button>
        {isChecked && (
          <button
            type='button'
            className='btn go-back-btn'
            onClick={onChangeSettings}
          >
            Change settings
          </button>
        )}
      </div>
    </>
  )
}