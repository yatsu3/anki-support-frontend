import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import QuestionListPage from './components/QuestionListPage.tsx';
import Test from './components/Test.tsx';
import QuestionCreationPage from './components/QuestionCreationPage.tsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/test" element={<Test/>} />    
        <Route path="/" element={<QuestionListPage/>} />
        <Route path="/questions" element={<QuestionCreationPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
