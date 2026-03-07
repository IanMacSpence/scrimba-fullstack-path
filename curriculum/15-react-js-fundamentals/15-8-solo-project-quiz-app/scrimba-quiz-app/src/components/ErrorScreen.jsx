export default function ErrorScreen(props) {
  const { message, onRetry, onBackToStart } = props

  return (
    <>
      <p role='alert'>{message || 'Something went wrong while fetching questions.'}</p>

      <div className='foot-container'>
        <button type='button' onClick={onRetry} className='btn primary-btn'>
          Try again
        </button>
        <button type='button' onClick={onBackToStart} className='btn go-back-btn'>
          Back to start
        </button>
      </div>
    </>
  )
}