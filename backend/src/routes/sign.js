import{
    checkUser,
    createUser,
    getUsers,
}from "../controllers/user.js";
import express from "express";

const router = express.Router();

router.get("/:username", checkUser);
router.post("/", createUser);

export default router;