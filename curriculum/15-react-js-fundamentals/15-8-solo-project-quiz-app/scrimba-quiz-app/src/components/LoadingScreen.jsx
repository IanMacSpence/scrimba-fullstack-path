export default function LoadingScreen(props) {
  const { onCancel } = props

  return (
    <div className='loading-screen'>
      <p>Loading new questions…</p>
      <div className='spinner' />
      <button type='button' className='btn primary-btn' onClick={onCancel}>Cancel</button>
    </div>
  )
}