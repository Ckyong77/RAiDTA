import { useEffect, useState } from 'react'
import HomePage from './Product/HomePage'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import Register from './User/Register'
import Login from './User/Login'
import Checkout from './Checkout/Checkout'
import AdminBoard from './Admin/AdminBoard'
import AddNew from './Admin/AddNew'
import OrderHistory from './Customer/OrderHistory'

function App() {

  //to shorten all the route that we send to the API.
  //so all API requests made will be default starting wtih the backend URL.
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

  //as the backend session require withCredentials to allow session to persist
  //we will set all requests default withCredentials to be true. 
  axios.defaults.withCredentials = true;

  return (
    <>
      <Routes>
        <Route path="orderhistory" element={<OrderHistory />} />
        <Route path="addnew" element={<AddNew />} />
        <Route path="adminboard" element={<AdminBoard />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path='/*' element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
