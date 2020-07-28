import React, { useState, useEffect } from "react";

import Layout from "../components/Layout";
import Quiz from "../components/Quiz";
import axios from "axios";
import QuizList from "../components/QuizList"
import Question from "../components/Question"
import Scoreboard from "../components/Scoreboard"

import ConfigureQuiz from "../components/ConfigureQuiz";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [quizEnd, setQuizEnd] = useState(false);

  const onStartClick = () => {
    if(!difficulty) return
    setLoading(true)
    const url = `https://opentdb.com/api.php?amount=10&category=22&difficulty=${difficulty.value}`;
    axios.get(url).then(res => {
      setLoading(false);
      setScore(0);
      setQuestions(res.data.results);
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
    }, [])
  };

  const onDifficultySelect = (selectedOption) => {
    setDifficulty(selectedOption);
  };

  const handleAnswer = (answer) => { 
    setCurrentQuestion(currentQuestion => currentQuestion + 1);
    answer === questions[currentQuestion].correct_answer && 
    setScore(prevScore => prevScore + 1);

    // Check answer
      // If correct, show another question
      // setCurrentQuestion(currentQuestion => currentQuestion + 1);

    currentQuestion >= (questions.length) && 
      setQuizEnd(true);
  };

  return (
  <Layout title="Quiz | Trivia App">
    <h1>Quiz Page</h1>
      
    {

      questions.length === 0 ?
      <div>
        <ConfigureQuiz 
          onDifficultySelect={onDifficultySelect}
          selectedDifficulty={difficulty}
          onStartClick={onStartClick} 
        />
      </div>

      :

      <div>
        <Scoreboard score={score} />
        <div>
          <Question 
            data={questions[currentQuestion]} 
            onStartClick={onStartClick} 
            setScore={setScore} 
            handleAnswer={handleAnswer}
            setCurrentQuestion={setCurrentQuestion}
          />
        </div>
      </div>  
    }

  </Layout>
)};

export default QuizPage;

{/* //  <div>
//       <Scoreboard score={score} />
//       <QuizList questions={questions} onStartClick={onStartClick} setScore={setScore} handleAnswer={handleAnswer}/>
//   </div>   */}
