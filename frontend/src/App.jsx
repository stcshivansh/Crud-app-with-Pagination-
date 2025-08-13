import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import toast, { Toaster } from 'react-hot-toast';
import Home from './pages/Home'
import {  Routes, Route } from "react-router";
import Navbar from './components/Navbar'
import About from './pages/About'
import Products from './pages/Product'
import { useLocation } from 'react-router';
import ProductsModal from './components/ProductModal';
function App() {

  return (
    <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />}>
            <Route path="add" element={<ProductsModal />} />
            <Route path=":id/edit" element={<ProductsModal />} />
          </Route>
          <Route path="*" element={<Products />} />
        </Routes>
        <Toaster />
    </div>
  )
}

export default App
