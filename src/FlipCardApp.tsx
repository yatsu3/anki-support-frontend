import "./FlipCardApp.css";

import "./FlipCardApp.css";

import React, { useState, useRef } from "react";
import HTMLFlipBook from "react-pageflip";

interface Question {
  category: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const questions: Question[] = [
  {
    category: "Math",
    question: "What is 2 + 2?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "4",
    explanation: "2 + 2 equals 4.",
  },
  {
    category: "Science",
    question: "What is the chemical symbol for water?",
    options: ["O2", "H2O", "CO2", "NaCl"],
    correctAnswer: "H2O",
    explanation: "The chemical formula for water is H2O.",
  },
];

const FlipCardApp: React.FC = () => {
  const bookRef = useRef<HTMLFlipBook>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});

  const handleAnswer = (questionIndex: number, selectedOption: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: selectedOption }));
    bookRef.current?.pageFlip().flipNext(); // ページを自動でめくる
  };

  return (
    <HTMLFlipBook ref={bookRef} width={1000} height={600}>
      {questions.flatMap((question, index) => [
        // 問題ページ
        (
          <div key={`question-${index}`} className="page question-page">
            <h2>{question.category}</h2>
            <p>{question.question}</p>
            <ul>
              {question.options.map((option, optIndex) => (
                <li key={optIndex}>
                  <button onClick={() => handleAnswer(index, option)}>{option}</button>
                </li>
              ))}
            </ul>
          </div>
        ),
        // 答えページ
        (
          <div key={`answer-${index}`} className="page answer-page">
            <h2>Answer</h2>
            <p>
              {selectedAnswers[index] === question.correctAnswer
                ? "Correct! 🎉"
                : `Incorrect. 😢 The correct answer is "${question.correctAnswer}".`}
            </p>
            <p>Explanation: {question.explanation}</p>
          </div>
        ),
      ])}
    </HTMLFlipBook>
  );
};

export default FlipCardApp;

