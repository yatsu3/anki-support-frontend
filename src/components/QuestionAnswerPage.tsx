import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// 1問の問題データの型
interface Question {
  questionId: number;
  questionContent: string;
  choiceContents: string[];
  correctedAnswer: number;
  explanation: string;
}

const QuestionAnswerPage = () => {

const location = useLocation();
const categoryId = location.state?.categoryId || "";
const userId = location.state?.userId || "";

  
  // 問題リストの状態
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question>();

  // バックエンドから問題データを取得
  useEffect(() => {
    fetchQuestions();
  }, []);

  // indexが変わった時に次の問題をセット
  useEffect(() => {
    if (questions.length > 0) {
      setCurrentQuestion(questions[currentQuestionIndex]);
    }
  }, [questions, currentQuestionIndex]);


  const fetchQuestions = async () => {
    try {
      const response = await fetch(`http://localhost:8080/get-questions?categoryId=${encodeURIComponent(categoryId)}&userId=${encodeURIComponent(userId)}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
          },
      mode: "cors",
      credentials: "include"
      });
      const data = await response.json();
      setQuestions(data);
      setCurrentQuestion(data[0]);
    } catch (error) {
      console.error("問題の取得に失敗しました:", error);
    }
  };

  // 次の問題へ進む
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    }
  };

  // 回答が正解かどうかをチェック
  const checkAnswer = () => {
    if (selectedAnswer !== null) {
      if (selectedAnswer === currentQuestion.correctedAnswer) {
        alert(`正解！ ${currentQuestion.explanation}`);
      } else {
        alert(`不正解！ 正解は「${currentQuestion.choiceContents[currentQuestion.correctedAnswer - 1]}」${currentQuestion.explanation}`);
      }
      goToNextQuestion();
    } else {
      alert("回答を選択してください！");
    }
  };

  return (
    <div>
      {currentQuestion ? (
        <div>
          <h2>{currentQuestion.questionContent}</h2>
          <div>
            {currentQuestion.choiceContents?.map((choice, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`choice-${index}`}
                  name="answer"
                  value={index + 1}
                  onChange={() => setSelectedAnswer(index + 1)}
                  checked={selectedAnswer === index + 1}
                />
                <label htmlFor={`choice-${index}`}>{choice}</label>
              </div>
            ))}
          </div>
          <button onClick={checkAnswer}>答えを送信</button>
        </div>
      ) : (
        <p>問題を読み込んでいます...</p>
      )}
    </div>
  );
};

export default QuestionAnswerPage;
