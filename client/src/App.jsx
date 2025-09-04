import React from 'react'
import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import Register from './pages/Register';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App;