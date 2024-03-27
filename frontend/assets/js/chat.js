/* global axios */ 

/*=====================  SOCKET FUNCTION  =====================*/ 
function sendMessage(data) {
  const now = new Date();
  socket.emit("send_message", {
    senderName: data.senderName,
    content: data.content,
    timestamp:  now.getFullYear().toString() + "/" + (now.getMonth()+1).toString() + "/" + now.getDate().toString(),
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
/*===========================================================*/ 


/*=====================  MAIN FUNCTION  =====================*/ 
// Axios Setting
const jwtToken = document.cookie.split('=')[1];
const instance = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
      'Authorization': `${jwtToken}`,
  },
});

// Open socket
var room = "";
const socket = io("http://localhost:4000");


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

    const namelist = room.room_id.split('#');
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
}));

// Add listener
//document.querySelector(".form-msg").addEventListener("click", () => {

document.querySelector("#btn_Send").addEventListener("click", () => {
  sendMessage({
    senderName: user_info.username, 
    room_id: room_id,
    content: msgInput.value
    });
    msgInput.value = "";
    msgInput.focus();
  });
/* msgInput.addEventListener("keypress", () => {
  socket.emit("activity", nameInput.value);
}); */

// Listen for messages
socket.on("receive_message", (data) => {
  activity.textContent = "";
  const {content, senderName, timestamp, room_id} = data

  const li = document.createElement("li");
  li.className = "post";
  if (senderName === user_info.username) li.className = "post post--right";
  if (senderName !== user_info.username) li.className = "post post--left";
  if (senderName !== "Admin") {
    li.innerHTML = `<div class="post__header ${
      senderName === user_info.username ? "post__header--user" : "post__header--reply"
    }">
        <span class="post__header--name">${senderName}</span> 
        <span class="post__header--time">${timestamp}</span> 
        </div>
        <div class="post__text">${content}</div>`;
  } else {
    li.innerHTML = `<div class="post__text">${content}</div>`;
  }
  document.querySelector(".chat-display").appendChild(li);
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
});


/* let activityTimer;
socket.on("activity", (name) => {
  activity.textContent = `${name} is typing...`;

  // Clear after 3 seconds
  clearTimeout(activityTimer);
  activityTimer = setTimeout(() => {
    activity.textContent = "";
  }, 3000);
}); */
