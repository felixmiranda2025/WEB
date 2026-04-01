/* ══════════════════════════════════
   VEF Automatización — main.js
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
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
} else {
    // Fallback: mostrar todo si no hay soporte
    revealEls.forEach(el => el.classList.add('active'));
}

/* ── 2. HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

/* ── 3. HEADER SCROLL SHADOW ── */
const header = document.querySelector('.header');
if (header) {
    window.addEventListener('scroll', () => {
        header.style.boxShadow = window.scrollY > 20
            ? '0 4px 24px rgba(10,42,41,0.15)'
            : '0 2px 20px rgba(10,42,41,0.08)';
    }, { passive: true });
}

/* ── 4. ACTIVE NAV LINK ON SCROLL ── */
const sections = document.querySelectorAll('section[id], div[id]');
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
    }, { threshold: 0.4 });

    sections.forEach(s => navObserver.observe(s));
}
