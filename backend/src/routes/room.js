import{
    getRooms,
    createRoom
}from "../controllers/room.js";
import authJWT from "../middleware/auth.js"
import express from "express";

const router = express.Router();

router.get("/", authJWT, getRooms);
router.post("/", authJWT, createRoom);;

export default router;