import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import QuestionListPage from './components/QuestionListPage.tsx';
import QuestionCreationPage from './components/QuestionCreationPage.tsx';
import QuestionAnswerPage from './components/QuestionAnswerPage.tsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuestionListPage/>} />
        <Route path="/questions" element={<QuestionCreationPage/>} />
        <Route path="/test" element={<QuestionAnswerPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
