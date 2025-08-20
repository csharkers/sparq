<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");


$host = "localhost";
$user = "root";
$pass = "";
$db = "sparqbd";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
