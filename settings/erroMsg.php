<?php

function erroMsg($msg){
    header("HTTP/1.1  400");

    $error_code = array("error"=>$msg);
    echo json_encode($error_code);

}

?>