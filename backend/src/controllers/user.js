import userModel from "../models/userModel.js";
import dotenv from "dotenv";
import pkg from "jsonwebtoken";
import crypto from "crypto";

const {sign, verify} = pkg;
dotenv.config();

export const getSelfInfo = async (req, res) => {
    const {username} = req.user;
    try{
        const users = await userModel.find({username: username});
        return res.status(200).json({users});
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}

export const getUsers = async (req, res) => {
    const {username} = req.params;
    try{
        const users = await userModel.find({username: username});
        var userArr = [];
        users.forEach((user) => userArr.push([user.username, user.password]));
        return res.status(200).json({userArr});
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}

export const checkUser = async (req, res) => {
    const { username }  = req.params;
    try{
        const user = await userModel.find({ username: username});
        console.log(user)
        return res.status(200).json({ check: user.length === 0});
    } catch(error){
        return res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    const { username, password, image } = req.body;

    // Fool proofing
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password can not be empty!" });
    }

    // Duplicated username
    const users = await userModel.find({username: username});
    if (users.length !== 0){
        return res.status(400).json({message: 'Duplicated username'})
    }

    try{
        const newUser = await userModel.create({
            username: username,
            password: password,
            image: image,
        });
        return res.status(201).json(newUser);
    } catch(error){
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const userLogin = async (req, res) => {
    const {username, password} = req.body;
    try{
        // try get user
        const users = await userModel.find({username: username});

        // no user match
        if (users.length === 0){
            return res.status(401).json({message: 'Not existing user'})
        }

        // wrong password
        const user = users[0]
        if (user.password !== password.toString()){
            return res.status(401).json({message: 'Invalid username or password'});
        }

        // return token
        var token = sign({username: user.username}, process.env.JWT_SECRET);
        token = "jwt=" + token
        return res.status(200).json({token});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ message: error.message});
    }
}
