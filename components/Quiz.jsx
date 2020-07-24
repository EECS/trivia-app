import React, { useState, useEffect } from 'react';
import QuizList from "./QuizList";
import Button from "./Button"
import axios from "axios";

function App() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        let cancel; // initialize variable to hold cancel token
        let url = 'https://opentdb.com/api.php?amount=10&category=22&difficulty=medium';
        axios.get(url).then(res => {
            setLoading(false);
            let questionsFromAPI = res.data.results
            console.log('RESULTS from API:', questionsFromAPI);
            setQuestions(questionsFromAPI);
            // setQuestions([{question: "Question 1"}, {question: "Question 2"}]);
            // res.data = the part we care about
            // res.data.results = the actual questions array
            // res.data.results.question = the actual question text
            // res.data.results.correct_answer = the correct answer
            // res.data.results.type = type of question (multiple choice vs. true/false)
        }, [])
        // console.log('MY QUESTIONS: ', questions);
        // return () => cancel(); // see cancel note above
    }, [])

    return (
        <div>
            {/* {console.log('RETURNED FRONT END: ', questions)} */}
            {loading ? "Loading..." : <QuizList questions={questions}/>}
            <Button>Take Quiz</Button>
        </div>
    )
}

export default App;

// {
//     cancelToken: new axios.CancelToken(c => cancel = c) // Will cancel the old request if user requests another before the previous one finishes
// }