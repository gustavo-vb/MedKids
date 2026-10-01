<?php
session_start();
header("Content-Type: application/json; charset=UTF-8");
include "conexao.php";

$nome = trim($_POST["nome"] ?? "");
$email = trim($_POST["email"] ?? "");
$senha = $_POST["senha"] ?? "";
$confirmar = $_POST["confirmar"] ?? "";

if ($nome === "" || $email === "" || $senha === "" || $confirmar === "") {
    echo json_encode(["status" => "erro", "mensagem" => "Preencha todos os campos."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "erro", "mensagem" => "E-mail inválido."]);
    exit;
}

if ($senha !== $confirmar) {
    echo json_encode(["status" => "erro", "mensagem" => "As senhas não coincidem."]);
    exit;
}

$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

$sql = "INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, 'responsavel')";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $nome, $email, $senhaHash);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok", "mensagem" => "Cadastro realizado com sucesso!"]);
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Erro ao cadastrar. Talvez o e-mail já exista."]);
}

$stmt->close();
$conn->close();
?>
