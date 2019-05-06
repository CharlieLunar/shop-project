//添加商品 向数据库发送请求 跟后端商量添加商品的接口
class AddShop{
    constructor(){
        this.shopName = document.querySelector("#shopName");
        this.shopPrice = document.querySelector("#shopPrice");
        this.shopNum = document.querySelector("#shopNum");
        this.addBtn = document.querySelector("#btn-add-shop");
        this.init();
    }

    init(){
        //给按钮绑事件，获取以上三个input中的值  
        this.addBtn.onclick = () => {
            let name = this.shopName.value,
                price = this.shopPrice.value,
                num = this.shopNum.value;
            //验证表单是否为空
            if(name === "" || price === "" || num === ""){
                //提示不能为空
                alert("输入不能为空");
                //阻断程序运行
                return;
            }
            //发送后端请求
            tools.ajaxGetPromise("api/v1/add.php", {name, price, num}).then(jsons => {
                if(jsons.res_code === 1){
                    //清楚input的值
                    this.shopName.value = this.shopPrice.value = this.shopNum.value === "";
                    alert(jsons.res_message);
                    //让模态框隐藏
                    $('#addModal').modal('hide');
                    //重新渲染表格
                    getShop.init();
                }
            });
        }
        
    }
}
new AddShop();