  function toggleMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            const hamburger = document.querySelector('.hamburger');
            
            mobileMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        }

        function closeMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            const hamburger = document.querySelector('.hamburger');
            
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const mobileMenu = document.getElementById('mobileMenu');
            const hamburger = document.querySelector('.hamburger');
            const nav = document.querySelector('.nav');
            
            if (!nav.contains(event.target) && mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        // Close menu when resizing to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
