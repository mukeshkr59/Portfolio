/* ============================================================
   MUKESH KUMAR VISHWAKARMA — PORTFOLIO JAVASCRIPT
   Handles: Navbar, Theme Toggle, Typing, Scroll Animations,
            Hamburger Menu, Contact Form, Active Nav Links
   ============================================================ */

/* ── DOM READY ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. NAVBAR: Sticky scroll effect ─────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });


  /* ── 2. HAMBURGER MENU ────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });


  /* ── 3. THEME TOGGLE (dark / light) ──────────────────────── */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon   = document.getElementById('themeIcon');
  const htmlEl      = document.documentElement;

  // Restore saved preference
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }


  /* ── 4. TYPING ANIMATION ──────────────────────────────────── */
  const typingEl = document.getElementById('typingText');
  const phrases  = [
    'Backend Developer',
    'Node.js Engineer',
    'Cloud & AWS Developer',
    'MERN Stack Developer',
    'System Design Enthusiast',
  ];
  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let typingTimeout;

  function type() {
    const phrase  = phrases[phraseIndex];
    const visible = isDeleting
      ? phrase.substring(0, charIndex - 1)
      : phrase.substring(0, charIndex + 1);

    typingEl.textContent = visible;
    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

    let delay = isDeleting ? 60 : 95;

    if (!isDeleting && charIndex === phrase.length) {
      delay = 1800;       // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;        // Pause before next phrase
    }

    typingTimeout = setTimeout(type, delay);
  }

  type();


  /* ── 5. SCROLL-TRIGGERED FADE-IN ANIMATIONS ──────────────── */
  const fadeEls = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Animate once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  fadeEls.forEach(el => observer.observe(el));


  /* ── 6. ACTIVE NAV LINK (Highlight current section) ─────── */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-60px 0px -40% 0px',
  });

  sections.forEach(sec => sectionObserver.observe(sec));


  /* ── 7. CONTACT FORM (Frontend-only) ─────────────────────── */
  const contactForm = document.getElementById('contactForm');
  const formNote    = document.getElementById('formNote');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = document.getElementById('name').value.trim();
      const email   = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        showNote('Please fill in all required fields.', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showNote('Please enter a valid email address.', 'error');
        return;
      }

      // ── Mailto fallback (opens mail client) ──
      const subject  = document.getElementById('subject').value.trim() || 'Portfolio Contact';
      const body     = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      const mailto   = `mailto:mukeshkvknp2019@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;

      showNote('✓ Opening your email client…', 'success');
      contactForm.reset();
    });
  }

  function showNote(msg, type) {
    formNote.textContent = msg;
    formNote.style.color = type === 'success' ? 'var(--green)' : '#ef4444';
    setTimeout(() => { formNote.textContent = ''; }, 5000);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }


  /* ── 8. FOOTER: Auto-update copyright year ──────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ── 9. SMOOTH SCROLL POLYFILL for older browsers ─────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

}); // end DOMContentLoaded
