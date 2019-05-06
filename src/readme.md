<h1>某东商品管理系统</h1>

<h3>系统功能</h3>

* 登录
* 注册
* 商品展示
* 商品修改
* 商品删除
* 商品录入

<h3>使用的技术</h3>

* HTML5
* CSS3
* javascript
* ajax
* bootstrap
* php
* mysql

<h3>接口文档</h3>
<h5>查询所有数据</h5>

* url: api/v1/select.php
* method: get
* query: {pageIndex,count}
* data: {
    res_code: 1,//1代表成功，0代表失败
    res_message: "添加成功" || "网络错误，添加失败，请重试",
    res_body: {
        data: [
            {id,name,price,num},
            {id,name,price,num}
        ]
    }
}

<h5>添加商品接口</h5>
* url: api/v1/add.php
* method: get
* query: {name,price,num}
* data: {
    res_code: 1,//1代表成功，0代表失败
    res_message: "添加成功" || "网络错误，添加失败，请重试",
    res_body: {id,name,price,num}
}

<h5>删除商品接口</h5>
* url: api/v1/delete.php
* method: get
* query: {id}
* data: {
    res_code:1,//1代表成功，0代表失败
    res_message: "删除成功" || "网络错误，删除失败，请重试",
}

<h5>编辑商品确认接口</h5>
* url: api/v1/ok.php
* method: get
* query: {id,price,num}
* data: {
    res_code:1,//1代表成功，0代表失败
    res_message: "更新成功" || "网络错误，更新失败，请重试",
}

<h5>注册</h5>
* url: api/v1/register.php
* method: post
* query: {username,password}
* data: {
    res_code:1,//1代表成功，0代表失败
    res_message: "注册成功" || "网络错误，注册失败，请重试",
}

