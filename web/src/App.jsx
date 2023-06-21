import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Service from "./routes/Service";
import Contact from "./routes/Contact";
import Register from './routes/Register';
import TravelPlan from './routes/TravelPlan';
import Login from "./routes/Login"

function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/service" element={<Service/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/travelplan" element={<TravelPlan/>}/>
          <Route path="/login" element={<Login/>} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App
