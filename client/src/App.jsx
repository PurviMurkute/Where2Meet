import React from 'react'
import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import GoogleSuccess from './components/GoogleSuccess';
import Groups from './pages/Groups';
import LocationSharing from './pages/LocationSharing';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/register" element={<Register />} ></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/google-success' element={<GoogleSuccess />}></Route>
        <Route path='/groups' element={<Groups />}></Route>
        <Route path='/location-sharing' element={<LocationSharing />}></Route>
      </Routes>
    </div>
  )
}

export default App;