     // Close mobile menu when clicking on a link
        document.querySelectorAll('#mobileMenu a').forEach(link => {
            link.addEventListener('click', function() {
                const mobileMenu = document.getElementById('mobileMenu');
                const hamburger = document.querySelector('.hamburger');
                
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });