

import gsap from 'gsap';

(function () {


  function initDownArrows() {
    document.querySelectorAll('.down-arrows').forEach(container => {
      container.removeEventListener('click', onClick);
      container.addEventListener('click', onClick);
    });

    function onClick(e) {
      e.preventDefault();
      const container = e.currentTarget;
      const targetSelector = container.getAttribute('data-target');
      let target = targetSelector ? document.querySelector(targetSelector) : null;

      if (!target) {
        const parentSection = container.closest('section, [id^="section"]');
        if (parentSection) {
          let next = parentSection.nextElementSibling;
          while (next && next.matches && !next.matches('section, [id^="section"], .section')) {
            next = next.nextElementSibling;
          }
          target = next;
        }
      }

      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  }

  function setup() {
    const section5Container = document.querySelector('#section_5 .container');
    if (section5Container) section5Container.style.overflow = 'visible';

    initDownArrows();
    initHearts();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }

  // stop timeout on resize to avoid excessive calls
  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      initDownArrows();
      initHearts();
    }, 220);
  });
})();