import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import CategoryListPage from './components/CategoryListPage.tsx';
import QuestionCreationPage from './components/QuestionCreationPage.tsx';
import QuestionAnswerPage from './components/QuestionAnswerPage.tsx';
import QuestionListPage from './components/QuestionListPage.tsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CategoryListPage/>} />
        <Route path="/question-list" element={<QuestionListPage/>} />
        <Route path="/questions" element={<QuestionCreationPage/>} />
        <Route path="/test" element={<QuestionAnswerPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
