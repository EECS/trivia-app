import React, { useState, useEffect } from "react";

import Layout from "../components/Layout";
import Quiz from "../components/Quiz";
import axios from "axios";
import QuizList from ""

import ConfigureQuiz from "../components/ConfigureQuiz";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState();
  const [currentQuestion, setCurrentQuestion] = useState();
  const [loading, setLoading] = useState(false);

  const onStartClick = () => {
    if(!difficulty) return
    setLoading(true)
    const url = `https://opentdb.com/api.php?amount=10&category=22&difficulty=${difficulty.value}`;
    axios.get(url).then(res => {
      setLoading(false);
      setQuestions(res.data.results);
      setCurrentQuestion(1);
    }, [])
  }

  const onDifficultySelect = (selectedOption) => {
    setDifficulty(selectedOption);
  }

  return (
  <Layout title="Quiz | Trivia App">
    <h1>Quiz Page</h1>
    <ConfigureQuiz onDifficultySelect={onDifficultySelect} selectedDifficulty={difficulty} onStartClick={onStartClick} />
    {/* <QuizList /> */}
  </Layout>
)};

export default QuizPage;
