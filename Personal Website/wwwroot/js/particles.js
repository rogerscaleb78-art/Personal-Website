// INDEX HOME PARTICLES

document.addEventListener("DOMContentLoaded", () => {
    let particlesInstance;

    // Load particles and keep a reference
    tsParticles.load("tsparticles", {
        particles: {
            number: { value: 160, density: { enable: true, area: 800 } },
            color: { value: ["#8B0000", "#00FFFF"] },
            shape: { type: "circle" },
            opacity: { value: 1, random: true, anim: { enable: true, speed: 1, opacity_min: 0, sync: false } },
            size: { value: 2, random: true, anim: { enable: false, speed: 4, size_min: 0.3, sync: false } },
            links: { enable: true, distance: 80, color: "random", opacity: 0.5, width: 1 },
            move: { enable: true, speed: 1, direction: "none", random: true, straight: false, outModes: "out", attract: { enable: false, rotateX: 600, rotateY: 600 } }
        },
        interactivity: {
            detectsOn: "window",
            events: { onHover: { enable: true, mode: "grab" }, onClick: { enable: true, mode: "repulse" }, resize: true },
            modes: { grab: { distance: 150, links: { opacity: 0.7 } }, bubble: { distance: 250, size: 0, duration: 2, opacity: 0, speed: 3 }, repulse: { distance: 400, duration: 0.4 }, push: { quantity: 4 }, remove: { quantity: 2 } }
        },
        detectRetina: true
    }).then(p => {
        particlesInstance = p;

        // Apply accessibility if saved
        if (localStorage.getItem('accessibility') === 'enabled') {
            enableAccessibilityMode();
            document.getElementById('accessibilityToggle').checked = true;
        }
    });

    const accessibilityToggle = document.getElementById('accessibilityToggle');
    accessibilityToggle.addEventListener('change', function () {
        if (this.checked) {
            enableAccessibilityMode();
            localStorage.setItem('accessibility', 'enabled');
        } else {
            disableAccessibilityMode();
            localStorage.setItem('accessibility', 'disabled');
        }
    });

    function enableAccessibilityMode() {
        if (!particlesInstance) return;

        particlesInstance.options.particles.move.enable = false;
        if (particlesInstance.options.interactivity?.events) {
            particlesInstance.options.interactivity.events.onHover.enable = false;
            particlesInstance.options.interactivity.events.onClick.enable = false;
        }
        particlesInstance.refresh();
    }

    function disableAccessibilityMode() {
        if (!particlesInstance) return;

        particlesInstance.options.particles.move.enable = true;
        if (particlesInstance.options.interactivity?.events) {
            particlesInstance.options.interactivity.events.onHover.enable = true;
            particlesInstance.options.interactivity.events.onClick.enable = true;
        }
        particlesInstance.refresh();
    }
});
