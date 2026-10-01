<?php
session_start();
header("Content-Type: application/json; charset=UTF-8");

if (!isset($_SESSION["usuario_id"])) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Usuário não autenticado."
    ]);
    exit;
}

echo json_encode([
    "status" => "ok",
    "id" => $_SESSION["usuario_id"],
    "nome" => $_SESSION["usuario_nome"] ?? "Usuário",
    "tipo" => $_SESSION["usuario_tipo"] ?? "",
    "responsavel_id" => $_SESSION["responsavel_id"] ?? null
]);
?>
