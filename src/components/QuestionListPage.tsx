import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useApi } from "../utils/api.ts";


const QuestionListPage = () => {
  const { user } = useAuth();
  const { getApi } = useApi();


  const navigate = useNavigate();

  interface Question {
    questionId,
    questionContent
  }

  const location = useLocation();
  const categoryId = location.state?.categoryId || "";
  const categoryName = location.state?.categoryName || "";
  const uuid = location.state?.uuid || "";

  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    getQuestionList();
  },[])

  const getQuestionList = async() => {
    try {
      const response = await getApi(`http://localhost:8080/question-list?categoryId=${encodeURIComponent(categoryId)}&uuid=${encodeURIComponent(uuid)}`, user.accessToken);
      setQuestions(response);
    } catch (error) {
      console.error("問題の取得に失敗しました:", error);
    }
  }

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>問題</TableCell>
            <TableCell>操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {questions.length > 0 ? (
          questions.map((question) => (
            <TableRow
              key={question.questionId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {question.questionContent}
              </TableCell>
              <TableCell><button onClick={() => navigate("/edit-question", {state: {questionId: question.questionId, uuid: uuid}})}>編集</button><button>削除</button></TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={2} align="center">
              問題がないので追加しよう！
            </TableCell>
          </TableRow>
        )}
        </TableBody>
      </Table>
    </TableContainer>
    <button onClick={() => navigate("/questions", { state: { categoryName: categoryName, uuid: uuid } })}>追加</button>
    </>
  );

}
export default QuestionListPage;
