import React, { useState } from "react";
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useLocation } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useApi } from "../utils/api.ts";


interface Answer {
  id: number;
  value: string;
}

const ProblemCreationPage: React.FC = () => {
  const { user } = useAuth();

  const { getApi, postApi } = useApi();

  const location = useLocation();
  const [categoryName, setCategoryName] = useState(location.state?.categoryName || "");
  const [questionContent, setQuestionContent] = useState("");
  const [choices, setChoices] = useState<Answer[]>([
    { id: 1, value: "" },
    { id: 2, value: "" },
  ]);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [explanation, setExplanation] = useState("");

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
    setChoices((prevChoices) => [
      ...prevChoices,
      { id: prevChoices.length + 1, value: "" },
    ]);
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

  const [uuid, setUuid] = useState(location.state?.uuid || "");

  // 問題を追加
  const addQuestion = async() => {
    const choicesData = choices.map(answer => answer.value)
    const questionInfo = {
      categoryName,
      uuid,
      questionContent,
      choicesData,
      correctAnswer,
      explanation,
    };

    try {
      await postApi("http://localhost:8080/add-question", user.accessToken, questionInfo);
          // 初期化する場合
      setQuestionContent("");
      setChoices([
        { id: 1, value: "" },
        { id: 2, value: "" },
      ]);
      setCorrectAnswer(null);
      setExplanation("");
    } catch(e) {
      alert("問題追加時にエラーが発生しました。");
    }
    alert("問題を追加しました。")

  };

  return (
    <div style={{ padding: "10px", maxWidth: "600px", margin: "0 auto" }}>
      <h4>問題作成画面</h4>

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
        onClick={addQuestion}
        style={{ marginTop: "20px" }}
      >
        問題を追加
      </Button>
    </div>
  );
};

export default ProblemCreationPage;
