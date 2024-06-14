document.addEventListener('DOMContentLoaded', function() {
    // Global Variables
    const backButton = document.querySelectorAll('.back-btn');
    
    // ==================================
    // Projects' Back Button
    // ==================================
    
    // Add a click event listener to the button
    backButton.forEach(btn => {
        btn.addEventListener('click', function() {
        // Navigate to the previous page in the browser's history
        window.history.back();
        });
    });
});

