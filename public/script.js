/**
 * Navigator Kids AI™ - Global Script
 * Handles Mobile Navigation and Scroll Animations
 */

// --- 1. GLOBAL NAVIGATION LOGIC (MANDATORY) ---

function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const toggle = document.querySelector('.menu-toggle i');
    
    // Safety check
    if (!menu || !toggle) return;

    menu.classList.toggle('active');

    if (menu.classList.contains('active')) {
        toggle.classList.remove('fa-bars');
        toggle.classList.add('fa-times');
    } else {
        toggle.classList.remove('fa-times');
        toggle.classList.add('fa-bars');
    }
}

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    const menu = document.getElementById('mobileMenu');
    const toggle = document.querySelector('.menu-toggle');

    // Return if elements don't exist
    if (!menu || !toggle) return;

    // Return if click is inside the menu or on the toggle button
    if (menu.contains(e.target) || toggle.contains(e.target)) return;

    // Close if active
    if (menu.classList.contains('active')) {
        menu.classList.remove('active');
        const icon = toggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});

// --- 2. DOM CONTENT LOADED HANDLERS ---

document.addEventListener('DOMContentLoaded', function() {
    
    // A. Close Mobile Menu when a link is clicked
    const mobileLinks = document.querySelectorAll('.mobile-nav a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.getElementById('mobileMenu');
            const toggle = document.querySelector('.menu-toggle i');
            
            if (menu && menu.classList.contains('active')) {
                menu.classList.remove('active');
                if (toggle) {
                    toggle.classList.remove('fa-times');
                    toggle.classList.add('fa-bars');
                }
            }
        });
    });

    // B. Subtle Fade-In Animation on Scroll
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

    // Observe Sections, Article Bodies, and Key Takeaways
    document.querySelectorAll('section, .article-body, .key-takeaways').forEach(section => {
        section.classList.add('fade-in-section'); // Ensure CSS supports this opacity start
        observer.observe(section);
    });
});
