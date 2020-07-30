import React from "react";
import Question from "../Question";

function QuizList({ questions }, handleAnswer, setScore) {
  // easier than props.questions
  return (
    <ul id="quizList">
      {questions.map((question) => {
        return (
          <li key={question.index}>
            <div>
              <Question
                question={question}
                setScore={setScore}
                handleAnswer={handleAnswer}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default QuizList;
