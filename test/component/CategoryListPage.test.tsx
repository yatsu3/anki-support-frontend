import React from 'react';
import { render, screen, waitFor, fireEvent, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CategoryListPage from '../../src/components/CategoryListPage';

// TODO: memo
// jest.spyOnとjest.mockの違い
// spyOnは上書きするためのものであり変更可能である必要がある
// react-router-domのuseNavigateのようなものは変更不可のためspyOnは使えない
// jest.mockはモジュールをまるごとモックできる。

// 認証系のモック
jest.mock('../../src/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: {
      uid: 'test-uuid',
      getIdToken: jest.fn().mockResolvedValue('test-token')
    }
  })
}));

// APIのモック
const postApiMock = jest.fn();
const getApiMock = jest.fn().mockResolvedValue([
  { categoryId: 1, categoryName: 'カテゴリ1', questionCount: 3 },
  { categoryId: 2, categoryName: 'カテゴリ2', questionCount: 5 }
]);
jest.mock('../../src/utils/api', () => ({
  useApi: () => ({
    getApi: getApiMock,
    postApi: postApiMock
  })
}));

// react-router-domのuseNavigateのモック
const mockNavigate= jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // 他の機能は本物を使う
  useNavigate: () => mockNavigate,
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('CategoryListPage', () => {

  describe('正常系', () => {
    it('カテゴリー一覧が表示されること', async () => {
      render(
        <BrowserRouter>
          <CategoryListPage />
        </BrowserRouter>
      );
  
      await waitFor(() => {
        expect(screen.getByText('カテゴリ1')).toBeInTheDocument();
        expect(screen.getByText('カテゴリ2')).toBeInTheDocument();
      });
    });
  
    it('問題作成ボタンを押すとカテゴリー追加モーダルが表示されること', async () => {
  
      render(
        <BrowserRouter>
          <CategoryListPage />
        </BrowserRouter>
      );
  
      fireEvent.click(screen.getByText('問題作成'));
  
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: '新しいカテゴリ' } });
  
      fireEvent.click(screen.getByText('OK'));
  
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/questions', {
          state: { categoryName: '新しいカテゴリ', uuid: 'test-uuid' }
        });
      });
    });
  
    it('カテゴリー追加ダイアログでOKボタンを押すとpostApiが呼ばれてnavigateされること', async () => {
  
      render(
        <BrowserRouter>
          <CategoryListPage />
        </BrowserRouter>
      );
  
      fireEvent.click(screen.getByText('問題作成'));
  
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: '新しいカテゴリ' } });
  
      fireEvent.click(screen.getByText('OK'));
  
      await waitFor(() => {
        expect(postApiMock).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/questions', {
          state: { categoryName: '新しいカテゴリ', uuid: 'test-uuid' }
        });
      });
    });

    it('カテゴリー追加ダイアログでキャンセルボタンを押すとAPIは呼ばれずモーダルが閉じること', async () => {
  
      render(
        <BrowserRouter>
          <CategoryListPage />
        </BrowserRouter>
      );
  
      fireEvent.click(screen.getByText('問題作成'));
  
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: '新しいカテゴリ' } });
  
      fireEvent.click(screen.getByText('キャンセル'));
  
      await waitFor(() => {
        expect(postApiMock).toHaveBeenCalledTimes(0);
        expect(screen.queryByText('タイトル：')).not.toBeInTheDocument();
      });
    });

    it('テストボタンを押すと/testでnavigateされること', async () => {
  
      render(
        <BrowserRouter>
          <CategoryListPage />
        </BrowserRouter>
      );
  
      await waitFor(() => {
        const rows = screen.getAllByRole("row");
        const firstRow = rows[1];
        const testButton = within(firstRow).getByText("テスト");

        fireEvent.click(testButton);

        expect(mockNavigate).toHaveBeenCalledWith('/test', {
          state: { categoryId: 1, uuid: 'test-uuid' }
        });
      });
    });

    it('編集ボタンを押すと/question-listでnavigateされること', async () => {
  
      render(
        <BrowserRouter>
          <CategoryListPage />
        </BrowserRouter>
      );
  
      await waitFor(() => {
        const rows = screen.getAllByRole("row");
        const firstRow = rows[1];
        const testButton = within(firstRow).getByText("編集");

        fireEvent.click(testButton);

        expect(mockNavigate).toHaveBeenCalledWith('/question-list', {
          state: { categoryId: 1, uuid: 'test-uuid', categoryName: 'カテゴリ1' }
        });
      });
    });
  
  })

  describe('異常系', () => {
    it('カテゴリーの取得に失敗した時にアラートが表示されること', async () => {
      getApiMock.mockRejectedValue(new Error("error"));
      const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

      render(
        <BrowserRouter>
          <CategoryListPage />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(getApiMock).toHaveBeenCalled();
        expect(alert).toHaveBeenCalledWith('カテゴリーの取得に失敗しました。');
      })
    })

    it('カテゴリー追加ダイアログで問題作成ボタンを押した時にAPIエラーが発生した場合、アラートが表示されること', async () => {

      postApiMock.mockRejectedValue(new Error('API error'));
      const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
  
      render(
        <BrowserRouter>
          <CategoryListPage />
        </BrowserRouter>
      );
  
      const createButton = screen.getByText('問題作成');
      fireEvent.click(createButton);
      
      // 文字入力してOKをクリック
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'テストカテゴリー' } });
      fireEvent.click(screen.getByText('OK'));
  
      await waitFor(() => {  
        expect(postApiMock).toHaveBeenCalled();
        expect(alertMock).toHaveBeenCalledWith('問題タイトル追加時にエラーが発生しました。');    });
    });
  })
});