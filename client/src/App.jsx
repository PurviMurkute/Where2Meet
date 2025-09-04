import React from 'react'
import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import GoogleSuccess from './components/GoogleSuccess';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/register" element={<Register />} ></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/google-success' element={<GoogleSuccess />}></Route>
      </Routes>
    </div>
  )
}

export default App;