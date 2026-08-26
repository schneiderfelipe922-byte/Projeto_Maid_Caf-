// ===================================================================
// KAWAII CAFE — interações do site (header, hero, cardápio, guia,
// eventos, contato, FAQ e reservas)
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
  const tabPanels  = Array.from(document.querySelectorAll('.menu-panels .menu-grid'));

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
  const reservaNote = document.getElementById('reservaFormNote');

  if (reservaForm && reservaNote) {
    reservaForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!reservaForm.checkValidity()) {
        reservaForm.reportValidity();
        return;
      }

      const nome = reservaForm.querySelector('#reservaNome').value.trim();
      reservaNote.textContent = `Nya~ obrigada, ${nome}! Sua reserva foi enviada, em breve confirmamos por telefone. 🐾`;
      reservaForm.reset();
    });
  }

  /* ---- contato: form feedback (sem backend) ---- */
  const contactForm = document.getElementById('contactForm');
  const contactNote = document.getElementById('contactFormNote');

  if (contactForm && contactNote) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactNote.textContent = 'Nyaa~ preencha os campos obrigatórios antes de enviar. 🐾';
        contactNote.classList.remove('is-success');
        return;
      }

      const nome = contactForm.querySelector('[name="nome"]').value.trim();

      contactNote.textContent = `Mensagem enviada, ${nome}! Responderemos em breve. 💌`;
      contactNote.classList.add('is-success');
      contactForm.reset();
    });
  }

  /* ---- FAQ: acordeão de perguntas frequentes ---- */
  const faqItems = Array.from(document.querySelectorAll('.faq-item'));

  if (faqItems.length) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer   = item.querySelector('.faq-answer');
      if (!question || !answer) return;

      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        faqItems.forEach(other => {
          other.classList.remove('is-open');
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-answer').style.maxHeight = null;
        });

        if (!isOpen) {
          item.classList.add('is-open');
          question.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = `${answer.scrollHeight}px`;
        }
      });
    });
  }

  /* ---- gatinha da hero: os olhos seguem o cursor do mouse ---- */
  const catSvg     = document.querySelector('.cat-card svg');
  const pupilLeft  = document.getElementById('pupilLeft');
  const pupilRight = document.getElementById('pupilRight');

  if (catSvg && pupilLeft && pupilRight) {
    const eyeBase = {
      left:  { cx: parseFloat(pupilLeft.getAttribute('cx')),  cy: parseFloat(pupilLeft.getAttribute('cy')) },
      right: { cx: parseFloat(pupilRight.getAttribute('cx')), cy: parseFloat(pupilRight.getAttribute('cy')) }
    };
    const maxOffset = 3.4; // deslocamento máximo da pupila, em unidades do viewBox

    const moveEyes = (clientX, clientY) => {
      const rect = catSvg.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = clientX - centerX;
      const dy = clientY - centerY;
      const angle = Math.atan2(dy, dx);
      const distance = Math.min(1, Math.hypot(dx, dy) / 260);

      const offsetX = Math.cos(angle) * maxOffset * distance;
      const offsetY = Math.sin(angle) * maxOffset * distance;

      pupilLeft.setAttribute('cx', eyeBase.left.cx + offsetX);
      pupilLeft.setAttribute('cy', eyeBase.left.cy + offsetY);
      pupilRight.setAttribute('cx', eyeBase.right.cx + offsetX);
      pupilRight.setAttribute('cy', eyeBase.right.cy + offsetY);
    };

    window.addEventListener('mousemove', (e) => moveEyes(e.clientX, e.clientY), { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        moveEyes(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });
  }

});
