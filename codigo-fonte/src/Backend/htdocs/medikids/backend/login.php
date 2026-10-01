<?php
session_start();
header("Content-Type: application/json; charset=UTF-8");
include "conexao.php";

$tipo = $_POST["tipo"] ?? "responsavel";
$senha = $_POST["senha"] ?? "";

if ($tipo !== "crianca" && $tipo !== "responsavel") {
    echo json_encode(["status" => "erro", "mensagem" => "Tipo de usuário inválido."]);
    exit;
}

if ($tipo === "crianca") {
    $usuario = trim($_POST["usuario"] ?? "");
    $sql = "SELECT id, nome, senha, tipo, responsavel_id FROM usuarios WHERE usuario_crianca = ? AND tipo = 'crianca' LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $usuario);
} else {
    $email = trim($_POST["email"] ?? "");
    $sql = "SELECT id, nome, senha, tipo, responsavel_id FROM usuarios WHERE email = ? AND tipo = 'responsavel' LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
}

$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $usuario = $result->fetch_assoc();

    if (password_verify($senha, $usuario["senha"])) {
        session_regenerate_id(true);
        $_SESSION["usuario_id"] = $usuario["id"];
        $_SESSION["usuario_nome"] = $usuario["nome"];
        $_SESSION["usuario_tipo"] = $usuario["tipo"];
        $_SESSION["responsavel_id"] = $usuario["responsavel_id"] ?? null;

        echo json_encode([
            "status" => "ok",
            "mensagem" => "Login realizado com sucesso.",
            "tipo" => $usuario["tipo"],
            "nome" => $usuario["nome"],
            "responsavel_id" => $usuario["responsavel_id"] ?? null
        ]);
        exit;
    }
}

echo json_encode(["status" => "erro", "mensagem" => "Usuário ou senha incorretos."]);

$stmt->close();
$conn->close();
?>
