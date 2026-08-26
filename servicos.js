// ===================================================================
// KAWAII CAFE — header & hero interactions
// ===================================================================

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

  /* ---- cardápio: category tabs ---- */
  const tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
  const tabPanels  = Array.from(document.querySelectorAll('.menu-grid'));

  if (tabButtons.length && tabPanels.length) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');

        tabButtons.forEach(b => {
          const isActive = b === btn;
          b.classList.toggle('is-active', isActive);
          b.setAttribute('aria-selected', String(isActive));
        });

        tabPanels.forEach(panel => {
          const isActive = panel.id === `painel-${target}`;
          panel.classList.toggle('is-active', isActive);
          panel.hidden = !isActive;
        });
      });
    });
  }

  /* ---- reservas: form feedback (sem backend) ---- */
  const reservaForm = document.getElementById('reservaForm');
  const formNote    = document.getElementById('formNote');

  if (reservaForm && formNote) {
    reservaForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!reservaForm.checkValidity()) {
        reservaForm.reportValidity();
        return;
      }

      const nome = reservaForm.querySelector('#reservaNome').value.trim();
      formNote.textContent = `Nya~ obrigada, ${nome}! Sua reserva foi enviada, em breve confirmamos por telefone. 🐾`;
      reservaForm.reset();
    });
  }

});