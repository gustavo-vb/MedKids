<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "medikids";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode([
        "status" => "erro",
        "mensagem" => "Erro na conexão: " . $conn->connect_error
    ]));
}

$conn->set_charset("utf8mb4");
?>
