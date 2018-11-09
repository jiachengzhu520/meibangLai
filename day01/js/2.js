//Step1: 仅遍历直接子节点
function getChildren1(parent){
  console.log(parent.nodeName);
  var children=parent.children;
  for(var i=0,len=children.length;i<len;i++){
    //Step2: 对每个直接子节点调用和父节点完全相同的操作
    arguments.callee(children[i]);
  }
}
function getChildren2(parent){
  //Step1: 创建迭代器对象
  var iterator=document.createNodeIterator(
    parent, NodeFilter.SHOW_ELEMENT, null, false
  );
  //Step2: 循环调用iterator.nextNode();
  do{
    var currNode=iterator.nextNode();
    if(currNode) console.log(currNode.nodeName);
    else break;
  }while(true);
}
getChildren2(document.body);
