// Wait for the entire HTML document to be loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Functionality ---
    
    // Get the button for toggling the mobile menu
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    // Get the mobile menu itself
    const mobileMenu = document.querySelector('.mobile-menu');

    // Check if both the button and the menu exist on the page
    if (mobileMenuButton && mobileMenu) {
        // Add a 'click' event listener to the button
        mobileMenuButton.addEventListener('click', () => {
            // Toggle the 'active' class on the mobile menu
            // This class will be used in CSS to show or hide the menu
            mobileMenu.classList.toggle('active');
        });
    }

});


    
