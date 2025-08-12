    // Show desktop hero button on larger screens
        function updateHeroButton() {
            const desktopButton = document.querySelector('.hero-button-desktop');
            const mobileButton = document.querySelector('.hero-button-mobile');
            
            if (window.innerWidth >= 640) {
                if (desktopButton) desktopButton.style.display = 'flex';
                if (mobileButton) mobileButton.style.display = 'none';
            } else {
                if (desktopButton) desktopButton.style.display = 'none';
                if (mobileButton) mobileButton.style.display = 'block';
            }
        }

        window.addEventListener('resize', updateHeroButton);
        updateHeroButton(); // Call on load