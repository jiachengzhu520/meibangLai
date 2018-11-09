(()=>{
function loadCart(){
ajax({//ajax请求3_getCart.php
  type:"get",url:"3_getCart.php",dataType:"json"
}).then(data=>{
  var html="",total=0;
  for(var p of data){
    html+=`<tr>
      <td>${p.title}</td>
      <td>¥${parseFloat(p.price).toFixed(2)}</td>
      <td>
        <button>-</button>
        <span>${p.count}</span>
        <button>+</button>
        <input type="hidden" value="${p.iid}"/>
      </td>
      <td>¥${(p.price*p.count).toFixed(2)}</td>
    </tr>`;
    total+=p.price*p.count;
  }
  //找到table
  var table=document.getElementById("data");
  //找table下的tbody,设置其内容为html
  table.querySelector("tbody").innerHTML=html;
  //查找tfoot中最后一个td,设置其内容为total
  table.querySelector("tfoot td:last-child")
       .innerHTML="¥"+total.toFixed(2);

  //Step1: 找触发事件的元素
  //找到tbody下所有button
  var btns=table.querySelectorAll("tbody button");
  //为每个按钮绑定事件
  for(var i=0;i<btns.length;i++){
    //Step2: 绑定事件处理函数
    btns[i].onclick=function(){//this->当前btn
      //Step3: 查找要修改的元素
      //Step4: 修改其内容
      //找到旁边的span,获取其内容转为整数,保存在n中
      var span=this.parentNode.children[1];
      var n=parseInt(span.innerHTML);
      //如果this的innerHTML为+,n就+1,否则就-1
      this.innerHTML=="+"?n++:n--;
      //找到按钮旁边的input的value，保存在iid中
      var iid=this.parentNode.children[3].value;
      //ajax请求updateCart.php,拼参数字符串:iid=iid&count=n,然后,重新loadCart()
      ajax({
        type:"post",
        url:"3_updateCart.php",
        data:`iid=${iid}&count=${n}`
      }).then(loadCart);
    }
  }
});
}
loadCart();
})();