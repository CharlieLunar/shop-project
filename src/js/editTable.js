class EditTable {
    constructor(tbody){
        this.tbody = document.querySelector(tbody);
        this.bindEvents();
    }

    bindEvents(){
        let _this = this;
        this.tbody.onclick = function(e){
            //寻找事件源
            var target = e.target;
            //找到事件源对应的tr
            var tr = target.parentNode.parentNode;
            //从多个class中寻找想要的class
            //把类数组对象转为数组
            var classList = Array.from(target.classList);
            //若classname中存在名为btn-edit的class,则触发对应的编辑事件
            if(classList.includes("btn-edit")){
                _this.editBtnClick(tr);
            }else if(classList.includes("btn-ok")){
                _this.okBtnClick(tr);
            }else if(classList.includes("btn-cancel")){
                _this.cancelBtnClick(tr);
            }else if(classList.includes("btn-del")){
                _this.delBtnClick(tr);
            }
        }
    }

    editBtnClick(tr){
       
        //遍历对应tr下的所有span
        Array.from(tr.querySelectorAll("span")).forEach(function(span){
            span.nextElementSibling.value = span.innerHTML;
        });
        tr.classList.add("edit");
    }

    okBtnClick(tr){
        //发送数据库修改 
        let inputPrice = document.querySelector(".inputPrice"),
            inputNum = document.querySelector(".inputNum"),
            id = tr.getAttribute("data-id"),
            price = inputPrice.value,
            num = inputNum.value;
        tools.ajaxGetPromise("api/v1/ok.php",{id,price,num}).then(data => {
            if(data.res_code === 1){
                alert(data.res_message);
                inputPrice.previousElementSibling.innerHTML = inputPrice.value;
                inputNum.previousElementSibling.innerHTML = inputNum.value;
                tr.classList.remove("edit");
            }else{
                tr.classList.remove("edit");
                alert(data.res_message);
            }
        })
    }

    cancelBtnClick(tr){
        tr.classList.remove("edit");
    }

    delBtnClick(tr){
        //发送数据库删除
        if(confirm("确定删除吗？")){
            //请求后端做删除功能(根据id)
            let id = tr.getAttribute("data-id");
            tools.ajaxGetPromise("api/v1/delete.php",{id}).then(data => {
                if(data.res_code === 1){
                    alert(data.res_message);
                    getShop.init();
                }else{
                    alert(data.res_message);
                }
            })
        }
    }

}
new EditTable("#tbody");