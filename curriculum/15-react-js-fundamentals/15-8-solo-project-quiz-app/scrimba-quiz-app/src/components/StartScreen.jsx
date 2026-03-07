import { categoryOptions, difficultyOptions } from '../constants/quizOptions'

export default function StartScreen(props) {
  const { quizOptions, setQuizOption, onStart } = props

  function handleOptionChange(event) {
    const { name, value } = event.target
    setQuizOption(name, value)
  }

  function handleStartSubmit(event) {
    event.preventDefault()
    onStart()
  }

  return (
    <>
      <h1>Quizzical</h1>
      <form className='quiz-options-form' onSubmit={handleStartSubmit}>
        <div className='quiz-option-field'>
          <label htmlFor='category'>Category</label>
          <select
            id='category'
            name='category'
            className='quiz-option-input'
            value={quizOptions.category}
            onChange={handleOptionChange}
          >
            {categoryOptions.map(option => (
              <option key={option.value || 'any-category'} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className='quiz-option-field'>
          <label htmlFor='difficulty'>Difficulty</label>
          <select
            id='difficulty'
            name='difficulty'
            className='quiz-option-input'
            value={quizOptions.difficulty}
            onChange={handleOptionChange}
          >
            {difficultyOptions.map(option => (
              <option key={option.value || 'any-difficulty'} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className='quiz-option-field'>
          <label htmlFor='amount'>Number of questions</label>
          <input
            id='amount'
            name='amount'
            type='number'
            min='1'
            max='50'
            className='quiz-option-input'
            value={quizOptions.amount}
            onChange={handleOptionChange}
          />
        </div>

        <button type='submit' className='btn start-quiz-btn'>
          Start quiz
        </button>
      </form>
    </>
  )
}