import React from "react";

function AnswerList(props) {
    return (
        <ul>
            {props.questions.map(question => {
                return (
                    <li key={question.question}>{question.correct_answer}</li>
                )
            })}
        </ul>
    )
}

export default AnswerList;