<?php
include('./settings/database.php');
include('./settings/erroMsg.php');

$user = mysqli_real_escape_string($mysqli, $_POST['user']);
$pass = mysqli_real_escape_string($mysqli, $_POST['pass']);

if($user == "" || $pass == ""){
    header("HTTP/1.1  400");
}else{
    
    $login = mysqli_query($mysqli, "SELECT username,email,token FROM login WHERE username='$user' AND password=md5('$pass')");
    
    if($login){

        $row = mysqli_fetch_assoc($login);

        if(is_array($row) && !empty($row)){
            echo json_encode($row);
        }else{
            erroMsg("Usuário ou senha incorreto!");
        }

    }else{
        header("HTTP/1.1  400");
    }
    
}

?>