import roomModel from "../models/roomModel.js";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

async function fetchUserData(usernames) {
    let users = [];

    for (let username of usernames) {
        try {
            const tmpUser = await userModel.find({username: username});
            if (tmpUser) {
                users.push(tmpUser[0]);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }
    return users;
}

export const createRoom = async(req, res) => {
    const {username} = req.body;
    const usernames = [username, req.user.username].sort();
    const room_id = usernames[0].toString() + "_" + usernames[1].toString();
    try{
        // Check room existence
        const check = await roomModel.find({room_id: room_id});
        if (check.length !== 0){
            await roomModel.findByIdAndDelete(check[0]._id);
            return res.status(404).json({message: "existing room"});
        }
        fetchUserData(usernames).then(
            async users => {
                const newRoom = await roomModel.create({
                    room_id: room_id,
                    users: users
                })
                console.log(newRoom);
                return res.status(201).json(newRoom);
            }
        );
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const getRooms = async(req, res) => {
    const {username} = req.user;
    try{
        const rooms_find = await roomModel.find({}).populate({path: 'users', match: {username: username}}).exec();
        const room_id_arr = rooms_find.map(item => item._id);
        const rooms = await roomModel.find({_id: {$in: room_id_arr}});
        return res.status(200).json(rooms);
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
};

export const deleteRooms = async(req, res) => {
    try{
        await roomModel.deleteMany({});
    }catch(error){
        console.log(error);
    }
}