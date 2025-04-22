import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import CategoryListPage from './components/CategoryListPage';
import QuestionCreationPage from './components/QuestionCreationPage';
import QuestionAnswerPage from './components/QuestionAnswerPage';
import QuestionListPage from './components/QuestionListPage';
import QuestionEditPage from './components/QuestionEditPage';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Header from './Header';
import { useAuth } from "./contexts/AuthContext";

function App() {
  const {user, loading} = useAuth();
  if (loading) {
    return <div>Loading...</div>; // ローディング中の表示
  }
  return (
    <Router>
      {user ? (
        <>
      <Header/>
      <Routes>
        <Route path="/" element={<CategoryListPage/>} />
        <Route path="/question-list" element={<QuestionListPage/>} />
        <Route path="/questions" element={<QuestionCreationPage/>} />
        <Route path="/edit-question" element={<QuestionEditPage/>} />
        <Route path="/test" element={<QuestionAnswerPage/>}/>
      </Routes>
      </>
    ) : (
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/sign-up" element={<SignUp/>} />
      </Routes>
      )}
    </Router>
  );
}

export default App;
