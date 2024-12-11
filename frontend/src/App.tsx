import React from 'react';
import './App.css';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/main-page' element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
