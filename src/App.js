import styles from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from "./pages/Books";
import RegisterPage from "./pages/Add";
import Update from "./pages/Update";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import React, { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
		  <Route path="/dashboard" element={<Dashboard />} />
		  <Route path="/Books" element={<Books />} />
		  <Route path="/login" element={<Login />} />
		 
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;