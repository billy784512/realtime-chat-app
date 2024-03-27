/* global axios */ 

// Call API 
// -------------------------------------------------------------
async function checkUser(newUser){
    const response = await instance.get(`/sign/${newUser.username}`);
    return response.data;
  }

async function signUser(newUser){
    const response = await instance.post("/sign", newUser)
    return response.data;
}
// -------------------------------------------------------------


const instance = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {
        'Content-Type': 'application/json'
    }
  });

instance.interceptors.request.use(function (config) {
    console.log('Request:', config);
    return config;
}, function (error) {
    return Promise.reject(error);
});


const txt_username = document.querySelector("#txt_username");
const txt_password = document.querySelector("#txt_password");
const btn_sign = document.querySelector("#btn_sign");

btn_sign.addEventListener("click", async () => {
    try{
        const newUser = {
            username: txt_username.value,
            password: txt_password.value,
            image: "",
        };
        const find = await checkUser(newUser);
        if (find.check){
            signUser(newUser);
            window.alert("Sign up successfully, you can login now");
            window.location.href = './login.html';
        }
        else{
            window.alert("Duplicated username.");
        }
    }catch(error){
        window.alert("Failed to sign up...");
    }
})


