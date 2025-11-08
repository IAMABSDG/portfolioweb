// ===== Animation au scroll =====
const fades = document.querySelectorAll('.fade-in, .fade-up');
function showOnScroll() {
  const trigger = window.innerHeight * 0.85;
  fades.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) el.classList.add('visible');
  });
}
window.addEventListener('scroll', showOnScroll);
window.addEventListener('load', showOnScroll);

// ===== Navbar dynamique =====
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// ===== Typing effect =====
const text = "SAWADOGO Mahmoud Abass";
let i = 0;
function typing() {
  const target = document.getElementById("typing-text");
  if (i < text.length) {
    target.innerHTML += text.charAt(i);
    i++;
    setTimeout(typing, 100);
  } else {
    target.innerHTML += "<span class='cursor'>|</span>";
    animateSubtitle();
  }
}
window.onload = typing;

// ===== Animation du sous-titre =====
function animateSubtitle() {
  const subtitle = document.querySelector(".header p");
  const buttons = document.querySelector(".header-buttons");
  setTimeout(() => subtitle.classList.add("visible-subtitle"), 500);
  setTimeout(() => buttons.classList.add("visible-buttons"), 1000);
}

// ===== Modales Projets =====
const projects = document.querySelectorAll('.project');
projects.forEach((p) => {
  p.addEventListener('click', () => openModal(p.dataset.project));
});

function openModal(num) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content fade-up">
      <span class="close">&times;</span>
      <img src="assets/projets/project${num}.jpg" alt="Projet ${num}">
      <h2>Détails du projet ${num}</h2>
      <p><strong>Technologies utilisées :</strong> ${getTech(num)}</p>
      <p>${getText(num)}</p>
      <a href="#" target="_blank" class="btn">En savoir plus →</a>
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelector('.close').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
}

function getTech(n) {
  const tech = {
    1: "Arduino, capteurs, C++",
    2: "Python, Capteurs MQ, Interface Web",
    3: "Raspberry Pi, OpenCV, Python",
    4: "STM32, FreeRTOS, capteurs solaires",
    5: "Spring Boot, React, PostgreSQL",
    6: "STM32, L298N, capteurs IR",
    7: "OptiSystem, Matlab, G.652",
    8: "Python, OpenCV, IA Vision",
    9: "Matlab, Simulink, Contrôle PID"
  };
  return tech[n];
}

function getText(n) {
  const txt = {
    1: "Robot organisateur de magasin : stockage automatique des cartons selon leurs caractéristiques physiques.",
    2: "Airsense Tech System : contrôle intelligent de la qualité de l'air dans un véhicule connecté.",
    3: "Chaîne de tri : automatisation du tri industriel avec Raspberry Pi et caméra IA.",
    4: "Smart Solar System : gestion optimisée d’installation solaire avec monitoring en temps réel.",
    5: "SoukScan : plateforme B2B de comparaison de prix basée sur microservices.",
    6: "AGV Industriel : prototype d’AGV autonome piloté par STM32.",
    7: "Réseau PON : étude et modélisation complète d’un réseau optique passif.",
    8: "Système de vision IA : inspection automatique par vision industrielle.",
    9: "Commande PID : régulation de la pression dans un système médical simulé."
  };
  return txt[n];
}

/* ====================== AJOUT SUPPLÉMENTAIRE ====================== */

// --- Smooth scroll vers les sections ---
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70, // marge sous la navbar
        behavior: 'smooth'
      });
    }
  });
});

// --- Highlight du lien actif dans la navbar ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// --- Style du lien actif ---
const style = document.createElement('style');
style.innerHTML = `
  .nav-links a.active {
    color: #00bfff !important;
  }
  .nav-links a.active::after {
    width: 100%;
  }
`;
document.head.appendChild(style);

// --- Menu mobile (burger toggle) ---
const burger = document.createElement('div');
burger.className = 'burger';
burger.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('.navbar').appendChild(burger);

burger.addEventListener('click', () => {
  document.querySelector('.navbar').classList.toggle('active');
  burger.classList.toggle('open');
});

// --- Style du burger ---
const burgerStyle = document.createElement('style');
burgerStyle.innerHTML = `
  .burger {
    display: none;
    color: #00bfff;
    font-size: 1.8em;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    .burger { display: block; }
  }
  .burger.open i {
    transform: rotate(90deg);
    transition: transform 0.3s;
  }
`;
document.head.appendChild(burgerStyle);

// === Injection automatique des titres visibles sur les projets ===
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.project').forEach((p) => {
    const title = p.querySelector('.project-overlay h3');
    if (title) {
      const visibleTitle = document.createElement('div');
      visibleTitle.className = 'project-title-visible';
      visibleTitle.textContent = title.textContent;
      p.appendChild(visibleTitle);

      // Effet : le titre disparaît au survol et réapparaît après
      p.addEventListener('mouseenter', () => {
        visibleTitle.style.opacity = '0';
      });
      p.addEventListener('mouseleave', () => {
        visibleTitle.style.opacity = '1';
      });
    }
  });
});
