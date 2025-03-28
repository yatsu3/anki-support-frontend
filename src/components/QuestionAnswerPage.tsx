import Button from "@mui/material/Button/Button";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useApi } from "../utils/api.ts";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';


// 1問の問題データの型
interface Question {
  questionId: number;
  questionContent: string;
  choiceContents: string[];
  correctedAnswer: number;
  explanation: string;
}

const QuestionAnswerPage = () => {

  const { getApi, postApi } = useApi();


const location = useLocation();
const categoryId = location.state?.categoryId || "";
const uuid = location.state?.uuid || "";

const { user } = useAuth();


  
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
      const response = await getApi(`http://localhost:8080/get-questions?categoryId=${encodeURIComponent(categoryId)}&uuid=${encodeURIComponent(uuid)}`, user.accessToken);
      setQuestions(response);
      setCurrentQuestion(response[0]);
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
  const checkAnswer = (index) => {
    if (index !== null) {
      if (index === currentQuestion.correctedAnswer) {
        alert(`正解！${currentQuestion.explanation}`);
      } else {
        alert(`不正解！正解は${currentQuestion.correctedAnswer}。${currentQuestion.explanation}`);
      }
      goToNextQuestion();
    } else {
      alert("回答を選択してください！");
    }
  };

  return (
    <>
    <div>
      {currentQuestion ? (
        <div>
          <h2>{currentQuestion.questionContent}</h2>
          <center>
          <div>
          <Box 
  sx={{ 
    width: "50%", 
    display: "flex", 
    flexDirection: "column",
    alignItems: "center", // 水平方向の中央揃え
  }}
>
  <Stack spacing={2} sx={{ width: "100%" }} alignItems="center">
    {currentQuestion.choiceContents?.map((choice, index) => (
      <Button
        key={index}
        variant="contained"
        value={`choice-${index}`}
        onClick={() => checkAnswer(index + 1)}
        sx={{ width: "50%" }}  // ボタンの幅を一律 50% に固定
      >
        {choice}
      </Button>
    ))}
  </Stack>
</Box>
          </div>
          </center>
        </div>
      ) : (
        <p>問題を読み込んでいます...</p>
      )}
    </div>
    </>
  );
};

export default QuestionAnswerPage;
