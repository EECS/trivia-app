import React from 'react';

function QuizList({ questions }) { // easier than props.questions
    return (
            <ul id="quizList">
            {console.log('RETURNED FROM COMPONENT: ', questions)}
            {questions.map(question => {
                return (
                    <li key={question.question}>
                        <div>
                            {question.question}
                        </div>
                        <div>
                            Answer: {question.correct_answer}
                        </div>
                    </li>
                )
            })}
            </ul>
    )
}

export default QuizList;