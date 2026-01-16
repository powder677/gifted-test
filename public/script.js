/**
 * Navigator Kids AI™ - Unified Script
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. SELECT ELEMENTS
    // We look for the menu toggle button and the mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const icon = menuToggle ? menuToggle.querySelector('i') : null;

    // 2. TOGGLE FUNCTION
    function toggleMenu() {
        if (!mobileMenu || !menuToggle) return;

        // Toggle the 'active' class
        mobileMenu.classList.toggle('active');

        // Switch the icon
        if (icon) {
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }

    // 3. EVENT LISTENER (CLICK)
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent click from bubbling up
            toggleMenu();
        });
    }

    // 4. CLOSE MENU WHEN CLICKING OUTSIDE
    document.addEventListener('click', function(e) {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            // If click is NOT inside menu AND NOT on the toggle button
            if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                mobileMenu.classList.remove('active');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });
});
