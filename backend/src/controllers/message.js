import messageModel from "../models/messageModel.js";
import roomModel from "../models/roomModel.js";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

export const pushMessage = async (req, res) => {
    const {id, content, sender} = req.body;
    var now = new Date();

    try{
        const room = await roomModel.find({_id: id});
        const newMessage = await messageModel.create({
            sender: sender,
            content: content,
            timestamp: now
        });

        room.message.push(newMessage);
        await room.save();

        return res.status(201).json(room);
    }catch(error){
        return res.status(500).jons({error: error.message});
    }
};

export const getAllMessage = async (req, res) => {
    const {id} = req.params

    try{
        const room = await roomModel.find({_id: id});
        const messages = room.messages;

        return res.status(200).json(messages);
    }catch(error){
        return res.status(500).json(error);
    }
};
