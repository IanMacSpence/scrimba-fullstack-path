import { useEffect, useRef } from 'react'

export default function ConfirmSubmitModal(props){
    const numUnanswered = props.numUnanswered
    const onCancel = props.onCancel
    const onConfirm = props.onConfirm
    const onBackdropClose = props.onBackdropClose

    const confirmBtnRef = useRef(null)
    useEffect(() => {
        confirmBtnRef.current?.focus()
    }, [])
    
    return(
        <div 
            className="modal-overlay"
            role="presentation"
            onMouseDown={(e) => {
                // close only if clicking the backdrop, not the dialog
                if (e.target === e.currentTarget) onBackdropClose()
            }}
        >
            <div 
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-title"
                aria-describedby="confirm-desc"
                onMouseDown={(e) => e.stopPropagation()}
            >
                <h2 id="confirm-title">Submit with unanswered questions?</h2>
                <p id="confirm-desc">
                    You left {numUnanswered} question{numUnanswered === 1 ? "" : "s"} unanswered.
                    Do you want to submit anyway?
                </p>

                <div className="modal-actions">
                    <button 
                        className="primary-btn"
                        ref={confirmBtnRef}
                        onClick={onConfirm}
                    >
                        Submit
                    </button>
                    <button className="start-quiz-btn" onClick={onCancel}>
                        Go back
                    </button>
                </div>

            </div>
        </div>
    )
}