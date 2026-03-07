export default function LoadingScreen(props) {
  const { onCancel } = props

  return (
    <div className='loading-screen' role='status' aria-live='polite' aria-busy='true'>
      <p>Loading new questions…</p>
      <div className='spinner' aria-hidden='true' />
      <button type='button' className='btn primary-btn' onClick={onCancel}>Cancel</button>
    </div>
  )
}