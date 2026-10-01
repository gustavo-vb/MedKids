<?php
session_start();
header("Content-Type: application/json; charset=UTF-8");
include "conexao.php";

if (!isset($_SESSION["usuario_id"])) {
    echo json_encode(["status" => "erro", "mensagem" => "Usuário não autenticado.", "dados" => []]);
    exit;
}

$usuario_id = $_SESSION["usuario_id"];

$sql = "SELECT titulo, tipo, link, data_acesso FROM acessos_recentes WHERE usuario_id = ? ORDER BY data_acesso DESC LIMIT 10";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$result = $stmt->get_result();

$dados = [];
while ($row = $result->fetch_assoc()) {
    $row["nome"] = $row["titulo"];
    $dados[] = $row;
}

echo json_encode(["status" => "ok", "dados" => $dados]);

$stmt->close();
$conn->close();
?>
