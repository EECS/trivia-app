import React, { useState } from "react";

import Layout from "../components/Layout";
import axios from "axios";
import Question from "../components/Question";
import Scoreboard from "../components/Scoreboard";
import ConfigureQuiz from "../components/ConfigureQuiz";
import Button from "../components/Button";

//Types import
import { TOption } from "../types/ConfigureQuiz/ConfigureQuiz.types";
import { TAPIQuizResponse } from "../types/quiz/quiz.types";

//Constants import
import { DIFFICULTY_OPTIONS } from "../constants/ConfigureQuiz/constants";

//Util import
import { decodeText } from "../../utilities/utils";

// Normalizes encoded text
// const normalizedQuestion = decodeText(question);
// const normalizedCorrectAnswer = decodeText(correct_answer);
// const normalizedIncorrectAnswers = incorrect_answers.map((item) =>
//   decodeText(item)
// );

const QuizPage = () => {
  const [questions, setQuestions] = useState<TAPIQuizResponse[]>([]);
  const [difficulty, setDifficulty] = useState<TOption>({
    label: DIFFICULTY_OPTIONS[0].label,
    value: DIFFICULTY_OPTIONS[0].value,
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isDisplayingResults, setIsDisplayingResults] = useState(false);

  const onStartClick = () => {
    if (!difficulty) return;
    const url = `https://opentdb.com/api.php?amount=10&category=22&difficulty=${difficulty.value}&encode=base64`;
    axios
      .get(url)
      .then((res) => {
        setScore(0);
        setQuestions(res.data.results);
        setCurrentQuestionIndex(0);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onReset = () => {
    setQuestions([]);
    setDifficulty({
      label: DIFFICULTY_OPTIONS[1].label,
      value: DIFFICULTY_OPTIONS[1].value,
    });
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsDisplayingResults(false);
  };

  const onDifficultySelect = (selectedOption: TOption) => {
    setDifficulty(selectedOption);
  };

  const handleAnswer = (answer: string) => {
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    if (answer === correctAnswer) setScore(score + 1);

    // At the last question
    if (currentQuestionIndex === questions.length - 1) {
      setIsDisplayingResults(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  if (isDisplayingResults) {
    return (
      <div>
        <h1>You finished the quiz. Your score was: {score}.</h1>
        <Button onClick={onReset}>Take Another Quiz!</Button>
      </div>
    );
  }

  return (
    <Layout title="Quiz | Trivia App">
      <h1>Quiz Page</h1>
      <div className="main">
        {questions.length === 0 && difficulty !== undefined ? (
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
              handleAnswer={handleAnswer}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default QuizPage;
