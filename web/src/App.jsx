import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useContext } from "react"
import { Context } from "./context/userContext/Context"


import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Service from "./routes/Service";
import Contact from "./routes/Contact";
import Register from './routes/Register';
import TravelPlan from './routes/TravelPlan';
import Login from "./routes/Login"
import AdminDashboard from './routes/pages/AdminPages/AdminDashboard'
import UserDashboard from './routes/pages/UserPages/UserDashboard'
import AdminProfile from './routes/pages/AdminPages/AdminProfile'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  let USER = JSON.parse(localStorage.getItem("user"))

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/service" element={<Service/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/travelplan" element={USER ? <TravelPlan/> : Home}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/user" element={<UserDashboard/>} />
          <Route path="/admin" element={<AdminDashboard/>}>
             <Route path="profile" element={<AdminProfile/>}/>
          </Route>
          
        </Routes>
        {/* <Footer/> */}
        </BrowserRouter>
    </div>
  );
}

export default App
