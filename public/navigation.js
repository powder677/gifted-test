/**
 * Navigator Kids AI™ - Navigation Logic
 * Aligned with standard HTML structure:
 * - Mobile Menu ID: #mobileMenu
 * - Toggle Button Class: .menu-toggle
 * - Active Class: .active
 */

// 1. Mobile Menu Toggle
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const toggleBtn = document.querySelector('.menu-toggle');
    const icon = toggleBtn ? toggleBtn.querySelector('i') : null;

    if (!menu) return;

    // Toggle visibility class
    menu.classList.toggle('active');

    // Toggle Icon (Hamburger <-> X)
    if (icon) {
        if (menu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
}

// 2. Dropdown Toggle (Safe Implementation)
// Only runs if the specific dropdown HTML exists on the page
function toggleDropdown(event, dropdownId, chevronId) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const dropdown = document.getElementById(dropdownId);
    const chevron = document.getElementById(chevronId);

    if (!dropdown) return;

    // Close other open dropdowns first (optional, for safety)
    document.querySelectorAll('.dropdown-menu.active').forEach(d => {
        if (d.id !== dropdownId) d.classList.remove('active');
    });

    // Toggle current state
    dropdown.classList.toggle('active');

    // Rotate chevron if it exists
    if (chevron) {
        chevron.style.transform = dropdown.classList.contains('active') 
            ? 'rotate(180deg)' 
            : 'rotate(0deg)';
    }
}

// 3. Global Click Listener (Closes Menus when clicking outside)
document.addEventListener('click', function(event) {
    // --- Handle Mobile Menu ---
    const mobileMenu = document.getElementById('mobileMenu');
    const menuToggle = document.querySelector('.menu-toggle');

    if (mobileMenu && menuToggle) {
        const isClickInside = mobileMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);

        if (!isClickInside && !isClickOnToggle && mobileMenu.classList.contains('active')) {
            toggleMenu(); // Reuse function to reset icons correctly
        }
    }

    // --- Handle Dropdowns (Generic) ---
    // Closes any element with class 'dropdown-menu' if clicked outside
    const openDropdowns = document.querySelectorAll('.dropdown-menu.active');
    openDropdowns.forEach(dropdown => {
        // Find the trigger button/link for this dropdown (assumes logic or specific structure)
        // For simple implementations, just checking if click is outside the dropdown is usually enough
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove('active');
            
            // Reset associated chevrons if necessary (requires specific ID mapping)
            // This is a generic reset:
            document.querySelectorAll('.dropdown-chevron').forEach(c => {
                c.style.transform = 'rotate(0deg)';
            });
        }
    });
});
