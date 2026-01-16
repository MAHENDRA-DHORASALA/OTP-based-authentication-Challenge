import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import VerifyOtp from "./VerifyOtp";
import Welcome from "./Welcome";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verify" element={<VerifyOtp />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
}
