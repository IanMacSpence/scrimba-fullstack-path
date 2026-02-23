import clsx from 'clsx'


export default function QuestionCard(props){
    const isCheckedState = props.gameStatus === "checked"
    const isUnanswered = isCheckedState && props.selectedAnswer === null
    const possibleAnswerList = props.possibleAnswers.map((answer, i) => {
        const inputId = `${props.id}-${i}`
        const isSelected = answer === props.selectedAnswer
        const isCorrectOption = answer === props.correctAnswer
        const isSelectedWrong = isCheckedState && isSelected && !isCorrectOption
        const labelClasses = clsx("answer-label", {
            "is-selected": !isCheckedState && isSelected, 
            "is-correct": isCheckedState && isCorrectOption, 
            "is-incorrect": isCheckedState && isSelectedWrong, 
            "muted": isCheckedState && !isCorrectOption && !isSelected
            
        } )
        // answer buttons
        return <div key={inputId} className="answer-option">
                    <input 
                        type="radio" 
                        id={inputId}
                        name={props.id}
                        value={answer}
                        checked={isSelected}
                        onChange={() => props.selectAnswer(props.id, answer)} 
                        disabled={isCheckedState}
                    />     
                    <label htmlFor={inputId} className={labelClasses}>
                        {answer}
                    </label>
               </div>
    })
    // question card
    return(
        <fieldset className={clsx("question-card", {"unanswered": isUnanswered})}>
            <legend>
                {props.question}
                {isUnanswered && <span className="unanswered-badge">Unanswered</span>}
            </legend>
            <div className={clsx("answers", {"answers--checked": isCheckedState})}>
                {possibleAnswerList}
            </div>
        </fieldset>
    )
}

