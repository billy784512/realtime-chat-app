import cors from "cors";
import dotenv from "dotenv";
import express from "express";
//import cookieSession from 'cookie-session'

import signRouter from "./routes/sign.js";
import loginRouter from "./routes/login.js"
import userRouter from "./routes/user.js";
import roomRouter from "./routes/room.js";

dotenv.config();

export const app = express();
app.use(express.json());
app.use(cors({
  origin: "*",
  credentials: true,
}));

//API Routes
//---------------------------------------------------------------------------------
app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  
  app.use("/api/sign/", signRouter);
  app.use("/api/login/", loginRouter);
  app.use("/api/user/", userRouter);
  app.use("/api/room/", roomRouter);
  //---------------------------------------------------------------------------------