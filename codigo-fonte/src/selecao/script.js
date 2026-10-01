/* ================= SOM ================= */
let somAtivado = localStorage.getItem("somAtivado");

if (somAtivado === null) {
    somAtivado = true;
} else {
    somAtivado = somAtivado === "true";
}

// se nunca tiver salvo nada
if (localStorage.getItem("somAtivado") === null) {
    somAtivado = true;
}

function tocarSom() {
    if (somAtivado) {
        const som = new Audio("sons/click_button_shorter.mp3");
        som.play();
        return som;
    }
}

/* ================= TOGGLE SOM ================= */

function toggleSom() {
    somAtivado = !somAtivado; //inverte o valor, serve como interruptor
    localStorage.setItem("somAtivado", somAtivado); //salva o valor da var somAtivado
    const toggle = document.querySelector(".som-toggle"); //procura um elemento HTML que tenha a classe'som-toogle'
    if (somAtivado) {
        toggle.classList.remove("desligado");
    } else {
        toggle.classList.add("desligado");
    }//adiciona OU remove a classe 'desligado' --> muda o css do botão
}

/* ================= MENU CONFIG ================= */

function abrirConfig() {
    const menu = document.getElementById("menu-config");

    if (menu.style.display === "block") {
        menu.style.display = "none";
    }
    else {
        menu.style.display = "block";
    }
}

/* ================= SITE ================= */

document.addEventListener("DOMContentLoaded", () => {
    /*MANTÉM O ESTADO DO BOTÃO DE SOM ATUALIZADO */
    window.onload = function () {
        const toggle = document.querySelector(".som-toggle");

        if (!somAtivado) {
            toggle.classList.add("desligado");
        }
    };


    /* CARREGA MENU GLOBAL */
    fetch("config-menu-component.html")
        .then(resposta => resposta.text())
        .then(dados => {
            document.body.insertAdjacentHTML("beforeend", dados);
        });

    /* BOTÕES CLICÁVEIS */
    const clicaveis = document.querySelectorAll(".clicavel");

    clicaveis.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();

            /* ANIMAÇÃO */
            item.style.transform = "scale(0.95)";
            setTimeout(() => {
                item.style.transform = "";
            }, 100);

            /* DESTINO */
            const destino = item.dataset.link;

            /* SOM */
            const som = tocarSom();

            /* NAVEGAÇÃO */
            if (destino) {
                if (somAtivado && som) {
                    som.onended = () => {
                        window.location.href = destino;
                    };
                }
                else {
                    window.location.href = destino;
                }
            }
        });
    });
});