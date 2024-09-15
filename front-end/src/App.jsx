import { useEffect, useState } from 'react'
import HomePage from './Product/HomePage'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import Register from './User/Register'
import Login from './User/Login'
import Checkout from './Checkout/Checkout'
import AdminBoard from './Admin/AdminBoard'

function App() {

  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

  axios.defaults.withCredentials = true; // THIS IS VERY IMPORTANT TO INCLUDE!!!!

  return (
    <>
      <Routes>
        <Route path="adminboard" element={<AdminBoard />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
