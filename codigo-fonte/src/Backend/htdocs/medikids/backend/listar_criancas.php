<?php
session_start();
header("Content-Type: application/json; charset=UTF-8");
include "conexao.php";

if (!isset($_SESSION["usuario_id"]) || ($_SESSION["usuario_tipo"] ?? "") !== "responsavel") {
    echo json_encode(["status" => "erro", "mensagem" => "Acesso negado."]);
    exit;
}

$responsavelId = intval($_SESSION["usuario_id"]);

$stmt = $conn->prepare("SELECT id, nome, usuario_crianca FROM usuarios WHERE tipo = 'crianca' AND responsavel_id = ? ORDER BY nome ASC");
$stmt->bind_param("i", $responsavelId);
$stmt->execute();
$resultado = $stmt->get_result();

$criancas = [];
while ($linha = $resultado->fetch_assoc()) {
    $criancas[] = $linha;
}

echo json_encode(["status" => "ok", "dados" => $criancas]);

$stmt->close();
$conn->close();
?>
