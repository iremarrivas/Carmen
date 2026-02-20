import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MotionPathPlugin from "gsap/MotionPathPlugin";
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);


document.addEventListener('DOMContentLoaded', () => {
	const v = document.getElementById('heroVideo');
	if (!v) return;
	v.muted = true;
	v.loop = true;
	v.playsInline = true;
	v.play().catch(() => {
		console.debug('');
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
				
				navbar.classList.remove('scrolled');
			} else {
		
				navbar.classList.add('scrolled');
			}
		});
	}, { root: null, threshold: 0, rootMargin: '-20% 0px 0px 0px' });

	observer.observe(hero);
});

// Footer form validation --------------------------------------
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
		// pattern-specific message f
		if ((control.id === 'firstName' || control.id === 'lastName') && control.validity.patternMismatch) {
			showError(control, 'No uses números ni caracteres inválidos (solo letras espacios - y \\' );
			return false;
		}

		if (control.type === 'checkbox') {
			if (!control.checked) {
				showError(control, 'Acepta la política para continuar.');
				return false;
			}
			showError(control, '');
			return true;
		}

		if (!control.checkValidity()) {
			showError(control, control.validationMessage || 'Campo inválido');
			return false;
		}
		showError(control, '');
		return true;
	}

	// live validation on blur/input.
	controls.forEach(c => {
		c.addEventListener('input', () => {
			if (c.id === 'firstName' || c.id === 'lastName') {
				// allow letters
				const allowed = c.value.match(/[A-Za-zÀ-ÖØ-öø-ÿ\s'\-]+/g);
				const cleaned = allowed ? allowed.join('') : '';
				if (cleaned !== c.value) {
					const prevPos = c.selectionStart || c.value.length;
					c.value = cleaned;
	
					try { c.setSelectionRange(cleaned.length, cleaned.length); } catch (e) {}
					showError(c, 'Se eliminaron caracteres no permitidos.');
			
					if (c._errorTimeout) clearTimeout(c._errorTimeout);
					c._errorTimeout = setTimeout(() => { showError(c, ''); }, 1400);
				}
			}
			if (c.id === 'phone') {
				const phoneValue = c.value || '';
				//  +
				let cleaned = phoneValue.replace(/[^0-9()\-\s+]/g, '');
				const hadLeadingPlus = phoneValue.trim().startsWith('+');
				
				cleaned = cleaned.replace(/\+/g, '');
				if (hadLeadingPlus) cleaned = '+' + cleaned;
				if (cleaned !== phoneValue) {
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
		alert('Gracias — formulario enviado (simulado).');
		form.reset();
		controls.forEach(c => showError(c, ''));
	});
});



//Carousel initialization ( section 6)
const swiperContainer = document.querySelector('#swiper-final .swiper-wrapper');

window.addEventListener('load', function() {

  if (typeof Swiper !== 'undefined') {
    const swiper = new Swiper('#swiper-final', {
      loop: true,
      centeredSlides: true,
      slidesPerView: 2,
	  spaceBetween: 10,
      speed: 2500, 
    	autoplay: {
         delay: 1500,
         disableOnInteraction: false,
      },
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 0,
        stretch: 120, 
        depth: 200,  
        modifier: 1,
        slideShadows: false, 
      },
	   breakpoints: {
		1024: {
		slidesPerView: 1,
		spaceBetween: -450,
		coverflowEffect: {
			stretch: 300, 
		},
		},
		
		748: {
		slidesPerView: 1,
		spaceBetween: 10,
		coverflowEffect: {
            stretch: 300, 
        },
		},
    	468: {
        slidesPerView: 1,
        spaceBetween: 80,
        coverflowEffect: {
            stretch: 200,
        },
		},
	},
		//pagination: 
      observer: true,
      observeParents: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      on: {
       init() {
         
          this.pagination.render();
          this.pagination.update();
        }
      }
    });
  } else {
    console.error("Swiper no está cargado correctamente.");
  }
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
    y: -125, 
	
	
  });

  gsap.to(semi, {
    rotation: 360, 
    transformOrigin: "50% 125px",
    ease: "none",
    scrollTrigger: {
      trigger: circle,
      start: "top center", 
      end: "+=1100", 
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
      end: "+=1100",
      scrub: true
    }
  });
	})

gsap.from("#columnIMG img", {
  opacity: 0,
  scale: 0.85,             
  duration: 3.2,
  ease: "back.out(1.4)",    
  stagger: 0.25,
  scrollTrigger: {
    trigger: "#columnIMG",
    start: "top 75%",
    toggleActions: "play none none none"
    // markers: true
  }
});


});

  


