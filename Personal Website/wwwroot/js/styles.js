// LIGHT MODE TOGGLE
const lightToggle = document.getElementById('lightModeToggle');
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    lightToggle.checked = true;
}

lightToggle.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    }
});

// ANIMATIONS
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                // Optional: stop observing once shown
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    items.forEach(item => observer.observe(item));
});

document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // stops re-triggering
            }
        });
    }, { threshold: 0.2 });

    items.forEach(item => observer.observe(item));
});

// Timeline Animation

document.addEventListener("DOMContentLoaded", () => {
    const timeline = document.querySelector(".timeline");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                timeline.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(timeline);
});