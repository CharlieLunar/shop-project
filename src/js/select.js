//发送一个ajax请求--得到所有的商品--渲染
class selectList{
    constructor(tbody){
        this.tbody = document.querySelector(tbody);
        this.pageIndex = 1;//默认处于第一页
        //count指的是一页的数量，不可修改
        Object.defineProperty(this,"count",{
            writable : false,
            value : 4
        });
        this.pageCount = 1;//默认总页数为1（临时赋值）
        this.init();
    }

    //发送AJAX请求
    init(){//使用工具中的promise方法
        let {pageIndex,count} = this;//解构赋值
        tools.ajaxGetPromise("api/v1/select.php",{pageIndex,count}).then(data => {
            //根据返回的状态码判断是否请求成功
            if(data.res_code === 1){
                //若请求成功，则调用render函数渲染表格 传参
                this.render(data.res_body.data);
                this.pageCount = data.res_body.pageCount;
                //根据总页数来渲染分页
                pagination.render(this);
            }else{
                //查询失败，返回失败信息
                alert(data.res_message);
            }
        });
    }

    //通过data渲染表格
    render(tablelist){
        //创建一个空的html
        let html = "";
        //遍历传过来的数据进行渲染
        tablelist.forEach((shop,index) => {
            html += `
            <tr data-id="${shop.id}">
                    <td>${(this.pageIndex-1)*this.count + index + 1}</td>
                    <td>${shop.name}</td>
                    <td>
                        <span>${shop.price}</span>
                        <input type="text" class="inputPrice">
                    </td>
                    <td>
                        <span>${shop.num}</span>
                        <input type="text" class="inputNum">
                    </td>
                    <td>
                        <button type="button" class="btn btn-success btn-xs btn-edit">编辑</button>
                        <button type="button" class="btn btn-info btn-xs btn-ok">确定</button>
                        <button type="button" class="btn btn-warning btn-xs btn-cancel">取消</button>
                        <button type="button" class="btn btn-danger btn-xs btn-del">删除</button>
                    </td>
                </tr>`;
        })
        //遍历完成，将html添加至页面 注意写法
        this.tbody.innerHTML = html;
    }


}
let getShop = new selectList("#tbody");