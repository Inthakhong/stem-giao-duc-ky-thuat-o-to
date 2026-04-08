<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');


$admin_email = 'dacthanh0605@gmail.com'; 


$db_host = 'localhost';
$db_name = 'stem-oto'; 
$db_user = 'root'; 
$db_pass = '';    

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';


if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($message)) {
    http_response_code(400); 
    echo json_encode(['success' => false, 'message' => 'Lỗi: Dữ liệu không hợp lệ. Vui lòng điền đủ thông tin.']);
    exit;
}

$is_db_success = false;
$error_message = '';

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("INSERT INTO contacts (name, email, message, created_at) VALUES (?, ?, ?, NOW())");
    $stmt->execute([$name, $email, $message]);
    $is_db_success = true;

} catch (PDOException $e) {
    $error_message = "Lỗi Database: Không thể lưu tin nhắn.";
    error_log("Database Error: " . $e->getMessage()); 
}


$mail_body = "Yêu cầu liên hệ mới:\n\n"
           . "Họ tên: " . $name . "\n"
           . "Email: " . $email . "\n"
           . "Nội dung: " . $message;

$headers = "From: webmaster@localhost\r\n" . 
           "Reply-To: " . $email . "\r\n";
           

$is_mail_success = @mail($admin_email, 'Yêu cầu liên hệ mới từ Website STEM', $mail_body, $headers);


if ($is_db_success) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Chúng tôi đã nhận được thông tin của bạn!']);
} else {
     http_response_code(500); 
     echo json_encode(['success' => false, 'message' => 'Lỗi máy chủ nội bộ. Vui lòng thử lại sau.']);
}
?>