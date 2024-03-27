import{
    userLogin,
}from "../controllers/user.js";
import express from "express";

const router = express.Router();

router.post("/", userLogin);

export default router;