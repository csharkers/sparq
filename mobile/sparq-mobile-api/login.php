<?php

require_once 'bd.php';

$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (!$data) {
    echo json_encode(["status" => "error", "message" => "Nada recebido"]);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM usuario WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user && $password === $user['senha']) {
    echo json_encode(["status" => "success", "message" => "sucessful login"]);
} else {
    echo json_encode(["status" => "error", "message" => "Usuário ou senha invalido"]);
}
