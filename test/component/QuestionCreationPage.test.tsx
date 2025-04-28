import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import '@testing-library/jest-dom';
import QuestionCreationPage from '../../src/components/QuestionCreationPage';
import userEvent from "@testing-library/user-event";

// react-router-domのuseLocationのモック
const mockLocation= jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'), // 他の機能は本物を使う
    useLocation: () => mockLocation
}));

// APIのモック
const postApiMock = jest.fn();
jest.mock("../../src/utils/api", () => ({
    useApi: () => ({
        postApi: postApiMock,
        getApi: jest.fn()
    })
}))

// 認証系のモック
jest.mock('../../src/contexts/AuthContext', () => ({
    useAuth: () => ({
      user: {
        uid: 'test-uuid',
        getIdToken: jest.fn().mockResolvedValue('test-token')
      }
    })
  }));

afterEach(() => {
    jest.clearAllMocks();
})

describe("QuestionCreationPate", () => {

    describe("正常系", () => {
        it("初期表示時に各要素が存在すること", () => {
            render(
                <QuestionCreationPage />
            );
            expect(screen.getByText("問題作成画面")).toBeInTheDocument();
            expect(screen.getByLabelText("カテゴリー")).toBeInTheDocument();
            expect(screen.getByLabelText("問題")).toBeInTheDocument();
            expect(screen.getByLabelText("解答 1")).toBeInTheDocument();
            expect(screen.getByLabelText("解答 2")).toBeInTheDocument();
            expect(screen.getByLabelText("正解")).toBeInTheDocument();
            expect(screen.getByLabelText("解説")).toBeInTheDocument();
            expect(screen.getByText("問題を追加")).toBeInTheDocument();
        })

        it("解答を追加ボタンを押した時に解答 3が表示されること", () => {
            render(
                <QuestionCreationPage />
            );

            fireEvent.click(screen.getByText('＋ 解答を追加'));

            expect(screen.getByLabelText("解答 3")).toBeInTheDocument();
        })

        it("カテゴリー入力したときに値が更新されること", () => {
            render(
                <QuestionCreationPage />
            );

            const categoryInput = screen.getByLabelText("カテゴリー") as HTMLInputElement;
      
            // 最初は空白のはず
            expect(categoryInput.value).toBe("");
      
            // カテゴリーに文字を入力する
            fireEvent.change(categoryInput, { target: { value: "テストカテゴリー" } });
      
            // 入力された値が反映されていることを確認
            expect(categoryInput.value).toBe("テストカテゴリー");
        })

        it("問題を入力したときに値が更新されること", () => {
            render(
                <QuestionCreationPage />
            );

            const questionInput = screen.getByLabelText("問題") as HTMLInputElement;
      
            // 最初は空白のはず
            expect(questionInput.value).toBe("");
      
            // カテゴリーに文字を入力する
            fireEvent.change(questionInput, { target: { value: "問題です" } });
      
            // 入力された値が反映されていることを確認
            expect(questionInput.value).toBe("問題です");
        })

        it("正解を選択した時に値が更新されること", async() => {
            render(
                <QuestionCreationPage />
            );

            const correctAnswerSelect = screen.getByLabelText("正解");

            // セレクトを開く（MUIのSelectはbuttonみたいな感じ）
            await userEvent.click(correctAnswerSelect);

            // 選択肢から「解答 1」を探す
            const options = await screen.findAllByRole("option");
            const answerOption = options.find(option => option.textContent === "解答 1");

            // クリックして選択する
            await userEvent.click(answerOption);

            // ちゃんと値が選択されてるか確認
            expect(correctAnswerSelect).toHaveTextContent("解答 1");

             // 「解答 1」のTextFieldを取得
            const answerInput = screen.getByLabelText("解答 1");

            // 入力する
            await userEvent.clear(answerInput); // まず既存の値をクリア
            await userEvent.type(answerInput, "解答 2");

            // 入力されたことを確認
            expect(answerInput).toHaveValue("解答 2");

        })

        it("解説を入力したときに値が更新されること", () => {
            render(
                <QuestionCreationPage />
            );

            const explanationInput = screen.getByLabelText("解説") as HTMLInputElement;
      
            // 最初は空白のはず
            expect(explanationInput.value).toBe("");
      
            // カテゴリーに文字を入力する
            fireEvent.change(explanationInput, { target: { value: "解説です" } });
      
            // 入力された値が反映されていることを確認
            expect(explanationInput.value).toBe("解説です");
        })

        it("問題を追加ボタンを押すとpostApiが呼ばれること", async() => {
            const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
            render(
                <QuestionCreationPage />
            );

            fireEvent.click(screen.getByText("問題を追加"));
            
            await waitFor(() => {
                expect(postApiMock).toHaveBeenCalled();
                expect(alertMock).toHaveBeenCalledWith("問題を追加しました。");
            })

        })
    })

    describe("異常系", () => {
        it("問題を追加ボタンを押した時にAPIエラーが発生した場合、アラートが表示されること", async() => {
            postApiMock.mockRejectedValue(new Error('API error'));
            const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
            render(
                <QuestionCreationPage />
            );

            fireEvent.click(screen.getByText("問題を追加"));
            
            await waitFor(() => {
                expect(postApiMock).toHaveBeenCalled();
                expect(alertMock).toHaveBeenCalledWith("問題追加時にエラーが発生しました。");
            })
        })
    })
})