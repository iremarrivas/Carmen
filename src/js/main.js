import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MotionPathPlugin from "gsap/MotionPathPlugin";
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);


document.addEventListener('DOMContentLoaded', () => {
	const v = document.getElementById('heroVideo');
	if (!v) return;
	// Ensure muted+loop and attempt to autoplay (browsers allow autoplay when muted)
	v.muted = true;
	v.loop = true;
	v.playsInline = true;
	v.play().catch(() => {
		// Autoplay may be blocked; user can still press play via UI if needed
		console.debug('Autoplay was blocked (user gesture required).');
	});


	gsap.fromTo('#heroVideo', { opacity: 0 }, { opacity: 1, duration: 1.5, ease: 'power2.out' });
});

// Toggle navbar background after scrolling past the hero video
document.addEventListener('DOMContentLoaded', () => {
	const navbar = document.querySelector('.navbar');
	const hero = document.getElementById('section_1');
	if (!navbar || !hero) return;

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				// hero is visible -> remove scrolled state
				navbar.classList.remove('scrolled');
			} else {
				// hero not visible -> add scrolled state
				navbar.classList.add('scrolled');
			}
		});
	}, { root: null, threshold: 0, rootMargin: '-20% 0px 0px 0px' });

	observer.observe(hero);
});

// Footer form validation
document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('footerForm');
	if (!form) return;

	const controls = Array.from(form.querySelectorAll('input[name]'));

	function showError(control, message) {
		const errEl = control.closest('.field') ? control.closest('.field').querySelector('.error-message') : control.parentElement.querySelector('.error-message');
		if (errEl) errEl.textContent = message || '';
		if (message) control.setAttribute('aria-invalid', 'true'); else control.removeAttribute('aria-invalid');
	}

	function validateControl(control) {
		// pattern-specific message for name fields
		if ((control.id === 'firstName' || control.id === 'lastName') && control.validity.patternMismatch) {
			showError(control, 'No uses números ni caracteres inválidos (solo letras espacios - y \\' );
			return false;
		}
		// checkbox handled via checked
		if (control.type === 'checkbox') {
			if (!control.checked) {
				showError(control, 'Acepta la política para continuar.');
				return false;
			}
			showError(control, '');
			return true;
		}

		if (!control.checkValidity()) {
			// use browser's validation message where possible
			showError(control, control.validationMessage || 'Campo inválido');
			return false;
		}
		showError(control, '');
		return true;
	}

	// live validation on blur/input. Additionally sanitize name fields while typing.
	controls.forEach(c => {
		c.addEventListener('input', () => {
			if (c.id === 'firstName' || c.id === 'lastName') {
				// allow letters (including accents), spaces, hyphen and apostrophe
				const allowed = c.value.match(/[A-Za-zÀ-ÖØ-öø-ÿ\s'\-]+/g);
				const cleaned = allowed ? allowed.join('') : '';
				if (cleaned !== c.value) {
					const prevPos = c.selectionStart || c.value.length;
					c.value = cleaned;
					// move caret to end for simplicity
					try { c.setSelectionRange(cleaned.length, cleaned.length); } catch (e) {}
					showError(c, 'Se eliminaron caracteres no permitidos.');
					// clear transient message
					if (c._errorTimeout) clearTimeout(c._errorTimeout);
					c._errorTimeout = setTimeout(() => { showError(c, ''); }, 1400);
				}
			}

			// sanitize phone input in real-time: allow digits, +, (), -, spaces
			if (c.id === 'phone') {
				const allowed = c.value.match(/[0-9+()\-\s]+/g);
				const cleaned = allowed ? allowed.join('') : '';
				if (cleaned !== c.value) {
					c.value = cleaned;
					showError(c, 'Solo se permiten números y los símbolos +()-.');
					if (c._errorTimeout) clearTimeout(c._errorTimeout);
					c._errorTimeout = setTimeout(() => { showError(c, ''); }, 1400);
				}
			}
			validateControl(c);
		});
		c.addEventListener('blur', () => validateControl(c));
	});

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		let valid = true;
		controls.forEach(c => { if (!validateControl(c)) valid = false; });
		if (!valid) {
			// focus first invalid
			const firstInvalid = form.querySelector('[aria-invalid="true"]');
			if (firstInvalid) firstInvalid.focus();
			return;
		}

		// Simulate successful submit (replace with real submission if desired)
		alert('Gracias — formulario enviado (simulado).');
		form.reset();
		controls.forEach(c => showError(c, ''));
	});
});



//Carousel initialization (if using Swiper for the carousel in section 6)
const swiperContainer = document.querySelector('#swiper-final .swiper-wrapper');

window.addEventListener('load', function() {
  // Verificamos que Swiper existe para evitar errores
  
  if (typeof Swiper !== 'undefined') {
    const swiper = new Swiper('#swiper-final', {
      loop: true,
      centeredSlides: true,
      slidesPerView: 1,
      speed: 2500, 
      autoplay: {
        delay: 1500,
        disableOnInteraction: false,
      },
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 0,
        stretch: 500, // Imágenes más juntas (reduce el gap)
        depth: 200,   // Empuja las imágenes al fondo
        modifier: 1,
        slideShadows: false, // Desactivado para que la transparencia luzca limpia
      },
	   breakpoints: {
		
		748: {
		slidesPerView: 1,
		spaceBetween: 10,
		coverflowEffect: {
            stretch: 300, // Adjust stretch for small screens
        },
		},
    	468: {
        slidesPerView: 1,
        spaceBetween: 80,
        coverflowEffect: {
            stretch: 200, // Adjust stretch for small screens
        },
		},
	},
		// renderizado
      observer: true,
      observeParents: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true, // Permitir clics en los puntos de paginación
      },
      on: {
        slideChange: function () {
          console.log('Slide cambiado a:', this.activeIndex);
        },
        reachEnd: function () {
          console.log('Último slide alcanzado, reiniciando...');
          this.slideToLoop(0); // Reinicia el loop al primer slide
        },
      },
    });
  } else {
    console.error("Swiper no está cargado correctamente.");
  }
});

// Enhanced Swiper initialization for new-carousel
document.addEventListener('DOMContentLoaded', () => {
  const newSwiper = new Swiper('#new-carousel', {
    loop: true,
    slidesPerView: 1,
	speed: 2500, 
    autoplay: {
      delay: 1500, // Slide changes every 2 seconds
      disableOnInteraction: false, // Continue autoplay after user interaction
    },
	effect: 'coverflow',
      coverflowEffect: {
        rotate: 0,
        stretch: 150, // Imágenes más juntas (reduce el gap)
        depth: 200,   // Empuja las imágenes al fondo
        modifier: 1,
        slideShadows: false, // Desactivado para que la transparencia luzca limpia
      },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
});

// Animations
document.addEventListener('DOMContentLoaded', () => {

	const timeline = gsap.timeline({
		scrollTrigger: { 
			trigger: '#section_3', 
			start: 'top 80%', 
			end: 'bottom 60%', 
			scrub: true, 
			markers:true, 
		} 
		}); 
		
	timeline.to('#card-1',{
		y: -120, 
		duration: 1.5, 
		ease: 'power2.out',
	})
	.to('#card-2',{
		y: 20, 
		duration: 1.5, 
		ease: 'power2.out', 
	},0)
	.to('#card-3',{ 
		y: -60, 
		duration: 1.5, 
		ease: 'power2.out', 
	},0);

});



document.addEventListener('DOMContentLoaded', () => {
	gsap.to(".dot_bottoms", {
		y: -50,
		duration: 1,
		delay: 0.5,
		
		ease: "power2.inOut",
		scrollTrigger: {
			trigger: ".circle",
			start: "top bottom",
			end: "1000px",
			scrub: true,
			
		}
		
	});
	gsap.to(".needle", {
		clipPath: "inset(0 0 100% 0)",
		duration: 1, // Duration of the fade-out
		//delay: 2.5, // Delay before starting the fade-out
		ease: "power2.inOut", // Smooth easing
		scrollTrigger: {
			trigger: ".circle", 
			start: "top 95%", 
			end: "750px", 
			scrub: true, 
  		},
  
	});

	gsap.utils.toArray("#circleMove .circle").forEach((circle) => {
  
  const semi = circle.querySelector(".semi-circle");
  const bigger = circle.querySelector(".semi-circle-bigger");

  gsap.set(semi, {
    position: "absolute",
    top: "78%",
    left: "50%",
    xPercent: -50,
    yPercent: -50,
    y: -125, // radius (250 / 2)
	
	
  });

  gsap.to(semi, {
    rotation: 360, 
    transformOrigin: "50% 125px",
    ease: "none",
    scrollTrigger: {
      trigger: circle,
      start: "top center", 
      end: "+=1100", // Adjust as needed for how long the animation should last
      scrub: true
    }
  });
  gsap.set(bigger, {
	position: "absolute",
    top: "105%",
    left: "50%",
    xPercent: -50,
    yPercent: -50,
    y: -125 
	});

  gsap.to(bigger, {
    rotation: 360, 
    transformOrigin: "50% 125px",
    ease: "none",
    scrollTrigger: {
      trigger: circle,
      start: "top center",
      end: "+=1100", // Adjust as needed for how long the animation should last
      scrub: true
    }
  });
	})

gsap.from("#columnIMG img", {
  opacity: 0,
  scale: 0.85,              // slightly smaller
  duration: 3.2,
  ease: "back.out(1.4)",    // nice soft pop effect
  stagger: 0.25,
  scrollTrigger: {
    trigger: "#columnIMG",
    start: "top 75%",
    toggleActions: "play none none none"
    // markers: true
  }
});


});
