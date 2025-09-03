<?php

require_once 'bd.php';

$data = json_decode(file_get_contents('php://input'), true);

$sensorName = $data['sensorName'] ?? '';
$sensorType = $data['sensorType'] ?? '';
$latitude = $data['latitude'] ?? '';
$longitude = $data['longitude'] ?? '';
$parkId = $data['parkId'] ?? '';

if (!$sensorName || !$sensorType || !$latitude || !$longitude || !$parkId) {
    echo json_encode(["status" => "error", "message" => "Dados incompletos"]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO sensores (nome_sensor, tipo_sensor, latitude, longitude, id_parque) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("ssddi", $sensorName, $sensorType, $latitude, $longitude, $parkId);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Ponto registrado com sucesso"]);
} else {
    echo json_encode(["status" => "error", "message" => "Erro ao registrar ponto"]);
}