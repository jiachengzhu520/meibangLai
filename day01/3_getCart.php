<?php
header("Content-Type:application/json");
require_once("init.php");
$uid=3;//将来从SESSION中来
$sql="SELECT iid,title,price,count FROM `xz_shoppingcart_item` inner join xz_laptop on product_id=lid where user_id=$uid";
$result=mysqli_query($conn,$sql);
echo json_encode(mysqli_fetch_all($result,1));