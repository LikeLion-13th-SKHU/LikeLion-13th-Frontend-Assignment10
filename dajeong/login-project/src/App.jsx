import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ChangePassword from "./components/ChangePassword";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/password" element={<ChangePassword />} />
    </Routes>
  );
}
