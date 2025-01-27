import { Dialog } from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function QuestionListPage() {

  useEffect(() => {
    getCategory();
  }, [])

  const [questions, setQuestions] = useState<list[]>([]);

  const getCategory = async() => {
    try {
      const response = await fetch(`http://localhost:8080/get-category?userId=${encodeURIComponent(userId)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        mode: "cors",
        credentials: "include"
      });
      const json = await response.json();
      setQuestions(json);

    } catch(e) {
      alert("カテゴリーの取得に失敗しました。");
    }
  }

    const navigate = useNavigate();
    // 一覧の型定義
    type list = {
        categoryId: number
        categoryName: string;
        questionCount: number;
    }


    // ダイアログで入力したカテゴリー名
    const [categoryName, setCategory] = useState("");

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
            categoryName,
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
            alert("問題タイトル追加時にエラーが発生しました。");
        }
        setOpen(false);
        navigate("/questions", { state: { categoryName } });
    };

    return (
        <>
        <h2>問題一覧</h2>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
    <thead>
        <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#c0c0c0" }}>タイトル</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#c0c0c0" }}>問題数</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#c0c0c0" }}></th>
        </tr>
    </thead>
    <tbody>
        {questions && questions.length > 0 ? (
            questions.map((question) => (
                <tr key={question.categoryId}>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{question.categoryName}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{question.questionCount}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        <button
                            style={{ marginRight: "8px", width: "10em" }}
                            onClick={() => navigate("/test", { state: { categoryId: question.categoryId, userId: userId } })}
                        >
                            テスト
                        </button>
                        <button style={{ width: "10em" }} onClick={() => alert(`編集`)}>
                            編集
                        </button>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan={3} style={{ textAlign: "center", padding: "8px" }}>データがありません</td>
            </tr>
        )}
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
            タイトル：<input type="text" value={categoryName} onChange={(e) => setCategory(e.target.value)}></input>
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