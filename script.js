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

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // 1. Determine current language
  const isArabicPage = window.location.pathname.includes('-ar.html');
  const currentLang = isArabicPage ? 'ar' : 'en';
  
  // 2. Set document attributes
  document.documentElement.lang = currentLang;
  document.body.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  
  // 3. Set active button (critical fix)
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
  
  // 4. Set localStorage (optional but recommended)
  try {
    localStorage.setItem('diorans-lang', currentLang);
  } catch (e) {
    console.log("LocalStorage not available");
  }
});

// Language switch function
function switchLanguage(lang) {
  localStorage.setItem('diorans-lang', lang);
  window.location.href = lang === 'ar' ? 'diorans-ar.html' : 'index.html';
}
