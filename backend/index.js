const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());


const OTP_EXPIRY = 5 * 60 * 1000; // 5 Minutes
const BLOCK_TIME = 10 * 60 * 1000; 

const otpStore = {};
const blockedUsers = {};
const sessions = {};

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}


app.post("/auth/request-otp", (req, res) => {
  const { identifier } = req.body;

  if (!identifier) {
    return res.status(400).json({ error: "Identifier required" });
  }

  if (blockedUsers[identifier] && blockedUsers[identifier] > Date.now()) {
    return res.status(403).json({ error: "Blocked. Try later." });
  }

  const otp = generateOtp();

  otpStore[identifier] = {
    otp,
    expiresAt: Date.now() + OTP_EXPIRY,
    attempts: 0,
  };

  console.log(`OTP for ${identifier}: ${otp}`);

  res.json({ message: "OTP sent" });
});

app.post("/auth/verify-otp", (req, res) => {
  const { identifier, otp } = req.body;
  const record = otpStore[identifier];

  if (!record) {
    return res.status(400).json({ error: "OTP not requested" });
  }

  if (record.expiresAt < Date.now()) {
    delete otpStore[identifier];
    return res.status(400).json({ error: "OTP expired" });
  }

  if (record.otp !== otp) {
    record.attempts++;

    if (record.attempts >= 3) {
      blockedUsers[identifier] = Date.now() + BLOCK_TIME;
      delete otpStore[identifier];
      return res.status(403).json({ error: "Blocked for 10 minutes" });
    }

    return res.status(400).json({ error: "Invalid OTP" });
  }

  const token = uuidv4();
  sessions[token] = { identifier };

  delete otpStore[identifier];

  res.json({ token });
});

app.get("/auth/me", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "No token" });

  const token = auth.split(" ")[1];
  if (!sessions[token]) {
    return res.status(401).json({ error: "Invalid token" });
  }

  res.json({ identifier: sessions[token].identifier });
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});


