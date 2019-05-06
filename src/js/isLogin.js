let unloginUl = document.querySelector("#unlogin-ul");
let loginUl = document.querySelector("#login-ul");
let usernameSpan = document.querySelector("#usrname-span");

let username = tools.cookie("username");
if(username){
    unloginUl.classList.add("hidden");
    usernameSpan.innerHTML = username;
    loginUl.classList.remove("hidden");
}