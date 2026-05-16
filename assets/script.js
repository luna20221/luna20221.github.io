
document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.menu');
  const drops = document.querySelectorAll('.drop');
  if (mobileToggle && menu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }
  drops.forEach(drop => {
    const btn = drop.querySelector('.dropbtn');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      if (window.innerWidth <= 820) {
        e.preventDefault();
        drop.classList.toggle('open');
      }
    });
  });

  document.querySelectorAll('form[data-formspree]').forEach(form => {
    const status = form.querySelector('[data-form-status]');
    form.addEventListener('submit', async (event) => {
      const endpoint = form.getAttribute('action') || '';
      if (!endpoint.includes('formspree.io/f/') || endpoint.includes('REPLACE_WITH_FORM_ID')) {
        event.preventDefault();
        if (status) {
          status.textContent = 'Formspree is ready, but the live Formspree form ID still needs to be added.';
          status.className = 'form-status is-visible is-error';
        }
        return;
      }

      event.preventDefault();
      if (status) {
        status.textContent = 'Sending your enquiry...';
        status.className = 'form-status is-visible';
      }

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (!response.ok) throw new Error('Formspree submission failed');
        form.reset();
        if (status) {
          status.textContent = 'Thanks. Your enquiry has been sent.';
          status.className = 'form-status is-visible';
        }
      } catch (error) {
        if (status) {
          status.textContent = 'Sorry, the form could not send. Please call or email JW Carpet Care directly.';
          status.className = 'form-status is-visible is-error';
        }
      }
    });
  });
});
