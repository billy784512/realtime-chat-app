/* global axios */ 

// Call API 
// -------------------------------------------------------------
async function userLogin(data){
    console.log(data);
    const response = await instance.post(`/login/`, data);
    return response;
  }
// -------------------------------------------------------------

const instance = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {
        'Content-Type': 'application/json'
    },
  });

const txt_username = document.querySelector("#txt_username");
const txt_password = document.querySelector("#txt_password");
const btn_login = document.querySelector("#btn_login");

btn_login.addEventListener("click", async () => {
    try{
        var data = {
            username: txt_username.value,
            password: txt_password.value
        }
        var response = await userLogin(data);

        if (response.status === 200){
            document.cookie = `${response.data.token}; max-age=604800; path=/; domain=localhost`
            window.location.href = './index.html';
        }
        else{
            window.alert("Wrong username or password");
        }
    }catch(error){
        window.alert("Failed to login...");
    }
})


