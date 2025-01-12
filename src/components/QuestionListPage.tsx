

function QuestionListPage() {
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
        </>
    )
}
export default QuestionListPage;