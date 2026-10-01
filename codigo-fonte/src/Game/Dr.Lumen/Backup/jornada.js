// PERSONALIZAÇÃO
const nome = localStorage.getItem("nomeUsuario");

if (nome) {
  document.getElementById("mensagem").innerText =
    `Vamos lá, ${nome}! Escolha sua aventura 😊`;
}

// HOVER SOUND
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    const audio = document.getElementById("hoverSound");
    audio.currentTime = 0;
    audio.play();
  });
});

// CLICK + LOADING
function irPara(tipo) {

  document.getElementById("clickSound").play();

  document.getElementById("container").innerHTML = `
    <h1>Carregando...</h1>
    <p>Preparando sua aventura 🚀</p>
  `;

  setTimeout(() => {
    window.location.href = tipo === "ambiente"
      ? "jornada-ambiente.html"
      : "jornada-exame.html";
  }, 800);
}

// HEADER
function voltar() {
  window.location.href = "exame-select.html";
}

function abrirConquistas() {
  const conquistas = localStorage.getItem("conquistas") || 0;
  alert(`Você tem ${conquistas} conquistas! 🏆`);
}

function abrirDuvidas() {
  alert("Tudo bem ter dúvidas! Vamos te ajudar 😊");
}

function chamarResponsavel() {
  alert("Chamando um responsável 👨‍👩‍👧");
}