import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userLogin from "./routes/login.js";
import token from "./routes/verifyToken.js";
import logout from "./routes/logout.js"
import DsaList from "./routes/DsaData.js"

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.WEB_BASE_URL,
    credentials: true,
  })
);

// Routes

app.use("/api", [userLogin, token, logout,DsaList]);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
