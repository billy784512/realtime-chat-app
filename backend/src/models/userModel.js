import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
        },
        password:{
            type: String,
            require: true,
        },
        image: {
            type: String,
            require: false,
        }
    }
);

const userModel = mongoose.model("user", userSchema);
export default userModel;