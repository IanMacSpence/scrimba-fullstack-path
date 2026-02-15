import he from "he"

export default function QuestionCard(props){

    return(
        <div className="question-card">
            <h2>{he.decode(props.question)}</h2>
            <button>{he.decode(props.correctAnswer)}</button>
            <button>{he.decode(props.incorrectAnswers[0])}</button>
            <button>{he.decode(props.incorrectAnswers[1])}</button>
            <button>{he.decode(props.incorrectAnswers[2])}</button>
        </div>
    )
}