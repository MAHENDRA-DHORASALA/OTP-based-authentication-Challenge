import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {
    await fetch("http://localhost:5001/auth/request-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier }),
    });

    localStorage.setItem("identifier", identifier);
    navigate("/verify");
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="Email or Phone"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />
      <button onClick={sendOtp}>Send OTP</button>
    </div>
  );
}

