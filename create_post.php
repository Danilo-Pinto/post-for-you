<?php
include('./settings/database.php');
include('./settings/erroMsg.php');

$target_file = './images/'.basename($_FILES['image']['name']);
$type_of_img = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
$check_img = getimagesize($_FILES['image']['tmp_name']);

$title = mysqli_real_escape_string($mysqli, $_POST['title']);
$token = apache_request_headers()['Authorization'];


if($check_img){

    $array_types = array("jpg","jpeg","png","gif");

    if(in_array($type_of_img, $array_types)){

        if(move_uploaded_file($_FILES['image']['tmp_name'], $target_file)){
            $data = 'http://'.$_SERVER['HTTP_HOST'].substr($target_file, 1);
            $user = mysqli_fetch_assoc(mysqli_query($mysqli, "SELECT username FROM login WHERE token='$token'"))['username'];

            $upload = mysqli_query($mysqli, "INSERT INTO posts (photo, title, author) VALUES('$data','$title','$user')");

            if($upload){
                header("HTTP/1.1 200 OK");
            }else{
                erroMsg("Algo deu errado!");
            }
            
        }else{
            erroMsg("Algo deu errado!");
        }
    }else{
        erroMsg("Tipo de arquivo inválido");
    }

}else{
    erroMsg("Arquivo inválido");
}

?>