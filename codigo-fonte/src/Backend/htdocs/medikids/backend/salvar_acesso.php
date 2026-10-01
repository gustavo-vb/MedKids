<?php
session_start();
header("Content-Type: application/json; charset=UTF-8");
include "conexao.php";

if (!isset($_SESSION["usuario_id"])) {
    echo json_encode(["status" => "erro", "mensagem" => "Usuário não autenticado."]);
    exit;
}

$usuario_id = $_SESSION["usuario_id"];
$titulo = trim($_POST["titulo"] ?? "");
$tipo = trim($_POST["tipo"] ?? "");
$link = trim($_POST["link"] ?? "");

if ($titulo === "" || $tipo === "" || $link === "") {
    echo json_encode(["status" => "erro", "mensagem" => "Dados incompletos."]);
    exit;
}

$sql = "INSERT INTO acessos_recentes (usuario_id, titulo, tipo, link) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("isss", $usuario_id, $titulo, $tipo, $link);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok", "mensagem" => "Acesso salvo."]);
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Erro ao salvar acesso."]);
}

$stmt->close();
$conn->close();
?>
