import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: String,
            require: true
        },
        content: {
            type: String,
            require: true
        },
        timestamp: {
            type: String,
            require: true
        }
    }
);

const messageModel = mongoose.model("message", messageSchema);
export default messageModel;