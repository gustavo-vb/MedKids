/* ================================================================
   login.js  -  MediKids
   ================================================================ */

/* ── Sound ── */
let clickAudio = null;
(function () {
  try {
    clickAudio = new Audio('click_button_shorter.mp3');
    clickAudio.preload = 'auto';
  } catch (e) {}
})();

function playClick() {
  if (!clickAudio) return;
  try {
    clickAudio.currentTime = 0;
    clickAudio.play().catch(() => {});
  } catch (e) {}
}

/* Play sound on all interactive buttons */
document.querySelectorAll('.toggle-btn, .btn-submit, .eye-btn').forEach(el => {
  el.addEventListener('click', playClick);
});

/* ── Mode ── */
let mode = 'kid';

function setMode(m) {
  mode = m;
  hideError();
  const isKid = m === 'kid';

  document.getElementById('btnKid').className    = 'toggle-btn ' + (isKid  ? 'active-kid'    : '');
  document.getElementById('btnParent').className = 'toggle-btn ' + (!isKid ? 'active-parent' : '');

  document.getElementById('kidForm').style.display      = isKid  ? 'block' : 'none';
  document.getElementById('parentForm').style.display   = !isKid ? 'block' : 'none';
  document.getElementById('registerForm').style.display = 'none';

  const activeForm = document.getElementById(isKid ? 'kidForm' : 'parentForm');
  activeForm.classList.remove('slide-up');
  void activeForm.offsetWidth;
  activeForm.classList.add('slide-up');

  document.querySelectorAll('.form-input').forEach(i => {
    i.value = '';
    i.classList.remove('input-error');
  });
}

/* ── Register show / hide ── */
function showRegister() {
  hideError();
  document.getElementById('modeToggle').style.display   = 'none';
  document.getElementById('kidForm').style.display      = 'none';
  document.getElementById('parentForm').style.display   = 'none';

  const rf = document.getElementById('registerForm');
  rf.style.display = 'block';
  rf.classList.remove('slide-up');
  void rf.offsetWidth;
  rf.classList.add('slide-up');

  document.querySelectorAll('#registerForm .form-input').forEach(i => {
    i.value = '';
    i.classList.remove('input-error');
  });
}

function hideRegister() {
  hideError();
  document.getElementById('modeToggle').style.display   = 'grid';
  document.getElementById('registerForm').style.display = 'none';
  setMode('parent');
}

/* ── Error ── */
function showError(msg) {
  const box = document.getElementById('errorBox');
  box.textContent = '! ' + msg;
  box.style.display = 'block';
  box.classList.remove('show');
  void box.offsetWidth;
  box.classList.add('show');
}

function hideError() {
  const box = document.getElementById('errorBox');
  box.classList.remove('show');
  box.style.display = 'none';
}

/* ── Password toggle ── */
function togglePass(id, btn) {
  const el = document.getElementById(id);
  const isHidden = el.type === 'password';
  el.type = isHidden ? 'text' : 'password';
  const svg = btn.querySelector('svg');
  if (isHidden) {
    svg.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>';
  } else {
    svg.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
  }
}

/* ── Login ── */
function handleLogin(m) {
  playClick();
  hideError();
  const btn = document.getElementById(m === 'kid' ? 'kidSubmit' : 'parentSubmit');

  if (m === 'kid') {
    const u = document.getElementById('kidUser').value.trim();
    const p = document.getElementById('kidPass').value;

    if (!u) { document.getElementById('kidUser').classList.add('input-error'); showError('ESQUECEU O USUARIO!'); return; }
    if (!p) { document.getElementById('kidPass').classList.add('input-error'); showError('CADE A SENHA?'); return; }

    document.getElementById('kidUser').classList.remove('input-error');
    document.getElementById('kidPass').classList.remove('input-error');
    btn.classList.add('loading');

    setTimeout(() => {
      btn.classList.remove('loading');
      if (u === 'teste' && p === '1234') {
        showSuccess('kid');
      } else {
        showError('USUARIO OU SENHA ERRADOS!');
        document.getElementById('kidUser').classList.add('input-error');
        document.getElementById('kidPass').classList.add('input-error');
      }
    }, 1400);

  } else {
    const e = document.getElementById('parentEmail').value.trim();
    const p = document.getElementById('parentPass').value;

    if (!e || !e.includes('@')) { document.getElementById('parentEmail').classList.add('input-error'); showError('E-MAIL INVALIDO!'); return; }
    if (!p) { document.getElementById('parentPass').classList.add('input-error'); showError('DIGITE SUA SENHA!'); return; }

    document.getElementById('parentEmail').classList.remove('input-error');
    document.getElementById('parentPass').classList.remove('input-error');
    btn.classList.add('loading');

    setTimeout(() => {
      btn.classList.remove('loading');
      if (e === 'pai@email.com' && p === '1234') {
        showSuccess('parent');
      } else {
        showError('E-MAIL OU SENHA INCORRETOS!');
        document.getElementById('parentEmail').classList.add('input-error');
        document.getElementById('parentPass').classList.add('input-error');
      }
    }, 1400);
  }
}

/* ── Register ── */
function handleRegister() {
  playClick();
  hideError();

  const name  = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const pass  = document.getElementById('regPass').value;
  const pass2 = document.getElementById('regPass2').value;
  const btn   = document.getElementById('regSubmit');

  ['regName', 'regEmail', 'regPass', 'regPass2'].forEach(id =>
    document.getElementById(id).classList.remove('input-error')
  );

  if (!name) {
    document.getElementById('regName').classList.add('input-error');
    showError('INFORME SEU NOME!');
    return;
  }
  if (!email || !email.includes('@')) {
    document.getElementById('regEmail').classList.add('input-error');
    showError('E-MAIL INVALIDO!');
    return;
  }
  if (pass.length < 4) {
    document.getElementById('regPass').classList.add('input-error');
    showError('SENHA MUITO CURTA!');
    return;
  }
  if (pass !== pass2) {
    document.getElementById('regPass').classList.add('input-error');
    document.getElementById('regPass2').classList.add('input-error');
    showError('SENHAS NAO COINCIDEM!');
    return;
  }

  btn.classList.add('loading');
  setTimeout(() => {
    btn.classList.remove('loading');
    showSuccess('register');
  }, 1400);
}

/* ── Success screen ── */
function showSuccess(m) {
  const msgs = {
    kid:      'BEM-VINDO DE VOLTA!',
    parent:   'REDIRECIONANDO...',
    register: 'CADASTRO REALIZADO!'
  };
  document.getElementById('card').innerHTML = `
    <div style="text-align:center;padding:2rem 0;">
      <div style="width:64px;height:64px;background:#eaf0f8;border:3px solid #4e78a8;border-radius:14px;display:flex;align-items:center;justify-content:center;margin:0 auto 1.2rem;animation:bounce 1s ease-in-out infinite;">
        <svg viewBox="0 0 24 24" fill="none" stroke="#3a5f8a" stroke-width="2.5" width="30" height="30"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <div style="font-family:'DogicaPixel','Press Start 2P',monospace;font-size:11px;color:#3a5f8a;margin-bottom:0.75rem;letter-spacing:1px;">SUCESSO!</div>
      <div style="font-family:'DogicaPixel','Press Start 2P',monospace;font-size:7px;color:#7ca8cc;line-height:2.2;">${msgs[m]}</div>
      <div style="margin-top:1.5rem;height:8px;background:#eaf0f8;border-radius:4px;border:2px solid #b8c6dc;overflow:hidden;">
        <div style="height:100%;background:#4e78a8;animation:lb 1.5s ease forwards;width:0;border-radius:2px;"></div>
      </div>
    </div>
    <style>@keyframes lb{to{width:100%}} @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}</style>`;
}

/* ── Enter key ── */
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    if (document.getElementById('registerForm').style.display !== 'none') {
      handleRegister();
    } else {
      handleLogin(mode);
    }
  }
});
