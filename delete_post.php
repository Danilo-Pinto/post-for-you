<?php
include('./settings/database.php');
include('./settings/erroMsg.php');

$id_post = mysqli_real_escape_string($mysqli, $_POST['id_post']);
$token = apache_request_headers()['Authorization'];

if($token == "" || $id_post == ""){
    header('HTTP/1.1 400');
}else{
    $user = mysqli_fetch_assoc(mysqli_query($mysqli, "SELECT username FROM login WHERE token='$token'"))['username'];
    
    $result = mysqli_query($mysqli,"DELETE FROM posts WHERE id = '$id_post' AND author = '$user'");

    if($result){
        header('HTTP/1.1 200 OK');
    }else{
        erroMsg("Algo deu errado!");
    }

}









?>