//功能模块一：后台管理员登录
//1:获取登录按钮
//2:绑定点击事件
$("#btn").click(function(e){  //e 事件对象
  //阻止事件默认行为 btn==(a)(button) (submit)
  e.preventDefault();
  console.log(1);
  //3:获取用户输入用户名和密码
  var u = $("#uname").val();
  var p = $("#upwd").val();
  var z = $("#code").val();  //10:35--10:45
  //3.1 验证用户名和密码格式,如果用户输入的格式不正确
  //    禁止提交
  //3.2 验证码 用户名 字母或数字 3~8
  //          密码   数字      3~8
  //3.3:创建二个正则表达式 用户名密码
  var ureg = /^[a-z0-9]{3,8}$/i;
  var preg = /^[0-9]{3,8}$/;
  var zreg = /^[a-z0-9]{4}$/i;
  //3.4:验证
  if(!ureg.test(u)){
    alert("用户名格式不正确，请检查");
    return;                     //停止程序运行
  }
  if(!preg.test(p)){
    alert("密码格式不正确,请检查");
    return;                     //停止程序运行
  }
  if(!zreg.test(z)){
    alert("验证格式不正确,请检查");
    return;
  }
  console.log(2);
  console.log(u+"+"+p);
  //4:发送ajax请求并且获取返回数据
  $.ajax({
    type:"POST",
    url:"data/01_admin_login.php",
    data:{uname:u,upwd:p,yzm:z}, //参数:js->php 数据
    success:function(data){//返回数:php->js 结果
      console.log(data);   //成功接收到返回数据
      if(data.code>0){
        alert("登录成功");
        location.href = "product_list.html";
      }else{
        alert(data.msg);
      }
    },
    error:function(){      //出错:执行此方法
      alert("网络故障，请检查");
    }
  });
  //5:判断
  //6:成功跳转 product_list.html
  //7:失败    提示:"用户名或密码有误"
});

//功能模块二：点击验证码图片切换到下一张图片
//1: 获取验证码图片
//2: 绑定点击事件
$("#yzm").click(function(){
//3: 修改当前图片src路径为 this.src = "data/00_yzm.php"
  this.src = "data/00_yzm.php";
});