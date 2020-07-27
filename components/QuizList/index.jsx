import React from 'react';
import Question from '../Question';

function QuizList({questions}, setScore) { // easier than props.questions
    console.log('QUESTIONS IN QUIZ LIST -------', questions);
    return (
            <ul id="quizList">
                {questions.map(question => {
                    return (
                        <li key={question.question}>
                            <div>
                                <Question question={question} setScore={setScore} />
                            </div>
                        </li>
                    )
                })}
            </ul>
    )
}

export default QuizList;

