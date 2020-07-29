import React, { useState, useEffect } from "react";

import Layout from "../components/Layout";
import Quiz from "../components/Quiz";
import axios from "axios";
import QuizList from "../components/QuizList";
import Question from "../components/Question";
import Scoreboard from "../components/Scoreboard";
import ConfigureQuiz from "../components/ConfigureQuiz";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isDisplayingResults, setIsDisplayingResults] = useState(false);
  // const [quizEnd, setQuizEnd] = useState(false);

  const onStartClick = () => {
    if (!difficulty) return;
    setLoading(true);
    const url = `https://opentdb.com/api.php?amount=10&category=22&difficulty=${difficulty.value}`;
    axios.get(url).then((res) => {
      setLoading(false);
      setScore(0);
      setQuestions(res.data.results);
      setCurrentQuestionIndex(0);
      // setCurrentQuestionIndex(prevQuestion => prevQuestion + 1);
    }, []);
  };

  const onReset = () => {
    setQuestions([]);
    setDifficulty();
    setCurrentQuestionIndex(0);
    setScore(0);
    setLoading(false);
    setIsDisplayingResults(false);
  };

  const onDifficultySelect = (selectedOption) => {
    setDifficulty(selectedOption);
  };

  const handleAnswer = (answer) => {
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    if (answer === correctAnswer) setScore(score + 1);

    // At the last question
    if (currentQuestionIndex === questions.length - 1) {
      // onReset();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  if (isDisplayingResults) {
    return <div>Results Screen</div>;
  }

  if (!questions.length)
    return (
      <ConfigureQuiz
        onDifficultySelect={onDifficultySelect}
        selectedDifficulty={difficulty}
        onStartClick={onStartClick}
      />
    );

  return (
    <Layout title="Quiz | Trivia App">
      <h1>Quiz Page</h1>
      <div class="main">
        {/* <Quiz /> */}
        {false ? (
          <h1>You finished the quiz. Your score was: {score}.</h1>
        ) : questions.length === 0 ? (
          <ConfigureQuiz
            onDifficultySelect={onDifficultySelect}
            selectedDifficulty={difficulty}
            onStartClick={onStartClick}
          />
        ) : (
          <div>
            <Scoreboard score={score} />
            <Question
              data={questions[currentQuestionIndex]}
              onStartClick={onStartClick}
              setScore={setScore}
              handleAnswer={handleAnswer}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default QuizPage;
