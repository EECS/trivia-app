import React, { useState, useEffect } from 'react';
// import React from 'r'
import Button from './styles';

//Util import
import { shuffledArray } from "../../utilities/utils";


const Question = ({
    handleAnswer,
    data: { question, correct_answer, incorrect_answers } }) => {
    // Combines correct/incorrect answer arrays
    const combinedArray = [correct_answer, ...incorrect_answers];
    const [allAnswers, setAllAnswers] = useState([])

    useEffect(() => {
        // Randomized array of correct/incorrect answers for rendering
        setAllAnswers(shuffledArray(combinedArray));
    }, [question])

    // Ternary checks to see if an answer is equal to the correct answer to give it a "correct" button
    return (
        <div>
            <p>{question}</p>

            {allAnswers.map(answer => {
                return (
                    answer === correct_answer ?
                        <Button style={{ border: '2px solid black' }} onClick={() => handleAnswer(answer)}>
                            {correct_answer}
                        </Button>
                        :
                        <Button onClick={() => handleAnswer(answer)}>{answer}</Button>
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