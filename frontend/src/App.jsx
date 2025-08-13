import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import toast, { Toaster } from 'react-hot-toast';
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from './components/Navbar'
import About from './pages/About'
import Products from './pages/Product'


function App() {


  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/Products" element={<Products />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  )
}

export default App
