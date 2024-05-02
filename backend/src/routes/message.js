import { getAllMessage } from "../controllers/message.js"; 
import authJWT from "../middleware/authAPI.js"
import express from "express";

const router = express.Router();

router.get("/:room_id", authJWT, getAllMessage);

export default router;