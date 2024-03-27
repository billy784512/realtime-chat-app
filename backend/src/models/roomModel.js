import mongoose from "mongoose";
import messageModel from "./messageModel.js";

const roomSchema = new mongoose.Schema(
    {
        room_id:{
            type: String,
            require: true,
        },
        users: {
            type: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
            require: true
        },
        messages: {
            type: [{type: mongoose.Schema.Types.ObjectId, ref: 'message'}],
            require: false
        },
    }
);

const roomModel = mongoose.model("room", roomSchema);
export default roomModel;