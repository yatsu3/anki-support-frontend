import React, { useState, useEffect } from "react";
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useLocation } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useApi } from "../utils/api.ts";


interface Answer {
  id: number;
  choiceId: number;
  value: string;
}

const QuestionEditPage: React.FC = () => {
  const { user } = useAuth();

  const { getApi, postApi } = useApi();

  const location = useLocation();
  const [categoryName, setCategoryName] = useState(location.state?.categoryName || "");
  const [questionContent, setQuestionContent] = useState("");
  const [choices, setChoices] = useState<Answer[]>([
    { id: 1, choiceId: 1, value: "" },
    { id: 2, choiceId: 2, value: "" },
  ]);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [explanation, setExplanation] = useState("");

  useEffect(() => {
    getQuestion();
  }, []);

  const questionId = location.state?.questionId || "";
  const [uuid, setUuid] = useState(location.state?.uuid || "");


  const getQuestion = async() => {
    try {
      const response = await getApi(`http://localhost:8080/questions/${questionId}?uuid=${uuid}`, user.accessToken);

      setCategoryName(response.categoryName);
      setQuestionContent(response.questionContent);
      setChoices(response.choiceList.map((choice, index) => ({ id: index + 1, value: choice.choiceContent, choiceId: choice.choiceId })));
      setCorrectAnswer(response.answerContent);
      setExplanation(response.explanation);

    } catch (error) {
      console.error("問題の取得に失敗しました:", error);
    }
  }

  // カテゴリーの変更
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  // 問題の変更
  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionContent(e.target.value);
  };

  // 解答の変更
  const handleAnswerChange = (
    id: number,
    value: string
  ) => {
    setChoices((prevChoices) =>
      prevChoices.map((answer) =>
        answer.id === id ? { ...answer, value } : answer
      )
    );
  };

  // 解答を追加
  const addAnswer = () => {
    setChoices((prevChoices) => {
      const maxChoiceId = prevChoices.length > 0
        ? Math.max(...prevChoices.map(choice => choice.choiceId)) + 1
        : 1;
  
      return [
        ...prevChoices,
        { id: prevChoices.length + 1, choiceId: maxChoiceId, value: "" }
      ];
    });
  };

  // 正解の変更
  const handleCorrectAnswerChange = (
    e: SelectChangeEvent<number>
  ) => {
    setCorrectAnswer(Number(e.target.value));
  };

  // 解説の変更
  const handleExplanationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setExplanation(e.target.value);
  };

  // 問題を更新
  const editQuestion = async() => {
    const choicesData = choices.map(answer => ({
      choiceId: answer.choiceId,
      choiceContent: answer.value
    }));
    
    const questionInfo = {
      questionId,
      categoryName,
      uuid,
      questionContent,
      choicesData: choicesData,
      correctAnswer,
      explanation,
    };

    try {
      await postApi(`http://localhost:8080/questions/${questionId}`,user.accessToken, questionInfo);
      alert("問題を更新しました。")
    } catch(e) {
      alert("問題追加時にエラーが発生しました。");
    }

  };

  return (
    <div style={{ padding: "10px", maxWidth: "600px", margin: "0 auto" }}>
      <h4>問題編集画面</h4>

      <TextField
        fullWidth
        label="カテゴリー"
        value={categoryName}
        onChange={handleCategoryChange}
        variant="outlined"
        margin="normal"
        disabled
      />

      <TextField
        fullWidth
        label="問題"
        value={questionContent}
        onChange={handleQuestionChange}
        variant="outlined"
        margin="normal"
        multiline
        rows={4}
      />

      {choices.map((answer) => (
        <TextField
          key={answer.id}
          fullWidth
          label={`解答 ${answer.id}`}
          value={answer.value}
          onChange={(e) => handleAnswerChange(answer.id, e.target.value)}
          variant="outlined"
          margin="normal"
        />
      ))}
      <Button
        variant="outlined"
        color="primary"
        onClick={addAnswer}
        style={{ marginBottom: "20px" }}
      >
        ＋ 解答を追加
      </Button>

      <FormControl fullWidth margin="normal">
        <InputLabel>正解</InputLabel>
        <Select
          value={correctAnswer || ""}
          onChange={handleCorrectAnswerChange}
          label="正解"
        >
          <MenuItem value="" disabled>
            正解を選択
          </MenuItem>
          {choices.map((answer) => (
            <MenuItem key={answer.id} value={answer.id}>
              解答 {answer.id}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="解説"
        value={explanation}
        onChange={handleExplanationChange}
        variant="outlined"
        margin="normal"
        multiline
        rows={4}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={editQuestion}
        style={{ marginTop: "20px" }}
      >
        更新
      </Button>
    </div>
  );
};

export default QuestionEditPage;
