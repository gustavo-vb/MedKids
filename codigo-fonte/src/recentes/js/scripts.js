const somClick = new Audio();
const somHoover = new Audio();
somClick.src = "sons/click_button_shorter.mp3";
somHoover.src = "sons/hoover.wav";
somClick.load();
somHoover.load();

function renderizarRecentes(dados) {
  const lista = document.getElementById("recentes-main");

  lista.innerHTML = "";

  dados.forEach(item => {
    const botao = document.createElement("button");
    botao.classList.add("item");
    botao.addEventListener("mouseenter", btnHoover);

    botao.textContent = item.nome;

    //caso o botao seja clicado, fazer ISSO
    botao.onclick = () => {
    
        somClick.currentTime = 0;

        somClick.play();

        setTimeout(() => {
            console.log("Clicou em:", item.nome);  /*ISSO (Ir para a tela recente respectiva)*/
        }, 550);
    };

    lista.appendChild(botao);
  });
}

function irParaInicio() {
  somClick.currentTime = 0;
  somClick.play();
  setTimeout(() => {
    window.location.href = "paginaInicio.html"; //link para a página inicial é feito aqui.
  }, 550);
}

function btnHoover() {
  somHoover.currentTime = 0;
  somHoover.play().catch(() => {});
}