<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "auth_demo";


$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Kết nối thất bại: " . $conn->connect_error);
}

if (isset($_GET['user_id'])) {
    $user_id = $_GET['user_id'];
    $sql = "SELECT avatar FROM users WHERE id = $user_id";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $avatar_data = $row['avatar'];
        header("Content-type: image/jpeg"); 
        echo $avatar_data;
    } else {
        header("Content-type: image/png");
        readfile("images/default.png");
    }
}

$conn->close();
?>