<?php

  // 1. 接受前端发来的用户名和密码
  $account = $_POST['account'];
  $password = $_POST['password'];

  // 2. 去数据库查询
  $sql = "SELECT * FROM `users` WHERE `account`='$account' AND `password`='$password'";
  $link = mysqli_connect('localhost', 'root', 'root', 'test2006');
  $res = mysqli_query($link, $sql);
  $data = mysqli_fetch_all($res, MYSQLI_ASSOC);
  mysqli_close($link);
  /*
    $data = array(
      [0] => array( "username" => "", "nickname" => "asdasd" )
    )
  */

  // 3. 根据查询结果给前端返回
  if (count($data)) {
    $arr = array(
      "message" => "登录成功",
      "code" => 1,
      // 如果登录成功, 把用户的昵称给到前端
      "nickname" => $data[0]['nickname']
    );
  } else {
    $arr = array(
      "message" => "登录失败",
      "code" => 0
    );
  };

  $jsonstr = json_encode($arr);
  echo $jsonstr;

?>
