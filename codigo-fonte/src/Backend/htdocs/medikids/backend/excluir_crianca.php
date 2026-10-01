<?php
session_start();
header("Content-Type: application/json; charset=UTF-8");
include "conexao.php";

if (!isset($_SESSION["usuario_id"]) || ($_SESSION["usuario_tipo"] ?? "") !== "responsavel") {
    echo json_encode(["status" => "erro", "mensagem" => "Acesso negado."]);
    exit;
}

$id = intval($_POST["id"] ?? 0);
$responsavelId = intval($_SESSION["usuario_id"]);

if ($id <= 0) {
    echo json_encode(["status" => "erro", "mensagem" => "Criança inválida."]);
    exit;
}

$stmt = $conn->prepare("DELETE FROM usuarios WHERE id = ? AND responsavel_id = ? AND tipo = 'crianca'");
$stmt->bind_param("ii", $id, $responsavelId);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok", "mensagem" => "Criança excluída com sucesso."]);
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Erro ao excluir criança."]);
}

$stmt->close();
$conn->close();
?>
