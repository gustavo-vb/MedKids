<?php
session_start();
header("Content-Type: application/json; charset=UTF-8");
include "conexao.php";

if (!isset($_SESSION["usuario_id"]) || ($_SESSION["usuario_tipo"] ?? "") !== "responsavel") {
    echo json_encode(["status" => "erro", "mensagem" => "Acesso negado."]);
    exit;
}

$nome = trim($_POST["nome"] ?? "");
$usuario = trim($_POST["usuario"] ?? "");
$senha = $_POST["senha"] ?? "";
$responsavelId = intval($_SESSION["usuario_id"]);

if ($nome === "" || $usuario === "" || $senha === "") {
    echo json_encode(["status" => "erro", "mensagem" => "Preencha todos os campos."]);
    exit;
}

if (strlen($senha) < 4) {
    echo json_encode(["status" => "erro", "mensagem" => "A senha precisa ter pelo menos 4 caracteres."]);
    exit;
}

$verificar = $conn->prepare("SELECT id FROM usuarios WHERE usuario_crianca = ? LIMIT 1");
$verificar->bind_param("s", $usuario);
$verificar->execute();
$resultado = $verificar->get_result();

if ($resultado->num_rows > 0) {
    echo json_encode(["status" => "erro", "mensagem" => "Este usuário de criança já existe."]);
    exit;
}

$senhaHash = password_hash($senha, PASSWORD_DEFAULT);
$email = null;
$tipo = "crianca";

$stmt = $conn->prepare("INSERT INTO usuarios (nome, email, usuario_crianca, senha, tipo, responsavel_id) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssi", $nome, $email, $usuario, $senhaHash, $tipo, $responsavelId);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok", "mensagem" => "Criança cadastrada com sucesso."]);
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Erro ao cadastrar criança."]);
}

$stmt->close();
$conn->close();
?>
