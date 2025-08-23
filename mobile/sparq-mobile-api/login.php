<?php

require_once 'bd.php';

$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (!$data) {
    echo json_encode(["status" => "error", "message" => "Nada recebido"]);
    exit;
}

$stmt = $conn->prepare("SELECT id_usuario, nome, email, parque, cargo, ativo, avatar, senha FROM usuario WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$ativo = $user['ativo'];

if ($user && $password === $user['senha'] && $ativo === 1) {
    echo json_encode([
        "status" => "success", 
        "message" => "sucessful login",
        "user" => [
            "id" => $user['id_usuario'],
            "nome" => $user['nome'],
            "email" => $user['email'],
            "parque" => $user['parque'],
            "cargo" => $user['cargo'],
            "ativo" => $user['ativo'],
            "avatar" => $user['avatar'],
        ]
    ]);
}elseif($ativo != 1){
    echo json_encode(["status" => "error", "message" => "Seu usuario não esta ativo"]);
}else {
    echo json_encode(["status" => "error", "message" => "Usuário ou senha invalido"]);
}
