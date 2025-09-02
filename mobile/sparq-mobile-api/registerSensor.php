<?php

require_once 'bd.php';

$data = json_decode(file_get_contents('php://input'), true);

$sensorName = $data['sensorName'] ?? '';
$sensorType = $data['sensorType'] ?? '';
$latitude = $data['latitude'] ?? '';
$longitude = $data['longitude'] ?? '';
$id_parque = $data['nome'] ?? '';