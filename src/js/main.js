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

