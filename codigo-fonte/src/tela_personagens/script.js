/*AUTHOR: Maria Clara de Carvalho Sousa Bertozi*/
document.addEventListener("DOMContentLoaded", () => {

  const botoes = document.querySelectorAll(".char-btn");
  const btnConfirma = document.getElementById("btn-confirma");

  const somSelecao = new Audio("sons/click_button_shorter.mp3");
  const somConfirmar = new Audio("sons/click_button_shorter.mp3");

  let personagemSelecionado = null;

  // Esconde o botão confirmar ate o personagem ser selecionado
  btnConfirma.style.visibility = "hidden";

  //Seleçãoo dos cartões
  botoes.forEach((botao, index) => {
    botao.addEventListener("click", () => {
      
      botoes.forEach(b => b.classList.remove("selected")); // Remove seleção anterior
      botao.classList.add("selected");// Marca o clicado como selecionado
      personagemSelecionado = index;// Salva qual personagem foi escolhido (0 = menino, 1 = menina)
      btnConfirma.style.visibility = "visible";// Mostra o botão confirmar
    });
  });

  //Botão Confirmar
  btnConfirma.addEventListener("click", () => {
    if (personagemSelecionado === null) return;

    const nomes = ["menino", "menina"];
    localStorage.setItem("personagemEscolhido", nomes[personagemSelecionado]);

    //toca som
    somConfirmar.currentTime = 0;
    somConfirmar.play();

    //espera o som terminar antes de trocar de tela
    somConfirmar.onended = () => {
      window.location.href = "proxima-tela.html";
    };
  });

  botoes.forEach((botao, index) => {
    botao.addEventListener("click", () => {
    
      somSelecao.currentTime = 0;
      somSelecao.play();

      botoes.forEach(b => b.classList.remove("selected"));
      botao.classList.add("selected");

      personagemSelecionado = index;
      btnConfirma.style.visibility = "visible";
    });
  });
});

const somClick = new Audio("sons/click_button_shorter.mp3");

  function navegar(destino, btnConfirma) {
    btnConfirma.style.transform = "scale(0.95)";

    somClick.currentTime = 0;
    somClick.play();

    somClick.onended = () => {
      window.location.href = destino;
    };
  }