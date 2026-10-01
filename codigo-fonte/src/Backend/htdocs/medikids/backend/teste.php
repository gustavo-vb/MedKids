<?php
include "conexao.php";

echo json_encode([
    "status" => "ok",
    "mensagem" => "Conexão funcionando!"
]);
?>