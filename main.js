/* ══════════════════════════════════
   VEF Automatización — main.js
   Versión responsiva para móvil, tablet y desktop
══════════════════════════════════ */

/* ── 1. REVEAL ON SCROLL ── */
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    revealEls.forEach(el => observer.observe(el));
} else {
    // Fallback para navegadores sin soporte
    revealEls.forEach(el => el.classList.add('active'));
}

/* ── 2. HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        // Accesibilidad
        hamburger.setAttribute('aria-expanded',
            navMenu.classList.contains('active') ? 'true' : 'false');
    });

    // Cerrar menú al hacer click en un link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}

/* ── 3. DROPDOWN MÓVIL (tap para abrir) ── */
const dropdownMenus = document.querySelectorAll('.dropdown');
dropdownMenus.forEach(menu => {
    const btn = menu.querySelector('.dropbtn');
    if (btn) {
        btn.addEventListener('click', (e) => {
            if (window.innerWidth <= 900) {
                e.preventDefault();
                menu.classList.toggle('open');
            }
        });
    }
});

/* ── 4. HEADER SCROLL SHADOW ── */
const header = document.querySelector('.header');
if (header) {
    window.addEventListener('scroll', () => {
        header.style.boxShadow = window.scrollY > 20
            ? '0 4px 24px rgba(10,42,41,0.22)'
            : '0 2px 20px rgba(10,42,41,0.08)';
    }, { passive: true });
}

/* ── 5. ACTIVE NAV LINK ON SCROLL ── */
const sections = document.querySelectorAll('section[id], div[id], footer[id]');
const navLinks  = document.querySelectorAll('.nav-menu a[href^="#"]');

if (sections.length && navLinks.length) {
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const active = document.querySelector(`.nav-menu a[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.35 });

    sections.forEach(s => navObserver.observe(s));
}

/* ── 6. TOUCH SCROLL CAROUSEL (opcional mejora táctil) ── */
const carruselTrack = document.querySelector('.carrusel-track');
if (carruselTrack) {
    // Pausar animación mientras se interactúa con touch
    carruselTrack.addEventListener('touchstart', () => {
        carruselTrack.style.animationPlayState = 'paused';
    }, { passive: true });
    carruselTrack.addEventListener('touchend', () => {
        setTimeout(() => { carruselTrack.style.animationPlayState = 'running'; }, 2000);
    }, { passive: true });
}
