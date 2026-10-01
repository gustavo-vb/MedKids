<?php
session_start();
header("Content-Type: application/json; charset=UTF-8");
include "conexao.php";

if (!isset($_SESSION["usuario_id"]) || ($_SESSION["usuario_tipo"] ?? "") !== "responsavel") {
    echo json_encode(["status" => "erro", "mensagem" => "Acesso negado."]);
    exit;
}

$id = intval($_POST["id"] ?? 0);
$nome = trim($_POST["nome"] ?? "");
$usuario = trim($_POST["usuario"] ?? "");
$senha = $_POST["senha"] ?? "";
$responsavelId = intval($_SESSION["usuario_id"]);

if ($id <= 0 || $nome === "" || $usuario === "") {
    echo json_encode(["status" => "erro", "mensagem" => "Dados inválidos."]);
    exit;
}

$verificar = $conn->prepare("SELECT id FROM usuarios WHERE usuario_crianca = ? AND id <> ? LIMIT 1");
$verificar->bind_param("si", $usuario, $id);
$verificar->execute();
$resultado = $verificar->get_result();

if ($resultado->num_rows > 0) {
    echo json_encode(["status" => "erro", "mensagem" => "Este usuário de criança já existe."]);
    exit;
}

if ($senha !== "") {
    if (strlen($senha) < 4) {
        echo json_encode(["status" => "erro", "mensagem" => "A nova senha precisa ter pelo menos 4 caracteres."]);
        exit;
    }

    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("UPDATE usuarios SET nome = ?, usuario_crianca = ?, senha = ? WHERE id = ? AND responsavel_id = ? AND tipo = 'crianca'");
    $stmt->bind_param("sssii", $nome, $usuario, $senhaHash, $id, $responsavelId);
} else {
    $stmt = $conn->prepare("UPDATE usuarios SET nome = ?, usuario_crianca = ? WHERE id = ? AND responsavel_id = ? AND tipo = 'crianca'");
    $stmt->bind_param("ssii", $nome, $usuario, $id, $responsavelId);
}

if ($stmt->execute()) {
    echo json_encode(["status" => "ok", "mensagem" => "Criança atualizada com sucesso."]);
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Erro ao atualizar criança."]);
}

$stmt->close();
$conn->close();
?>
