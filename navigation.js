// navigation.js
let mobileMenuOpen = false;
let blogDropdownOpen = false;

function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    const menu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (mobileMenuOpen) {
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
    blogDropdownOpen = !blogDropdownOpen;
    const dropdown = document.getElementById('blog-dropdown');
    const chevron = document.getElementById('blog-chevron');
    
    if (blogDropdownOpen) {
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
    
    if (!button || !button.onclick || button.onclick.toString().indexOf('toggleBlogDropdown') === -1) {
        if (blogDropdownOpen) {
            blogDropdownOpen = false;
            if(dropdown) dropdown.style.display = 'none';
            const chevron = document.getElementById('blog-chevron');
            if(chevron) chevron.style.transform = 'rotate(0deg)';
        }
    }
});
