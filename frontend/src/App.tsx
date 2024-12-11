import React from 'react';
import './App.css';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
