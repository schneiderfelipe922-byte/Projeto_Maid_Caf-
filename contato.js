document.addEventListener('DOMContentLoaded', () => {

  /* ---- mobile nav toggle ---- */
  const navToggle = document.getElementById('navToggle');
  const mainNav   = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    });

    // close menu after choosing a link (mobile)
    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- highlight active section link on scroll ---- */
  const links = Array.from(document.querySelectorAll('.nav-link'));
  const sections = links
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(section => observer.observe(section));
  }

  /* ---- header shadow after scrolling past hero top ---- */
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 12
        ? '0 8px 24px -18px rgba(74,37,69,0.35)'
        : 'none';
    }, { passive: true });
  }

  /* ---- contact form ---- */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (contactForm && formNote) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        formNote.textContent = 'Nyaa~ preencha os campos obrigatórios antes de enviar. 🐾';
        formNote.classList.remove('is-success');
        return;
      }

      const nome = contactForm.querySelector('[name="nome"]').value.trim();

      formNote.textContent = `Mensagem enviada, ${nome}! Responderemos em breve. 💌`;
      formNote.classList.add('is-success');
      contactForm.reset();
    });
  }

});