/* global axios */ 

/*=====================  CALL API  =====================*/ 
async function findUser(data){
  const response = await instance.get(`/user/${data}`);
  return response;
}

async function getSelfInfo(){
  const response = await instance.get(`/user/`);
  return response;
}

async function createRoom(data){
  const response = await instance.post(`/room/`, data);
  return response;
}

async function getRoom(){
  const response = await instance.get(`/room/`);
  return response;
}
/*======================================================*/ 


/*=====================  MAIN FUNCTION  =====================*/ 

// Axios Setting
const jwtToken = document.cookie.split('=')[1];

const instance = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
      'Authorization': `${jwtToken}`,
  },
});

/* instance.interceptors.request.use(function (config) {
  console.log('Request:', config);
  return config;
}, function (error) {
  return Promise.reject(error);
}); */


// Get DOM node 
const nameInput = document.querySelector("#name");
const div_user = document.querySelector("#div_user");
const btn_search = document.querySelector("#btn_search");
const ul_messanger = document.querySelector("#ul_messenger");
const a_name = document.querySelector("#a_name");


// Update Info & Append chatroom
var user_info = {};
getSelfInfo().then(result => {
  a_name.innerHTML = result.data.users[0].username;
  user_info = result.data.users[0];
}).then(getRoom().then(result => {
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
}));


// Add search event listener
btn_search.addEventListener("click", async()=>{
  try{
    response = await findUser(nameInput.value);
    var result = Object.keys(response.data).map((key) => response.data[key]);
    div_user.innerHTML = "";

    result[0].forEach(user => {
      const div1 = document.createElement("div");
      const div2 = document.createElement("div");
      const div3 = document.createElement("div");
      const div4 = document.createElement("div");
      const btn = document.createElement("btn");
      const br = document.createElement("br");

      div1.className = "card-container";
      div2.className = "lower-container";
      div3.innerHTML = `<h4>${user[0]}</h4>`;
      div4.id = "add_friend";
      btn.className = "btn";
      btn.innerText = "Chat Now!"

      div_user.appendChild(div1);
      div1.appendChild(div2);
      div2.appendChild(div3);
      div2.appendChild(div4);
      div4.appendChild(btn);
      div_user.appendChild(br);


      btn.addEventListener("click", async() => {
        const newRoom = await createRoom({username: user[0]});
        console.log(newRoom);
      })
    })
  }catch(error){
    console.log(error);
  }
})