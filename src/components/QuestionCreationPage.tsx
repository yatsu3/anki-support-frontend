import React, { useState } from "react";
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import Typography from '@mui/material/Typography';
import { useLocation } from "react-router-dom";

interface Answer {
  id: number;
  value: string;
}

const ProblemCreationPage: React.FC = () => {
  const location = useLocation();
  const title = location.state?.title || "";
  const [category, setCategory] = useState(title);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([
    { id: 1, value: "" },
    { id: 2, value: "" },
  ]);
  const [correctAnswerId, setCorrectAnswerId] = useState<number | null>(null);
  const [explanation, setExplanation] = useState("");

  // カテゴリーの変更
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  // 問題の変更
  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };

  // 解答の変更
  const handleAnswerChange = (
    id: number,
    value: string
  ) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.id === id ? { ...answer, value } : answer
      )
    );
  };

  // 解答を追加
  const addAnswer = () => {
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      { id: prevAnswers.length + 1, value: "" },
    ]);
  };

  // 正解の変更
  const handleCorrectAnswerChange = (
    e: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCorrectAnswerId(Number(e.target.value));
  };

  // 解説の変更
  const handleExplanationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setExplanation(e.target.value);
  };

  // 問題を追加
  const handleSubmit = () => {
    const newProblem = {
      category,
      question,
      answers,
      correctAnswerId,
      explanation,
    };
    console.log("新しい問題:", newProblem);

    // 初期化する場合
    setCategory("");
    setQuestion("");
    setAnswers([
      { id: 1, value: "" },
      { id: 2, value: "" },
    ]);
    setCorrectAnswerId(null);
    setExplanation("");
  };

  return (
    <div style={{ padding: "10px", maxWidth: "600px", margin: "0 auto" }}>
      <h4>問題作成画面</h4>

      <TextField
        fullWidth
        label="カテゴリー"
        value={category}
        onChange={handleCategoryChange}
        variant="outlined"
        margin="normal"
        disabled
      />

      <TextField
        fullWidth
        label="問題"
        value={question}
        onChange={handleQuestionChange}
        variant="outlined"
        margin="normal"
        multiline
        rows={4}
      />

      {answers.map((answer) => (
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
          value={correctAnswerId || ""}
          onChange={ (e) => handleCorrectAnswerChange}
          label="正解"
        >
          <MenuItem value="" disabled>
            正解を選択
          </MenuItem>
          {answers.map((answer) => (
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
        onClick={handleSubmit}
        style={{ marginTop: "20px" }}
      >
        問題を追加
      </Button>
    </div>
  );
};

export default ProblemCreationPage;
