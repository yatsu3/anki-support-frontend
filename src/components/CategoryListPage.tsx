import { Dialog } from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useApi } from "../utils/api";


function CategoryListPage() {
  const { getApi, postApi } = useApi();

  const { user } = useAuth();

  useEffect(() => {
    getCategory();
  }, [])

  const [questions, setQuestions] = useState<list[]>([]);
      // TODO: 今はuuidを使い回ししているが、バックエンドで採番したuserIdを設定したい
    const [uuid, setUuid] = useState(user.uid);

  const getCategory = async() => {
    try {
      const token = await user.getIdToken();
      console.log("token:", token);
      console.log("uuid:", uuid);
      const response = await getApi(`https://anki-support-backend.onrender.com/get-category?uuid=${encodeURIComponent(uuid)}`, token);
      setQuestions(response);
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
            uuid
        }
        try {
          const token = await user.getIdToken();
            await postApi("http://localhost:8080/add-category", token, categoryInfo);
        } catch (e) {
            alert("問題タイトル追加時にエラーが発生しました。");
        }
        setOpen(false);
        navigate("/questions", { state: { categoryName: categoryName, uuid: uuid } });
    };

    return (
        <>
        <h2>カテゴリー一覧</h2>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
    <thead>
        <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#c0c0c0" }}>カテゴリータイトル</th>
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
                            onClick={() => navigate("/test", { state: { categoryId: question.categoryId, uuid: uuid } })}
                        >
                            テスト
                        </button>
                        <button style={{ width: "10em" }} onClick={() => navigate("/question-list", {state: {categoryId: question.categoryId, uuid: uuid, categoryName: question.categoryName}})}>
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
export default CategoryListPage;