// ===========================
// CONFIGURACIÓN INICIAL
// ===========================
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-in';

// ===========================
// INTERSECTION OBSERVERS
// ===========================

// Observer general para animaciones (ej: service-card)
const generalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            generalObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observer específico para contadores
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const delay = parseInt(card.dataset.delay) || 0;

            setTimeout(() => {
                card.classList.add('animate');
                animateCounter(card);
            }, delay);

            counterObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px 0px 0px"
});

// ===========================
// FUNCIONES DE ANIMACIÓN
// ===========================
function animateCounter(card) {
    const numberElement = card.querySelector('.stat-number');
    if (!numberElement) return;

    const target = parseInt(numberElement.dataset.target);
    const suffix = numberElement.dataset.suffix || '';
    
    let current = 0;
    const duration = 6000; 
    const steps = 60; 
    const increment = target / steps;
    const stepDuration = duration / steps;
    
    numberElement.classList.add('counting');
    
    const counter = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(counter);
            numberElement.classList.remove('counting');
        }
        
        // Formato del número
        let displayValue;
        if (suffix === '%') {
            displayValue = Math.round(current) + '%';
        } else if (suffix === '/7') {
            displayValue = Math.round(current) + '/7';
        } else {
            displayValue = Math.round(current);
        }
        
        numberElement.textContent = displayValue;
        
        // Efecto de pulso
        if (current < target) {
            numberElement.style.transform = `scale(${1 + Math.sin(current / target * Math.PI) * 0.05})`;
        } else {
            numberElement.style.transform = 'scale(1)';
        }
    }, stepDuration);
}

// ===========================
// FUNCIONES DE NAVEGACIÓN
// ===========================

// Header scroll
function handleHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Mobile menu toggle
function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    
    if (!mobileMenu || !hamburger) return;
    
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
}
window.toggleMenu = toggleMenu; // ✅ global

// Smooth scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===========================
// FUNCIONES DE UI
// ===========================

// Función para toggle de FAQ
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const content = button.nextElementSibling;
    const isActive = button.classList.contains('active');
    
    // Cerrar todos los otros items
    document.querySelectorAll('.faq-header').forEach(header => {
        if (header !== button) {
            header.classList.remove('active');
            const otherContent = header.nextElementSibling;
            otherContent.classList.remove('active');
            otherContent.style.maxHeight = null;
        }
    });
    
    // Toggle del item actual
    if (isActive) {
        button.classList.remove('active');
        content.classList.remove('active');
        content.style.maxHeight = null;
    } else {
        button.classList.add('active');
        content.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 20 + "px";
    }
}

// Hacer la función global para que funcione con onclick
window.toggleFAQ = toggleFAQ;

// Testimonials slider infinito
function setupTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (slider) {
        const slides = slider.innerHTML;
        slider.innerHTML += slides; // duplicar para loop infinito
    }
}

// Cerrar menú móvil al hacer click en links
function setupMobileMenuClose() {
    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', () => {
            const mobileMenu = document.getElementById('mobileMenu');
            const hamburger = document.querySelector('.hamburger');
            
            if (mobileMenu && hamburger) {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
}

// ===========================
// INICIALIZACIÓN
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    // Animaciones generales
    document.querySelectorAll('.service-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        generalObserver.observe(el);
    });
    
    // Contadores
    document.querySelectorAll('.stat-card').forEach(card => {
        card.style.transition = 'all 0.6s ease-out';
        counterObserver.observe(card);
    });

    setupSmoothScrolling();
    setupAccordion();
    setupTestimonialsSlider();
    setupMobileMenuClose();
});

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});
window.addEventListener('scroll', handleHeaderScroll);
<!-- Cal element-click embed code -->

  (function (C, A, L) { 
    let p = function (a, ar) { a.q.push(ar); }; 
    let d = C.document; 
    C.Cal = C.Cal || function () { 
      let cal = C.Cal; 
      let ar = arguments; 
      if (!cal.loaded) { 
        cal.ns = {}; 
        cal.q = cal.q || []; 
        d.head.appendChild(d.createElement("script")).src = A; 
        cal.loaded = true; 
      } 
      if (ar[0] === L) { 
        const api = function () { p(api, arguments); }; 
        const namespace = ar[1]; 
        api.q = api.q || []; 
        if(typeof namespace === "string"){
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ["initNamespace", namespace]);
        } else p(cal, ar); 
        return;
      } 
      p(cal, ar); 
    }; 
  })(window, "https://app.cal.com/embed/embed.js", "init");

  Cal("init", "30min", {origin:"https://app.cal.com"});
  Cal.ns["30min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});

<!-- Cal element-click embed code ends -->


