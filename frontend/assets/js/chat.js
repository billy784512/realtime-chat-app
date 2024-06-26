/* global axios */ 

/*=====================  SOCKET FUNCTION  =====================*/ 
function sendMessage(data) {
  const now = new Date();
  socket.emit("send_message", {
    senderName: data.senderName,
    content: data.content,
    timestamp:  now.toLocaleString('sv'),
    room_id: data.room_id,
  });

}


function enterRoom(data) {
  socket.emit("enter_room", {
    senderName: data.senderName,
    room_id: data.room_id,
  });
}

function leaveRoom(e) {
  socket.emit("leave_room", {
    senderName: data.senderName,
    room_id: data.room_id,
  })
}
/*===========================================================*/ 


/*=====================  CALL API  =====================*/ 
async function getSelfInfo(){
  const response = await instance.get(`/user/`);
  return response;
}

async function getRoom(){
  const response = await instance.get(`/room/`);
  return response;
}

async function getMessage(room_id){
  const response = await instance.get(`/message/${room_id}`);
  return response;
}
/*===========================================================*/ 


/*=====================  MAIN FUNCTION  =====================*/ 
// Axios Setting
const value = `; ${document.cookie}`;
const part = value.split(`; jwt=`);
const jwtToken = part.pop().split(';').shift();

const instance = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
      'Authorization': `${jwtToken}`,
  },
});

// Open socket
var room = "";
const socket = io("http://localhost:4000", {
  query: {
    token: `${jwtToken}`, 
  }
});


// Get DOM node 
const msgInput = document.querySelector("#message");
const chatDisplay = document.querySelector(".chat-display");
const activity = document.querySelector(".activity");
const ul_messanger = document.querySelector("#ul_messenger");
const a_name = document.querySelector("#a_name");


// Parse params
const urlParams = new URLSearchParams(window.location.search);
const user_id = urlParams.get('user_id');
const room_id = urlParams.get('room_id');

// Update Info & Append sidebar & Enter rooom
var user_info = {};
getSelfInfo().then(result => {
  // Update user info
  a_name.innerHTML = result.data.users[0].username;
  user_info = result.data.users[0];
}).then(getRoom().then(result => {
  // Append sidebar
  result.data.forEach(room => {
    const a = document.createElement("a");
    a.href = `./chat.html?user_id=${user_info._id}&room_id=${room.room_id}`;
    a.className = "collapse__sublink";

    const namelist = room.room_id.split('_');
    if (namelist[0] === user_info.username){
      a.innerHTML = namelist[1];
    }
    else{
      a.innerHTML = namelist[0];
    }
    ul_messanger.appendChild(a);
    ul_messanger.innerHTML += "<br>";
  })
  // Enter room
  const enterRoomData = {
    room_id: room_id,
    senderName: user_info.username,
  }
  enterRoom(enterRoomData);
})).then(getMessage(room_id).then(result => {
  result.data.forEach(data => {
    appendMessage(data.content, data.sender, data.timestamp);
  })
}));

// Add listener
document.querySelector("#btn_Send").addEventListener("click", () => {
  sendMessage({
    senderName: user_info.username, 
    room_id: room_id,
    content: msgInput.value
    });
    msgInput.value = "";
    msgInput.focus();
  });

msgInput.addEventListener("keydown", () => {
  socket.emit("activity", {
    senderName: user_info.username,
    room_id: room_id
  });
});


// Listen for messages
socket.on("receive_message", (data) => {
  activity.textContent = "";
  const {content, senderName, timestamp, room_id} = data
  appendMessage(content, senderName, timestamp);
});


function appendMessage(content, senderName, timestamp){
  const timeprint = timestamp.slice(5, 16);
  const li = document.createElement("li");
  li.className = "post";
  if (senderName === user_info.username) li.className = "post post--right";
  if (senderName !== user_info.username) li.className = "post post--left";
  if (senderName !== "Admin") {
    li.innerHTML = `<div class="post__header ${
      senderName === user_info.username ? "post__header--user" : "post__header--reply"
    }">
        <span class="post__header--name">${senderName}</span> 
        <span class="post__header--time">${timeprint}</span> 
        </div>
        <div class="post__text">${content}</div>`;
  } else {
    li.innerHTML = `<div class="post__text">${content}</div>`;
  }
  document.querySelector(".chat-display").appendChild(li);
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

// Listen for activity
let activityTimer;
socket.on("activity", (data) => {
  if (data.senderName == user_info.username)
  {
    return
  }
  activity.innerHTML = `${data.senderName} is typing...`;
  // Clear after 3 seconds
  clearTimeout(activityTimer);
  activityTimer = setTimeout(() => {
    activity.textContent = "";
  }, 3000);
});
