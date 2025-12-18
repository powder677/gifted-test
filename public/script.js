// script.js - Navigation and Premium Animations

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuToggle = document.getElementById('menuToggle');
    const allSections = document.querySelectorAll('section');

    // 1. Mobile Hamburger Menu Toggle
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            menuToggle.innerHTML = mobileMenu.classList.contains('active') ? '✖' : '☰';
        });
    }

    // 2. Subtle Fade-In Animation on Scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    allSections.forEach(section => {
        observer.observe(section);
    });

    // 3. Broken Download Link Fix
    document.querySelectorAll('a[data-download-fix]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // This replaces the old broken PDF link with a sophisticated message.
            alert('The official Training Packet PDF is currently being polished for release! Please subscribe on our home page for a notification when it drops.');
        });
    });
});
