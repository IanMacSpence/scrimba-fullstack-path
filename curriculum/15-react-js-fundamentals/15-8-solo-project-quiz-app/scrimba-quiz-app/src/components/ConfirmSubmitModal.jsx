import { useEffect, useRef } from 'react'
import '../styles/ConfirmSubmitModal.css'

export default function ConfirmSubmitModal(props){
    const numUnanswered = props.numUnanswered
    const onCancel = props.onCancel
    const onConfirm = props.onConfirm
    const onBackdropClose = props.onBackdropClose
    const onAfterClose = props.onAfterClose

    const confirmBtnRef = useRef(null)
    const dialogRef = useRef(null)

    function getFocusableElements() {
        if (!dialogRef.current) return []

        const focusableSelector = [
            'button:not([disabled])',
            '[href]',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
        ].join(',')

        return Array.from(dialogRef.current.querySelectorAll(focusableSelector))
    }

    function handleDialogKeyDown(event) {
        if (event.key === 'Escape') {
            event.preventDefault()
            onCancel()
            return
        }

        if (event.key !== 'Tab') return

        const focusableElements = getFocusableElements()
        if (focusableElements.length === 0) {
            event.preventDefault()
            return
        }

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]
        const activeElement = document.activeElement

        if (event.shiftKey && activeElement === firstElement) {
            event.preventDefault()
            lastElement.focus()
        } else if (!event.shiftKey && activeElement === lastElement) {
            event.preventDefault()
            firstElement.focus()
        }
    }

    useEffect(() => {
        confirmBtnRef.current?.focus()

        return () => {
            onAfterClose?.()
        }
    }, [onAfterClose])
    
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
                ref={dialogRef}
                onKeyDown={handleDialogKeyDown}
                onMouseDown={(e) => e.stopPropagation()}
            >
                <h2 id="confirm-title">Submit with unanswered questions?</h2>
                <p id="confirm-desc">
                    You left {numUnanswered} question{numUnanswered === 1 ? "" : "s"} unanswered.
                    Do you want to submit anyway?
                </p>

                <div className="modal-actions">
                    <button 
                        type="button"
                        className="btn primary-btn"
                        ref={confirmBtnRef}
                        onClick={onConfirm}
                    >
                        Submit
                    </button>
                    <button type="button" className="btn go-back-btn" onClick={onCancel}>
                        Go back
                    </button>
                </div>

            </div>
        </div>
    )
}