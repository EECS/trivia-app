import React from 'react';

function QuizList({ questions }) { // easier than props.questions
    return (
            <ul id="quizList">
            {console.log('RETURNED FROM COMPONENT: ', questions)}
            {questions.map(question => {
                <li key={question}>{question}</li>
            })}
            </ul>
    )
}

export default QuizList;