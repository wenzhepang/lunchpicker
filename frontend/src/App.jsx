import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FoodManagement from "./pages/FoodManagement";
import About from "./pages/About";

//export const BASE_URL = "https://cs732-assignment-wenzhepang.onrender.com"
export const BASE_URL = "http://127.0.0.1:5000";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/manage" element={<FoodManagement />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;