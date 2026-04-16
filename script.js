/* ─────────────────────────────────────────────
   Cursor glow
───────────────────────────────────────────── */
const mouseEl = document.getElementById('mouse');
let curX = 0, curY = 0, aimX = 0, aimY = 0;

if (mouseEl) {
  document.addEventListener('mousemove', e => {
    aimX = e.clientX;
    aimY = e.clientY;
  });

  (function tickCursor() {
    curX += (aimX - curX) * 0.12;
    curY += (aimY - curY) * 0.12;
    mouseEl.style.left = (curX - 190) + 'px';
    mouseEl.style.top  = (curY - 190) + 'px';
    requestAnimationFrame(tickCursor);
  })();
}

/* ─────────────────────────────────────────────
   Hero text swap  (index)
───────────────────────────────────────────── */
document.querySelectorAll('.ab').forEach(btn => {
  const t1 = document.querySelectorAll('.ab');
  const t2 = document.querySelectorAll('.ha');

  btn.addEventListener('mouseover', () => {
    t1.forEach(el => { el.style.color = '#000'; el.style.webkitTextStroke = '0px'; el.style.transition = '0.6s'; });
    t2.forEach(el => { el.style.color = 'transparent'; el.style.webkitTextStroke = '1.5px #000'; el.style.transition = '0.6s'; });
  });

  btn.addEventListener('mouseleave', () => {
    t1.forEach(el => { el.style.color = 'transparent'; el.style.webkitTextStroke = '1.5px #000'; el.style.transition = '0.6s'; });
    t2.forEach(el => { el.style.color = '#000'; el.style.webkitTextStroke = '0px'; el.style.transition = '0.6s'; });
  });
});

/* ─────────────────────────────────────────────
   Hero image parallax  (index)
───────────────────────────────────────────── */
const heroImage = document.querySelector('.image');
if (heroImage) {
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroImage.style.transform = `translate(${x}px, ${y}px)`;
    heroImage.style.transition = 'transform 0.15s ease-out';
  });
}

/* ─────────────────────────────────────────────
   3D Tilt on cards
───────────────────────────────────────────── */
function initTilt(selector, maxTilt = 12) {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.transition = 'none';
    });
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) translateZ(8px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 0.55s cubic-bezier(0.4,0,0.2,1)';
      el.style.transform  = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
    });
  });
}

initTilt('.formation .f1, .formation .f2');
initTilt('.experience .e1, .experience .e2');
initTilt('.projet a', 8);

/* ─────────────────────────────────────────────
   Magnetic buttons
───────────────────────────────────────────── */
function initMagnetic(selector, strength = 0.35) {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width  / 2)) * strength;
      const y = (e.clientY - (r.top  + r.height / 2)) * strength;
      el.style.transform = `translate(${x}px, ${y}px)`;
      el.style.transition = 'transform 0.1s ease-out';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform  = 'translate(0,0)';
      el.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
    });
  });
}

initMagnetic('.button .b1, .button .b2');
initMagnetic('.submit-button', 0.2);

/* ─────────────────────────────────────────────
   Accordion (experience)
───────────────────────────────────────────── */
document.querySelectorAll('.experience .e1 h1, .experience .e2 h1').forEach(h => {
  h.addEventListener('click', () => {
    const desc = h.closest('.e1, .e2').querySelector('h3');
    if (desc) desc.classList.toggle('open');
  });
});

/* ─────────────────────────────────────────────
   EmailJS contact form
───────────────────────────────────────────── */
function sendMail() {
  const name    = document.getElementById('name')?.value;
  const email   = document.getElementById('email')?.value;
  const message = document.getElementById('issue')?.value;
  const subject = document.getElementById('subject')?.value;

  if (!name || !email || !message || !subject) {
    alert('Veuillez remplir tous les champs.');
    return;
  }

  emailjs.send('service_qw2peya', 'template_gkif4f5', { name, email, message, subject })
    .then(res  => alert('Email envoyé ! Statut : ' + res.status))
    .catch(err => { alert('Erreur : ' + err); console.error(err); });
}

/* ─────────────────────────────────────────────
   Skills tab (unused but kept for compatibility)
───────────────────────────────────────────── */
const tabLinks    = document.getElementsByClassName('tab-links');
const tabContents = document.getElementsByClassName('tab-contents');

function openTab(tabName) {
  [...tabLinks].forEach(l => l.classList.remove('active-link'));
  [...tabContents].forEach(c => c.classList.remove('active-tab'));
  event.currentTarget.classList.add('active-link');
  document.getElementById(tabName)?.classList.add('active-tab');
}
