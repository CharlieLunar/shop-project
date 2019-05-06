class Login {
    constructor(){
        this.inputUserName = document.querySelector("#inputUserName");
        this.inputPassword = document.querySelector("#inputPassword");
        this.btn = document.querySelector("#btn");
        this.checkbox = document.querySelector("#checkbox");
        this.bindEvent();
    }
    bindEvent(){
        this.btn.onclick = () => {
            let username = this.inputUserName.value,
                password = this.inputPassword.value;

        //数据验证
        //发送请求
        tools.ajax("POST","../api/v1/login.php",{username,password},data => {
            if(data.res_code === 1){
                //将用户名存在cookie
                if(this.checkbox.checked){
                    tools.cookie("username",username,{expires : 7, path : "/"});
                }else{
                    tools.cookie("username",username,{path : "/"});
                }
                
                alert(data.res_message);
                window.location.href = "../index.html";
            }else{
                alert(data.res_message);
            }
        })
        return false;//阻止默认事件
        }
    }
}
new Login();