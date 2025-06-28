// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonials slider
    const testimonialsContainer = document.getElementById('testimonialsContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.testimonial').length;

    function showSlide(index) {
        if (index < 0) {
            currentSlide = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }
        
        testimonialsContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

    // Auto slide every 5 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // Counter animation for stats
    function animateCounter(element, target) {
        let current = 0;
        const increment = Math.ceil(target / 50);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = current;
        }, 30);
    }

    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(document.getElementById('yearsCounter'), 5);
                animateCounter(document.getElementById('projectsCounter'), 15);
                animateCounter(document.getElementById('clientsCounter'), 30);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('.stats'));

    // Form submission (demo)
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! This is a demo form. In a real implementation, your message would be sent to our team.');
        this.reset();
    });

    document.getElementById('newsletterForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter! This is a demo form.');
        this.reset();
    });
});

document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', function(e) {
        e.preventDefault();
        const lang = this.getAttribute('data-lang');
        
        // Update active state
        document.querySelectorAll('.language-option').forEach(opt => {
            opt.classList.remove('active');
        });
        this.classList.add('active');
        
        // Set language and direction
        document.documentElement.lang = lang;
        document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Save preference
        localStorage.setItem('preferredLang', lang);
        
        // Load the appropriate page
        if (lang === 'ar') {
            window.location.href = 'diorans-ar.html';
        } else {
            window.location.href = 'diorans.html';
        }
    });
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang) {
        document.documentElement.lang = savedLang;
        document.body.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
        
        // Update active button
        document.querySelectorAll('.language-option').forEach(opt => {
            opt.classList.toggle('active', opt.getAttribute('data-lang') === savedLang);
        });
    }
});