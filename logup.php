<?php
include('./settings/database.php');
include('./settings/erroMsg.php');

$user = $_POST['user'];
$email = $_POST['email'];
$pass = $_POST['pass'];

if($user == "" || $pass == "" || $email == ""){
    header("HTTP/1.1  400");
}else{

    $isAccount = mysqli_query($mysqli,"SELECT username,email FROM login WHERE username = '$user' OR email = '$email'");

    if(mysqli_num_rows($isAccount) != 0){
        
        erroMsg("Email ou Usuário já cadastrada !");

    }else{
        $isCreated = mysqli_query($mysqli, "INSERT INTO login(email, username, password, token) VALUES('$email', '$user', md5('$pass'), md5('$user'))");

        if($isCreated){
            header("HTTP/1.1  200 OK");
            
            $token = mysqli_fetch_assoc(mysqli_query($mysqli, "SELECT token FROM login WHERE username='$user'"))['token'];

            $return  = array("token"=>$token,"user"=>$user);
            echo json_encode($return);
        
        }else{
            header("HTTP/1.1  400");
        }

    }
}

?>