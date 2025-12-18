// navigation.js

// 1. Toggles the Mobile Menu using a single class
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (!menu) return;

    // Use classList.toggle for visibility, let CSS handle 'display' and animation
    menu.classList.toggle('open'); 

    const isOpen = menu.classList.contains('open');

    // Toggle icons using class control (assuming CSS sets display based on .open class)
    if (menuIcon) menuIcon.style.display = isOpen ? 'none' : 'block';
    if (closeIcon) closeIcon.style.display = isOpen ? 'block' : 'none';
}

// 2. Toggles the Blog Dropdown using a single class
function toggleBlogDropdown(event) {
    // CRITICAL: Stop the click from bubbling to the document
    if (event) {
        event.preventDefault(); // Stop link navigation
        event.stopPropagation(); // Prevent the global document listener from immediately closing it
    }

    const dropdown = document.getElementById('blog-dropdown');
    const chevron = document.getElementById('blog-chevron');

    if (!dropdown) return;

    // Use classList.toggle for animation/visibility
    dropdown.classList.toggle('open');

    // Toggle chevron rotation based on class state
    if (chevron) {
        chevron.style.transform = dropdown.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
    }
}

// 3. Global Listener to close dropdown when clicking anywhere else
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('blog-dropdown');
    const chevron = document.getElementById('blog-chevron');
    const dropdownToggle = document.getElementById('blog-dropdown-toggle'); // Assuming the link/button has this ID

    if (!dropdown || !dropdown.classList.contains('open')) return;
    
    // Check if the click occurred on the dropdown menu itself, the chevron, or the toggle element
    const clickedInsideDropdown = dropdown.contains(event.target);
    const clickedToggle = (dropdownToggle && dropdownToggle.contains(event.target));
    
    if (!clickedInsideDropdown && !clickedToggle) {
        dropdown.classList.remove('open');
        if (chevron) chevron.style.transform = 'rotate(0deg)';
    }
});

// Assuming event listeners are attached in the HTML:
// <a href="resources.html" onclick="toggleBlogDropdown(event)" id="blog-dropdown-toggle">Resources <span id="blog-chevron">▼</span></a>
// <button onclick="toggleMobileMenu()" id="menu-toggle">...</button>
