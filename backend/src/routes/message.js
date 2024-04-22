import { getAllMessage } from "../controllers/message.js"; 
import express from "express";

const router = express.Router();

router.get("/:room_id", getAllMessage);

export default router;