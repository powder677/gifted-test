// navigation.js

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (!menu) return;
    
    const isHidden = menu.style.display === 'none' || menu.style.display === '';
    
    if (isHidden) {
        menu.style.display = 'block';
        menu.classList.add('open');
        if(menuIcon) menuIcon.style.display = 'none';
        if(closeIcon) closeIcon.style.display = 'block';
    } else {
        menu.style.display = 'none';
        menu.classList.remove('open');
        if(menuIcon) menuIcon.style.display = 'block';
        if(closeIcon) closeIcon.style.display = 'none';
    }
}

function toggleBlogDropdown(event) {
    // CRITICAL: Stop the click from bubbling to the document
    if (event) {
        event.stopPropagation();
        event.preventDefault(); // Prevent default link behavior if any
    }

    const dropdown = document.getElementById('blog-dropdown');
    const chevron = document.getElementById('blog-chevron');
    
    if (!dropdown) return;
    
    const isHidden = dropdown.style.display === 'none' || dropdown.style.display === '';
    
    if (isHidden) {
        dropdown.style.display = 'block';
        if(chevron) chevron.style.transform = 'rotate(180deg)';
    } else {
        dropdown.style.display = 'none';
        if(chevron) chevron.style.transform = 'rotate(0deg)';
    }
}

// Close dropdown when clicking anywhere ELSE in the document
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('blog-dropdown');
    const chevron = document.getElementById('blog-chevron');
    
    // If dropdown exists and is open
    if (dropdown && dropdown.style.display === 'block') {
        // If the click happened INSIDE the dropdown, do nothing (let the link work)
        if (dropdown.contains(event.target)) {
            return;
        }
        
        // Otherwise, close it
        dropdown.style.display = 'none';
        if(chevron) chevron.style.transform = 'rotate(0deg)';
    }
});
