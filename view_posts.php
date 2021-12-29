<?php
include('./settings/database.php');


$result = mysqli_query($mysqli,"SELECT * FROM posts ORDER BY id DESC");

$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}

echo json_encode($rows);

?>