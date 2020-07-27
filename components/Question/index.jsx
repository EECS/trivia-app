import React, { useState, useEffect } from 'react';
import Button from "../Button";

const Question = ({ question: { question, correct_answer, incorrect_answers } }, handleAnswer) => {

    // Combines correct/incorrect answer arrays
    const combinedArray = [correct_answer, ...incorrect_answers];

    // Helper function to randomize position of correct/incorrect answers in question array
    function shuffledArray(arr){
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // Randomized array of correct/incorrect answers for rendering
    const allAnswers = shuffledArray(combinedArray);

    function correctAnswer(){
        // setScore(prevScore => prevScore + 1);
        alert('Correct! :)');
    }

    function incorrectAnswer(){
        alert('Incorrect! :(');
    }

    // const decodedQuestion = decodeURI(question.question);

    // Ternary checks to see if an answer is equal to the correct answer to give it a "correct" button
    return(
        <div>
            <p>{question}</p>

            {allAnswers.map(answer => {
                return (
                    answer === correct_answer ?
                        <button onClick={() => handleAnswer(answer)}>
                            {correct_answer}
                        </button>
                    : <button onClick={incorrectAnswer}>{answer}</button>
                )
            })}
        </div>
    )

}

export default Question;

// return(
//         <div>
//             <p>{question.question}</p>
//             <button onClick={correctAnswer}>
//                 {question.correct_answer}
//             </button>

//             {question.incorrect_answers.map(answer => {
//                 return (
//                     <button onClick={incorrectAnswer}>{answer}</button>
//                 )
//             })}
//         </div>
//     )