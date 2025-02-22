import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { auth } from "../src/firebase.ts";
import type { User } from "firebase/auth";
import CategoryListPage from './components/CategoryListPage.tsx';
import QuestionCreationPage from './components/QuestionCreationPage.tsx';
import QuestionAnswerPage from './components/QuestionAnswerPage.tsx';
import QuestionListPage from './components/QuestionListPage.tsx';
import QuestionEditPage from './components/QuestionEditPage.tsx';
import LandingPage from './components/LandingPage.tsx';
import Login from './components/Login.tsx';
import SignUp from './components/SignUp.tsx';
import Header from './Header.tsx';


type UserType = User | null;

function App() {

  const [user, setUser] = useState<UserType>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe(); // クリーンアップ
    };
  }, []);

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
