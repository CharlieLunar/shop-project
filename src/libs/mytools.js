var tools = {
    /*做cookie的存取、修改、删除
    只传key就是获取
    key value一起传就是存或者修改
    option 修改path和expires,expires值为-1即删除代码
    * @param key <string> cookie的属性名
    * @param [value] <string> cookie的值
    * @param [option] <object> {expires,path}
    * @return <string> 取cookie的时候就返回当前这条cookie的值
    */
    cookie : function (key,value,option){
        //判断是否存在value
        //若value === undefined,那么只获取
        if(value === undefined){
            //获取cookie
            var cookie = document.cookie;
            //var一个arr来接收通过"; "拆开后得到的值
            var arr = cookie.split("; ");
            //遍历arr的键和值,返回一个对象
            var obj = {};
            arr.forEach(function(item){
                //var一个subArr数组来接收通过"="拆开后得到的值
                var subArr = item.split("=");
                //subArr[0]作为obj的key;subArr[1]作为obj[subArr[0]]的值
                obj[subArr[0]] = decodeURIComponent(subArr[1]);
            })
            //输出得到的对象
           return obj[key];
        }else{//若value传过来了，即是要对cookie进行增删改操作
            //将传过来的key和value拼接成一个初始字符串
            //传过来的value是字符串，以防乱码，先将value转化为编码格式
            var str = key + "=" + encodeURIComponent(value);
            //判断是否传过来option{expires有效时间、path路径}
            if(option){
                //判断传过来的是路径还是有效期，拼接在初始字符串后面
                if(option.path) str += ";path="+option.path;
                if(option.expires){
                    //得到现在的日期
                    var date = new Date();
                    //计算有效期是什么时候
                    date.setDate(date.getDate()+option.expires);
                    str += ";expires="+date;
                }
            }
            //将str赋值给cookie，并输出cookie
            document.cookie = str;
        }
    },

    /* ajax get方法
     * @param url <string> 请求的地址
     * @param query <string> 请求携带的参数
     * @param callback <function> 数据交易成功以后调用的函数 回调函数
     * @param isJson <boolean> 是否是json格式的数据
    */

    // {"id":2,"name":"lisi"}
    // ?id=2&name=lisi

    // ajaxGet("01.php",{id:1},function(data){},true)
    ajaxGet : function(url,query,callback,isJson){
        //isJson没有传递的话默认为true
        isJson = isJson === undefined ? true : isJson;
        //1.new一个ajax核心对象
        var ajax = new XMLHttpRequest();
        //2.open打开连接 如果传过来了query，那么在url后面拼接
        if(query){
            url += "?";
            for(var key in query){
                url += key+"="+query[key]+"&";
            }
            url = url.slice(0,-1);
        }else{
            ajax.open("GET",url,true);
        }
        //3.send发送请求
        ajax.send(null);
        //4.监听状态
        ajax.onreadystatechange = function(){
            if(ajax.readyState === 4 && ajax.status === 200){
                //交易成功
                //根据isJson判断是否使用JSON.parse转换
                var res = isJson ? JSON.parse(ajax.responseText) : ajax.responseText
                callback && callback(res);
            }
        }
     
    },

    /* ajax方法
	 * @param method <string> "get"或者"post"
	 * @param  url <string> 请求的地址
	 * @param  query <object>  请求携带的参数
	 * @param  callback <function>  数据成功以后的回调函数
	 * @param  isJson <boolean>  是否是json格式的数据	
    */
    ajax : function(method,url,query,callback,isJson){
        isJson = isJson === undefined ? true : isJson;
        if(method.toUpperCase() === "GET"){
            this.ajaxGet(url,query,callback,isJson);
        }else if(method.toUpperCase() === "POST"){
            //1.new一个ajax核心对象
            var ajax = new XMLHttpRequest();
            //2.open打开连接
            ajax.open("POST",url,true);
            ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            //3.send发送请求 
            //若传过来了query，则拼接在字符串中
            var str = "";
            if(query){
                
                for(var key in query){
                    str += key+"="+query[key]+"&";
                }
                str = str.slice(0,-1);
               
            }
            ajax.send(str);
            //4.监听状态
            ajax.onreadystatechange = function(){
                if(ajax.readyState === 4){
                    if(ajax.status === 200){
                        var res = isJson ? JSON.parse(ajax.responseText) : ajax.responseText;
                        callback && callback(res);
                    }else{
                        alert("请求失败");
                    }
                }
            }
        }
    },

    /* 请求jsonp数据（跨域）
     * @param url <string> 请求的地址
     * @param query <object> 请求携带的参数
     * @param cb <string> 回调函数
     */
    ajaxJsonp : function(url,cb,query){
        //创建script标签
        var script = document.createElement("script");
        //首先拼接一个字符串形式的回调函数名
        url += "?cb="+cb;
        //判断是否传query
        if(query){
            //遍历 拼接
            for(var key in query){
                url += "&"+key+"="+query[key];
            }
        }
        //将拼接好的url赋值给script的src
        script.src = url;
        //将script标签添加至页面中
        document.body.appendChild(script);
        //请求数据后，script标签就没有作用了，删掉，防止页面出现多个script标签
        document.body.removeChild(script);
    },

    /* ajax方法
     * @param url <string> 请求的地址
     * @param query <object> 请求携带的参数
     * @param isJson <boolean> 是否为json格式的数据
    */
    ajaxGetPromise : function (url, query, isJson) {
        isJson = isJson === undefined ? true : isJson;
        // 如果有query再url后面拼接query
        if(query){
            url += "?";
            for(var key in query){
                url += key+"="+query[key]+"&";
            }
            url = url.slice(0, -1);
        }
        return new Promise((resolve, reject) => {
            let ajax = new XMLHttpRequest();
            ajax.open("GET", url, true);
            ajax.send(null);
            ajax.onreadystatechange = function () {
                if(ajax.readyState === 4){
                    if(ajax.status === 200){
                        // 数据成功返回了
                        resolve(isJson ? JSON.parse(ajax.responseText) : ajax.responseText);
                    }else{
                        reject();
                    }
                }
            }
        })
    }
   
        
}
