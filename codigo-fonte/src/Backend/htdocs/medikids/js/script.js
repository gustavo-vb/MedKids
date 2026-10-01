/* Arquivo centralizado para todas as páginas */

/* ================= SOM GLOBAL ================= */
let somAtivado = localStorage.getItem("somAtivado");
somAtivado = somAtivado === null ? true : somAtivado === "true";

function criarAudio(caminho) {
  try {
    const audio = new Audio(caminho);
    audio.preload = "auto";
    return audio;
  } catch (e) {
    return null;
  }
}

const somClickGlobal = criarAudio("sons/click_button_shorter.mp3");
const somHoverGlobal = criarAudio("sons/hoover.wav");

function tocarSom() {
  if (!somAtivado || !somClickGlobal) return null;
  try {
    somClickGlobal.currentTime = 0;
    somClickGlobal.play().catch(() => {});
    return somClickGlobal;
  } catch (e) {
    return null;
  }
}

function playClick() {
  tocarSom();
}

function btnHoover() {
  if (!somAtivado || !somHoverGlobal) return;
  try {
    somHoverGlobal.currentTime = 0;
    somHoverGlobal.play().catch(() => {});
  } catch (e) {}
}

function toggleSom() {
  somAtivado = !somAtivado;
  localStorage.setItem("somAtivado", somAtivado);
  atualizarToggleSom();
}

function atualizarToggleSom() {
  const toggle = document.querySelector(".som-toggle");
  const status = document.getElementById("status-som");

  if (toggle) {
    toggle.classList.toggle("desligado", !somAtivado);
  }

  if (status) {
    status.textContent = somAtivado ? "Sons ativados" : "Sons desativados";
  }
}


/* ================= PROTEÇÃO DE SESSÃO ================= */
function paginaAtual() {
  const nome = window.location.pathname.split("/").pop() || "login.html";
  return nome.toLowerCase();
}

function destinoPorTipo(tipo) {
  return tipo === "responsavel" ? "perfil-responsavel.html" : "selecao.html";
}

function irParaLogin() {
  if (paginaAtual() !== "login.html") {
    window.location.replace("login.html");
  }
}

function configurarHeaderPorUsuario(sessao) {
  const linkInicio = document.querySelector('.topo .navegacao [data-link="selecao.html"], .topo .navegacao [data-link="perfil-responsavel.html"]');
  if (linkInicio && sessao && sessao.tipo) {
    linkInicio.dataset.link = destinoPorTipo(sessao.tipo);
  }
}

function verificarSessaoAtual() {
  return fetch("backend/verificar_sessao.php", { cache: "no-store" })
    .then(res => res.json())
    .catch(() => ({ status: "erro", mensagem: "Não foi possível verificar a sessão." }));
}

async function protegerPaginaAtual() {
  const body = document.body;
  const ehLogin = body.classList.contains("login-page") || paginaAtual() === "login.html";
  const ehProtegida = body.classList.contains("protected-page");

  if (!ehLogin && !ehProtegida) {
    return { permitido: true, sessao: null };
  }

  const sessao = await verificarSessaoAtual();
  const autenticado = sessao.status === "ok";

  if (ehLogin) {
    if (autenticado) {
      window.location.replace(destinoPorTipo(sessao.tipo));
      return { permitido: false, sessao };
    }
    return { permitido: true, sessao: null };
  }

  if (!autenticado) {
    irParaLogin();
    return { permitido: false, sessao: null };
  }

  if (body.classList.contains("responsavel-page") && sessao.tipo !== "responsavel") {
    window.location.replace(destinoPorTipo(sessao.tipo));
    return { permitido: false, sessao };
  }

  if (body.classList.contains("child-page") && sessao.tipo !== "crianca") {
    window.location.replace(destinoPorTipo(sessao.tipo));
    return { permitido: false, sessao };
  }

  configurarHeaderPorUsuario(sessao);
  localStorage.setItem("nomeUsuario", sessao.nome || "Usuário");

  return { permitido: true, sessao };
}

/* ================= MENU CONFIG ================= */
function abrirConfig() {
  const menu = document.getElementById("menu-config");
  if (!menu) return;
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function inserirMenuConfig() {
  if (document.getElementById("menu-config")) return;

  document.body.insertAdjacentHTML("beforeend", `
    <div id="menu-config" class="menu-config">
      <h5>CONFIGURAÇÕES</h5>
      <p id="status-som">Sons ativados</p>
      <div class="som-toggle clicavel" onclick="toggleSom()">
        <div class="toggle-bola"></div>
      </div>
      <p>Use este botão para deixar a interface sem sons.</p>
      <p>Tema</p>
      <p>Idioma</p>
    </div>
  `);

  atualizarToggleSom();
}

/* ================= NAVEGAÇÃO GLOBAL ================= */
function configurarClicaveis() {
  document.querySelectorAll(".clicavel").forEach(item => {
    if (item.dataset.listenerOk === "true") return;
    item.dataset.listenerOk = "true";

    item.addEventListener("click", (e) => {
      const destino = item.dataset.link;
      if (!destino) return;
      e.preventDefault();

      item.style.transform = "scale(0.95)";
      setTimeout(() => item.style.transform = "", 100);

      const som = tocarSom();
      if (somAtivado && som) {
        som.onended = () => window.location.href = destino;
        setTimeout(() => window.location.href = destino, 700);
      } else {
        window.location.href = destino;
      }
    });
  });
}

/* ================= LOGIN / CADASTRO ================= */
let mode = "kid";

function setMode(m) {
  mode = m;
  hideError();
  const isKid = m === "kid";

  const btnKid = document.getElementById("btnKid");
  const btnParent = document.getElementById("btnParent");
  const kidForm = document.getElementById("kidForm");
  const parentForm = document.getElementById("parentForm");
  const registerForm = document.getElementById("registerForm");

  if (!btnKid || !btnParent || !kidForm || !parentForm || !registerForm) return;

  btnKid.className = "toggle-btn " + (isKid ? "active-kid" : "");
  btnParent.className = "toggle-btn " + (!isKid ? "active-parent" : "");

  kidForm.style.display = isKid ? "block" : "none";
  parentForm.style.display = !isKid ? "block" : "none";
  registerForm.style.display = "none";

  const activeForm = document.getElementById(isKid ? "kidForm" : "parentForm");
  activeForm.classList.remove("slide-up");
  void activeForm.offsetWidth;
  activeForm.classList.add("slide-up");

  document.querySelectorAll(".form-input").forEach(i => {
    i.value = "";
    i.classList.remove("input-error");
  });
}

function showRegister() {
  hideError();
  const modeToggle = document.getElementById("modeToggle");
  const kidForm = document.getElementById("kidForm");
  const parentForm = document.getElementById("parentForm");
  const rf = document.getElementById("registerForm");
  if (!modeToggle || !kidForm || !parentForm || !rf) return;

  modeToggle.style.display = "none";
  kidForm.style.display = "none";
  parentForm.style.display = "none";
  rf.style.display = "block";
  rf.classList.remove("slide-up");
  void rf.offsetWidth;
  rf.classList.add("slide-up");

  document.querySelectorAll("#registerForm .form-input").forEach(i => {
    i.value = "";
    i.classList.remove("input-error");
  });
}

function hideRegister() {
  hideError();
  const modeToggle = document.getElementById("modeToggle");
  const registerForm = document.getElementById("registerForm");
  if (modeToggle) modeToggle.style.display = "grid";
  if (registerForm) registerForm.style.display = "none";
  setMode("parent");
}

function showError(msg) {
  const box = document.getElementById("errorBox");
  if (!box) return alert(msg);
  box.textContent = msg;
  box.style.display = "block";
  box.classList.remove("show");
  void box.offsetWidth;
  box.classList.add("show");
}

function hideError() {
  const box = document.getElementById("errorBox");
  if (!box) return;
  box.classList.remove("show");
  box.style.display = "none";
}

function togglePass(id, btn) {
  const el = document.getElementById(id);
  if (!el) return;
  const isHidden = el.type === "password";
  el.type = isHidden ? "text" : "password";
  const svg = btn ? btn.querySelector("svg") : null;
  if (!svg) return;
  svg.innerHTML = isHidden
    ? '<path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>'
    : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
}

function handleLogin(m) {
  playClick();
  hideError();

  const btn = document.getElementById(m === "kid" ? "kidSubmit" : "parentSubmit");

  if (m === "kid") {
    const u = document.getElementById("kidUser")?.value.trim();
    const p = document.getElementById("kidPass")?.value;
    if (!u) { document.getElementById("kidUser").classList.add("input-error"); showError("ESQUECEU O USUÁRIO!"); return; }
    if (!p) { document.getElementById("kidPass").classList.add("input-error"); showError("CADÊ A SENHA?"); return; }

    if (btn) btn.classList.add("loading");

    const dados = new FormData();
    dados.append("tipo", "crianca");
    dados.append("usuario", u);
    dados.append("senha", p);

    fetch("backend/login.php", { method: "POST", body: dados })
      .then(res => res.json())
      .then(data => {
        if (btn) btn.classList.remove("loading");
        if (data.status === "ok") window.location.href = "selecao.html";
        else showError(data.mensagem || "USUÁRIO OU SENHA ERRADOS!");
      })
      .catch(() => {
        if (btn) btn.classList.remove("loading");
        showError("Erro ao conectar com o servidor.");
      });
  } else {
    const e = document.getElementById("parentEmail")?.value.trim();
    const p = document.getElementById("parentPass")?.value;
    if (!e || !e.includes("@")) { document.getElementById("parentEmail").classList.add("input-error"); showError("E-MAIL INVÁLIDO!"); return; }
    if (!p) { document.getElementById("parentPass").classList.add("input-error"); showError("DIGITE SUA SENHA!"); return; }

    if (btn) btn.classList.add("loading");

    const dados = new FormData();
    dados.append("tipo", "responsavel");
    dados.append("email", e);
    dados.append("senha", p);

    fetch("backend/login.php", { method: "POST", body: dados })
      .then(res => res.json())
      .then(data => {
        if (btn) btn.classList.remove("loading");
        if (data.status === "ok") window.location.href = "perfil-responsavel.html";
        else showError(data.mensagem || "E-MAIL OU SENHA INCORRETOS!");
      })
      .catch(() => {
        if (btn) btn.classList.remove("loading");
        showError("Erro ao conectar com o servidor.");
      });
  }
}

function handleRegister() {
  playClick();
  hideError();

  const name = document.getElementById("regName")?.value.trim();
  const email = document.getElementById("regEmail")?.value.trim();
  const pass = document.getElementById("regPass")?.value;
  const pass2 = document.getElementById("regPass2")?.value;
  const btn = document.getElementById("regSubmit");

  ["regName", "regEmail", "regPass", "regPass2"].forEach(id => document.getElementById(id)?.classList.remove("input-error"));

  if (!name) { document.getElementById("regName").classList.add("input-error"); showError("INFORME SEU NOME!"); return; }
  if (!email || !email.includes("@")) { document.getElementById("regEmail").classList.add("input-error"); showError("E-MAIL INVALIDO!"); return; }
  if (!pass || pass.length < 4) { document.getElementById("regPass").classList.add("input-error"); showError("SENHA MUITO CURTA!"); return; }
  if (pass !== pass2) { document.getElementById("regPass").classList.add("input-error"); document.getElementById("regPass2").classList.add("input-error"); showError("SENHAS NAO COINCIDEM!"); return; }

  if (btn) btn.classList.add("loading");

  const dados = new FormData();
  dados.append("nome", name);
  dados.append("email", email);
  dados.append("senha", pass);
  dados.append("confirmar", pass2);

  fetch("backend/cadastro.php", { method: "POST", body: dados })
    .then(res => res.json())
    .then(data => {
      if (btn) btn.classList.remove("loading");
      if (data.status === "ok") {
        alert(data.mensagem || "Cadastro realizado com sucesso!");
        hideRegister();
      } else {
        showError(data.mensagem || "Erro ao cadastrar.");
      }
    })
    .catch(() => {
      if (btn) btn.classList.remove("loading");
      showError("Erro ao conectar com o servidor.");
    });
}

/* ================= RECENTES ================= */
function renderizarRecentes(dados) {
  const lista = document.getElementById("recentes-main");
  if (!lista) return;
  lista.innerHTML = "";

  dados.forEach(item => {
    const botao = document.createElement("button");
    botao.classList.add("item");
    botao.addEventListener("mouseenter", btnHoover);
    botao.textContent = item.nome || item.titulo || "Item recente";
    botao.onclick = () => {
      const som = tocarSom();
      const destino = item.link;
      if (destino && somAtivado && som) som.onended = () => window.location.href = destino;
      else if (destino) window.location.href = destino;
    };
    lista.appendChild(botao);
  });
}

function carregarRecentes() {
  const lista = document.getElementById("recentes-main");
  if (!lista) return;

  fetch("backend/buscar_recentes.php")
    .then(res => res.json())
    .then(data => {
      const itens = Array.isArray(data) ? data : (data.dados || []);
      if (!itens.length) {
        lista.innerHTML = '<p>Nenhum acesso recente encontrado.</p>';
        return;
      }
      renderizarRecentes(itens);
    })
    .catch(() => {
      lista.innerHTML = '<p id="erroRecentes"><u>Não foi possível carregar os recentes agora.</u></p>';
    });
}

function irParaInicio() {
  const som = tocarSom();
  if (somAtivado && som) som.onended = () => window.location.href = "selecao.html";
  else window.location.href = "selecao.html";
}

/* ================= PERSONAGENS ================= */
function configurarPersonagens() {
  const botoes = document.querySelectorAll(".char-btn");
  const btnConfirma = document.getElementById("btn-confirma");
  if (!botoes.length || !btnConfirma) return;

  let personagemSelecionado = null;
  btnConfirma.style.visibility = "hidden";

  botoes.forEach((botao, index) => {
    botao.addEventListener("click", () => {
      tocarSom();
      botoes.forEach(b => b.classList.remove("selected"));
      botao.classList.add("selected");
      personagemSelecionado = index;
      btnConfirma.style.visibility = "visible";
    });
  });

  btnConfirma.addEventListener("click", () => {
    if (personagemSelecionado === null) return;
    const nomes = ["menino", "menina"];
    localStorage.setItem("personagemEscolhido", nomes[personagemSelecionado]);
    const som = tocarSom();
    if (somAtivado && som) som.onended = () => window.location.href = "tela_de_escolha.html";
    else window.location.href = "tela_de_escolha.html";
  });
}



/* ================= PERFIL DO RESPONSÁVEL ================= */
function carregarPerfilResponsavel(sessao = null) {
  const lista = document.getElementById("listaCriancas");
  const nomeResponsavel = document.getElementById("nomeResponsavel");

  if (!lista && !nomeResponsavel) return;

  const aplicarDados = (data) => {
    if (!data || data.status !== "ok" || data.tipo !== "responsavel") {
      window.location.replace("login.html");
      return;
    }

    if (nomeResponsavel) {
      nomeResponsavel.textContent = `Olá, ${data.nome}!`;
    }

    listarCriancas();
  };

  if (sessao) {
    aplicarDados(sessao);
    return;
  }

  verificarSessaoAtual()
    .then(aplicarDados)
    .catch(() => {
      if (lista) lista.innerHTML = "<p>Não foi possível verificar a sessão.</p>";
    });
}

function limparFormularioCrianca() {
  ["criancaNome", "criancaUsuario", "criancaSenha"].forEach(id => {
    const campo = document.getElementById(id);
    if (campo) campo.value = "";
  });
}

function mostrarMensagemCrianca(texto, erro = false) {
  const msg = document.getElementById("mensagemCrianca");
  if (!msg) return;
  msg.textContent = texto;
  msg.classList.toggle("erro", erro);
}

function cadastrarCrianca() {
  playClick();

  const nome = document.getElementById("criancaNome")?.value.trim();
  const usuario = document.getElementById("criancaUsuario")?.value.trim();
  const senha = document.getElementById("criancaSenha")?.value;

  if (!nome || !usuario || !senha) {
    mostrarMensagemCrianca("Preencha todos os campos.", true);
    return;
  }

  const dados = new FormData();
  dados.append("nome", nome);
  dados.append("usuario", usuario);
  dados.append("senha", senha);

  fetch("backend/cadastrar_crianca.php", { method: "POST", body: dados })
    .then(res => res.json())
    .then(data => {
      mostrarMensagemCrianca(data.mensagem || "Operação concluída.", data.status !== "ok");
      if (data.status === "ok") {
        limparFormularioCrianca();
        listarCriancas();
      }
    })
    .catch(() => mostrarMensagemCrianca("Erro ao conectar com o servidor.", true));
}

function listarCriancas() {
  const lista = document.getElementById("listaCriancas");
  if (!lista) return;

  lista.innerHTML = "<p>Carregando...</p>";

  fetch("backend/listar_criancas.php")
    .then(res => res.json())
    .then(data => {
      if (data.status !== "ok") {
        lista.innerHTML = `<p>${data.mensagem || "Erro ao carregar crianças."}</p>`;
        return;
      }

      const criancas = data.dados || [];

      if (!criancas.length) {
        lista.innerHTML = "<p>Nenhuma criança cadastrada ainda.</p>";
        return;
      }

      lista.innerHTML = "";

      criancas.forEach(crianca => {
        const card = document.createElement("div");
        card.className = "crianca-card";
        card.innerHTML = `
          <div>
            <strong>${crianca.nome}</strong>
            <span>Usuário: ${crianca.usuario_crianca}</span>
          </div>
          <div class="crianca-acoes">
            <button onclick="editarCrianca(${crianca.id}, '${escapeHtml(crianca.nome)}', '${escapeHtml(crianca.usuario_crianca)}')">Editar</button>
            <button onclick="excluirCrianca(${crianca.id})">Excluir</button>
          </div>
        `;
        lista.appendChild(card);
      });
    })
    .catch(() => {
      lista.innerHTML = "<p>Erro ao conectar com o servidor.</p>";
    });
}

function editarCrianca(id, nomeAtual, usuarioAtual) {
  const novoNome = prompt("Nome da criança:", nomeAtual);
  if (novoNome === null) return;

  const novoUsuario = prompt("Usuário da criança:", usuarioAtual);
  if (novoUsuario === null) return;

  const novaSenha = prompt("Nova senha. Deixe vazio para manter a senha atual:", "");
  if (novaSenha === null) return;

  const dados = new FormData();
  dados.append("id", id);
  dados.append("nome", novoNome.trim());
  dados.append("usuario", novoUsuario.trim());
  dados.append("senha", novaSenha);

  fetch("backend/editar_crianca.php", { method: "POST", body: dados })
    .then(res => res.json())
    .then(data => {
      mostrarMensagemCrianca(data.mensagem || "Operação concluída.", data.status !== "ok");
      if (data.status === "ok") listarCriancas();
    })
    .catch(() => mostrarMensagemCrianca("Erro ao conectar com o servidor.", true));
}

function excluirCrianca(id) {
  if (!confirm("Deseja excluir esta criança?")) return;

  const dados = new FormData();
  dados.append("id", id);

  fetch("backend/excluir_crianca.php", { method: "POST", body: dados })
    .then(res => res.json())
    .then(data => {
      mostrarMensagemCrianca(data.mensagem || "Operação concluída.", data.status !== "ok");
      if (data.status === "ok") listarCriancas();
    })
    .catch(() => mostrarMensagemCrianca("Erro ao conectar com o servidor.", true));
}

function logout() {
  fetch("backend/logout.php", { cache: "no-store" })
    .finally(() => {
      localStorage.removeItem("nomeUsuario");
      window.location.replace("login.html");
    });
}

function escapeHtml(texto) {
  return String(texto || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* ================= TELA DE ESCOLHA / JORNADA ================= */
function irPara(tipo) {
  tocarSom();
  const container = document.getElementById("container");
  if (container) {
    container.innerHTML = `<h1>Carregando...</h1><p>Preparando sua aventura 🚀</p>`;
  }

  setTimeout(() => {
    window.location.href = tipo === "ambiente" ? "selecao.html" : "selecao.html";
  }, 500);
}

function voltar() {
  window.location.href = "selecao.html";
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

/* ================= CONCLUSÃO ================= */
function nextStep() {
  window.location.href = "selecao.html";
}

function goMenu() {
  window.location.href = "selecao.html";
}

function configurarConclusao() {
  const pbar = document.getElementById("pbar");
  if (pbar) setTimeout(() => pbar.classList.add("animated"), 400);

  const wrap = document.getElementById("confetti");
  if (!wrap) return;

  const colors = ["#f0b800", "#5bbfbf", "#cc3333", "#4caf50", "#3a7abf", "#ffffff"];
  for (let i = 0; i < 40; i++) {
    const p = document.createElement("div");
    p.className = "confetti-particle";
    p.style.left = Math.random() * 100 + "vw";
    p.style.top = "-20px";
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDuration = (1.5 + Math.random() * 2) + "s";
    p.style.animationDelay = (Math.random() * 1.5) + "s";
    p.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
    wrap.appendChild(p);
  }
}

/* ================= INICIALIZAÇÃO ================= */
document.addEventListener("DOMContentLoaded", async () => {
  const acesso = await protegerPaginaAtual();
  if (!acesso.permitido) return;

  inserirMenuConfig();
  configurarClicaveis();
  atualizarToggleSom();
  carregarRecentes();
  configurarPersonagens();
  configurarConclusao();
  carregarPerfilResponsavel(acesso.sessao);

  document.querySelectorAll(".toggle-btn, .btn-submit, .eye-btn, .button, .item").forEach(el => {
    el.addEventListener("mouseenter", btnHoover);
  });

  const nome = acesso.sessao?.nome || localStorage.getItem("nomeUsuario");
  const mensagem = document.getElementById("mensagem");
  if (nome && mensagem) mensagem.innerText = `Vamos lá, ${nome}! Escolha sua aventura 😊`;
});

document.addEventListener("keydown", e => {
  if (e.key !== "Enter") return;
  const registerForm = document.getElementById("registerForm");
  const hasLogin = document.getElementById("kidForm") || document.getElementById("parentForm");
  if (!hasLogin) return;
  if (registerForm && registerForm.style.display !== "none") handleRegister();
  else handleLogin(mode);
});
