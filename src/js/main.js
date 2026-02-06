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

