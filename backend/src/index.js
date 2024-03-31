import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import {app} from './app.js';

dotenv.config();

export const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

// Socket
//---------------------------------------------------------------------------------
io.on("connection", (socket) => {
  // New user has connected
  console.log(`A user connected`);

  // User enter room
  socket.on("enter_room", (data) => {
    console.log("A user enter " + data.room_id)  
    socket.join(data.room_id);
    const now = new Date();
    io.to(data.room_id).emit("receive_message", {
      content: data.senderName + " is online now ", 
      senderName: data.senderName,
      timestamp: now.getFullYear().toString() + "/" + (now.getMonth()+1).toString() + "/" + now.getDate().toString(),
      room_id: data.room_id,
    })
  })

  // User leave room
  socket.on("leave_room", (data) => {
    console.log("A user leave" + data.room);
    const now = new Date();
    io.to(data.room).emit("receive_message", {
      content: data.senderId + " leaves " + data.room, 
      senderId: data.senderId,
      timestamp: now.getFullYear().toString() + "/" + (now.getMonth()+1).toString() + "/" + now.getDate().toString(),
      room:data.room,
    })
    socket.leave(data.room);
  })

  // User has sent a message
  socket.on("send_message", (data) => {
    console.log(data)
    io.to(data.room_id).emit("receive_message", data);
  });

  // User typing
  socket.on("activity", (data) => {
    console.log(data)
    io.to(data.room_id).emit("activity", {
      senderName: data.senderName});
  });
  
  // User has disconnected
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
//---------------------------------------------------------------------------------


// Connect to MongoDB & Sever Start
//---------------------------------------------------------------------------------
const port = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async() => {
    // We move app.listen() here to make sure that the server is started after the connection to the database is established.
    server.listen(port, () =>
      console.log(`Server running on port http://localhost:${port}`),
    );
    // If the connection is successful, we will see this message in the console.
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    // Catch any errors that occurred while starting the server
    console.log(error.message);
  });
//---------------------------------------------------------------------------------

