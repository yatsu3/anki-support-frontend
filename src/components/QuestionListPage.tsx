import { Dialog } from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function QuestionListPage() {

    const navigate = useNavigate();
    // 一覧の型定義
    type list = {
        id: number
        title: string;
        questionCount: number;
        updatedTime: string;
    }

    // 仮データ
    const questions: list[] = [
        {id: 1, title: "Azure Develop", questionCount: 10, updatedTime: "2025-01-01"},
        {id: 2, title: "Java Gold", questionCount: 10, updatedTime: "2025-01-01"},
        {id: 3, title: "問題3", questionCount: 20, updatedTime: "2025-01-01"},
        {id: 4, title: "問題4", questionCount: 30, updatedTime: "2025-01-01"},
    ]

    // ダイアログで入力したカテゴリー名
    const [title, setTitle] = useState("");

    // ユーザーID（仮）
    const [userId, setUserId] = useState(1);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createQuestion = async() => {
        const categoryInfo = {
            title,
            userId
        }
        try {
            const response = await fetch("http://localhost:8080/add-category", {
                method: "POST",
                headers: {
                  "Content-Type" : "application/json",
                  "Accept": "application/json",
                },
                mode: "cors",
                credentials: "include",
                body: JSON.stringify(categoryInfo) 
            })
        } catch (e) {
            alert("エラー発生");
        }
        setOpen(false);
        navigate("/questions", { state: { title } });
    };

    return (
        <>
        <h2>問題一覧</h2>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
                <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#c0c0c0"}}>タイトル</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#c0c0c0" }}>問題数</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#c0c0c0" }}>更新日</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#c0c0c0" }}></th>
                </tr>
            </thead>
            <tbody>
                {questions.map((question) => (
                                <tr key={question.id}>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{question.title}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{question.questionCount}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{question.updatedTime}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        <button style={{ marginRight: "8px", width: "10em"}} onClick={() => alert(`テスト: ${question.title}`)}>
                        テスト
                        </button>
                        <button style={{ width: "10em"}}onClick={() => alert(`編集: ${question.title}`)}>編集</button>
                    </td>
                    </tr>

                ))}
            </tbody>
        </table>
        <button onClick={handleClickOpen}>問題作成</button>

        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"問題作成"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            タイトル：<input type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={createQuestion} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
        </>
    )
}
export default QuestionListPage;