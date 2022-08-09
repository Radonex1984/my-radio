import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./pages/contact";
import Radio from "./components/Radio";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/Contact" element={<Contact />} />
      </Routes>
      <Radio></Radio>
    </Router>
  );
}


export default App;
