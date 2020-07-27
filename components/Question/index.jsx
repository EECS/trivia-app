import React, { useState, useEffect } from 'react';
import Button from "../Button";

const Question = ({ question, setScore }) => {

    function correctAnswer(){
        // setScore(prevScore => prevScore + 1);
        alert('Correct! :)');
    }

    function incorrectAnswer(){
        alert('Incorrect! :(');
    }

    // const decodedQuestion = decodeURI(question.question);

    return(
        <div>
            <p>{question.question}</p>
            <button onClick={correctAnswer}>
                {question.correct_answer}
            </button>
            {question.incorrect_answers.map(answer => {
                return (
                    <button onClick={incorrectAnswer}>{answer}</button>
                )
            })}
        </div>
    )

}

export default Question;