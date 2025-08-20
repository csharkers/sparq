<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'bd.php';

if ($conn->connect_error) {
    echo json_encode(["status" => "erro", "mensagem" => "Falha na conexão com o banco"]);
} else {
    echo json_encode(["status" => "ok", "mensagem" => "Conexão com o banco estabelecida"]);
}
?>