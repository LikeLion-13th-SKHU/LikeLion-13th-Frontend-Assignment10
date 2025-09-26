import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ChangePassword from "./pages/ChangePassword";
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>    
    </BrowserRouter>
  );
}