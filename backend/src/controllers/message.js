import messageModel from "../models/messageModel.js";
import roomModel from "../models/roomModel.js";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

export const pushMessage = async (data) => {
    const {senderName, content, timestamp, room_id} = data;

    try{
        const rooms = await roomModel.find({room_id: room_id});
        const newMessage = await messageModel.create({
            sender: senderName,
            content: content,
            timestamp: timestamp
        });
        rooms[0].messages.push(newMessage);
        await rooms[0].save();

        return rooms[0];
    }catch(error){
        return error.message;
    }
};

export const getAllMessage = async (req, res) => {
    const {room_id} = req.params;

    try{
        const room = await roomModel.findOne({room_id: room_id});
        const msgPromise = room.messages.map(async id => {
            const msg = await messageModel.findOne({_id: id.toHexString()});
            return msg;
        });

        const msg_list = await Promise.all(msgPromise);
        return res.status(200).json(msg_list);
    }catch(error){
        return res.status(500).json(error);
    }
};

