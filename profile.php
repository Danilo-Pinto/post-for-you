<?php
include('./settings/database.php');

$token = apache_request_headers()['Authorization'];
$user = mysqli_fetch_assoc(mysqli_query($mysqli, "SELECT username FROM login WHERE token='$token'"))['username'];

$result = mysqli_query($mysqli,"SELECT * FROM posts WHERE author = '$user' ORDER BY id DESC ");

$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}

echo json_encode($rows);


?>