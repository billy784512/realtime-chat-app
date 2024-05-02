import {getSelfInfo, getUsers} from "../controllers/user.js";
import authJWT from "../middleware/authAPI.js";
import express from "express";

const router = express.Router();

router.get("/:username", authJWT, getUsers);
router.get("/", authJWT, getSelfInfo);


export default router;

