// navigation.js
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    // Check if menu is currently hidden or shown
    const isHidden = menu.style.display === 'none' || menu.style.display === '';
    
    if (isHidden) {
        menu.style.display = 'block';
        menu.classList.add('open');
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    } else {
        menu.style.display = 'none';
        menu.classList.remove('open');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
}

function toggleBlogDropdown() {
    const dropdown = document.getElementById('blog-dropdown');
    const chevron = document.getElementById('blog-chevron');
    
    const isHidden = dropdown.style.display === 'none' || dropdown.style.display === '';
    
    if (isHidden) {
        dropdown.style.display = 'block';
        chevron.style.transform = 'rotate(180deg)';
    } else {
        dropdown.style.display = 'none';
        chevron.style.transform = 'rotate(0deg)';
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('blog-dropdown');
    const button = event.target.closest('button');
    const chevron = document.getElementById('blog-chevron');
    
    // If we clicked outside the button, and the dropdown exists
    if (dropdown && (!button || button.getAttribute('onclick') !== 'toggleBlogDropdown()')) {
        dropdown.style.display = 'none';
        if(chevron) chevron.style.transform = 'rotate(0deg)';
    }
});
