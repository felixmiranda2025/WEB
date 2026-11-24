/* ═══════════════════════════════════════════
   VEF Automatización — main.js
═══════════════════════════════════════════ */

// ── HAMBURGER MENU
(function () {
    const ham  = document.getElementById('hamburger');
    const menu = document.getElementById('navMenu');
    if (!ham || !menu) return;
    ham.addEventListener('click', () => {
        ham.classList.toggle('active');
        menu.classList.toggle('active');
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        ham.classList.remove('active');
        menu.classList.remove('active');
    }));
    document.addEventListener('click', e => {
        if (!ham.contains(e.target) && !menu.contains(e.target)) {
            ham.classList.remove('active');
            menu.classList.remove('active');
        }
    });
})();

// ── SCROLL REVEAL
(function () {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('active'); io.unobserve(e.target); }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    els.forEach(el => io.observe(el));
})();

// ── SMOOTH SCROLL
(function () {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
})();

// ── CARRUSEL PAUSA AL HOVER
(function () {
    const track = document.querySelector('.carrusel-track');
    if (!track) return;
    track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
    track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
})();
