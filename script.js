
// Global variables
let isMenuOpen = false;
let isDarkTheme = true;
let currentTypingIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let activeSection = 'home';

// Typing animation texts
const typingTexts = [
    "Data Engineer",
    "MSc Artificial Intelligence & Robotics",
    "Coding Enthusiast | Building Scalable Pipelines"
];

// Project data for modals (kept for future use)
const projectData = {
    user_auth: {
        title: "User Authentication using NLP & ML",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        description: "Built biometric authentication system using facial and speech recognition with Python, TensorFlow, and OpenCV.",
        features: ["Facial recognition", "Speech recognition with NLP", "ML models", "Large-scale data processing"],
        technologies: ["Python", "TensorFlow", "OpenCV"],
        github: "https://github.com/rishabhsj/User_Authentication_Using_Facial-Speech_Recognition"
    },
};

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log("Portfolio initialized!");

    initializeLucideIcons();
    initializeTypingAnimation();
    initializeNavigation();
    initializeScrollEffects();
    initializeSkillsAnimation();
    initializeContactForm();
    initializeTheme();
    initializeProjectModals();

    // Initialize Swiper carousels
    initializeSwipers();
});

// ── 1. Lucide Icons ──────────────────────────────────────────────────────────
function initializeLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// ── 2. Typing Animation ──────────────────────────────────────────────────────
function initializeTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    function typeText() {
        const currentText = typingTexts[currentTypingIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentTypingIndex = (currentTypingIndex + 1) % typingTexts.length;
            }
        } else {
            typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            if (currentCharIndex === currentText.length) {
                setTimeout(() => isDeleting = true, 2000);
            }
        }
        
        setTimeout(typeText, isDeleting ? 50 : 100);
    }
    
    typeText();
}

// ── 3. Navigation & Scroll Spy ───────────────────────────────────────────────
function initializeNavigation() {
    const navigation = document.getElementById('navigation');
    
    window.addEventListener('scroll', function() {
        if (navigation) {
            const scrolled = window.scrollY > 100;
            navigation.classList.toggle('nav-scrolled', scrolled);
            navigation.classList.toggle('bg-transparent', !scrolled);
        }
        updateActiveSection();
    });
}

function updateActiveSection() {
    const sections = ['home', 'about', 'experience', 'skills', 'projects', 'testimonials', 'contact'];
    const navItems = document.querySelectorAll('.nav-item');
    
    for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                if (activeSection !== section) {
                    activeSection = section;
                    navItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('data-section') === section) {
                            item.classList.add('active');
                        }
                    });
                }
                break;
            }
        }
    }
}

// ── 4. Scroll Animations ─────────────────────────────────────────────────────
function initializeScrollEffects() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => observer.observe(section));
}

// ── 5. Skills Progress Bars ──────────────────────────────────────────────────
function initializeSkillsAnimation() {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) skillsObserver.observe(skillsSection);
}

function animateSkillBars() {
    document.querySelectorAll('.skill-item').forEach((item, index) => {
        const skillLevel = item.getAttribute('data-skill') || 90;
        const progressBar = item.querySelector('.skill-progress');
        if (progressBar) {
            setTimeout(() => {
                progressBar.style.width = `${skillLevel}%`;
            }, index * 200 + 300);
        }
    });
}

// ── 6. Contact Form (Formspree) ──────────────────────────────────────────────
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = document.getElementById('submit-btn');
        const successMsg = document.getElementById('form-success');
        const errorMsg = document.getElementById('form-error');

        if (!submitBtn) return;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i data-lucide="loader-2" class="h-5 w-5 animate-spin"></i> Sending...';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                successMsg?.classList.remove('hidden');
                errorMsg?.classList.add('hidden');
                form.reset();
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            errorMsg?.classList.remove('hidden');
            successMsg?.classList.add('hidden');
            console.error('Contact form error:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i data-lucide="send" class="h-5 w-5"></i> Send Message';
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }
    });
}

// ── 7. Theme Toggle ──────────────────────────────────────────────────────────
function initializeTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') toggleTheme();
}

function toggleTheme() {
    const body = document.body;
    const lightIcon = document.querySelector('.theme-icon-light');
    const darkIcon = document.querySelector('.theme-icon-dark');
    
    isDarkTheme = !isDarkTheme;
    
    body.classList.toggle('light', !isDarkTheme);
    
    if (lightIcon && darkIcon) {
        lightIcon.classList.toggle('hidden', isDarkTheme);
        darkIcon.classList.toggle('hidden', !isDarkTheme);
    }
    
    localStorage.setItem('portfolio-theme', isDarkTheme ? 'dark' : 'light');
}

// ── 8. Mobile Menu ───────────────────────────────────────────────────────────
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    isMenuOpen = !isMenuOpen;
    
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden', !isMenuOpen);
    }
}

// ── 9. Utility Functions ─────────────────────────────────────────────────────
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        if (isMenuOpen) toggleMobileMenu();
    }
}

// ✅ FIXED: Resume Download Function
function downloadResume() {
    const link = document.createElement('a');
    link.href = 'Rishabh_Jain.pdf';  // Your actual PDF filename
    link.download = 'Rishabh_Jain_Resume.pdf';  // Name for downloaded file
    link.target = '_blank';  // Opens in new tab as fallback if download fails
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Resume downloading...');
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('toast-show');
        setTimeout(() => toast.classList.remove('toast-show'), 3000);
    }
}

// ── 10. Project Modal (optional) ─────────────────────────────────────────────
function initializeProjectModals() {
    // Uncomment and use only if you have project modal triggers in HTML
    // const cards = document.querySelectorAll('.project-card');
    // cards.forEach((card, i) => {
    //     const key = Object.keys(projectData)[i];
    //     if (key) card.addEventListener('click', () => openProjectModal(key));
    // });
}

// ── 11. Swiper Carousels (IMPORTANT) ─────────────────────────────────────────
function initializeSwipers() {
    // Projects Carousel
    const projectsSwiper = new Swiper('.projects-swiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        grabCursor: true,
        speed: 800,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: { slidesPerView: 2, spaceBetween: 32 },
            1024: { slidesPerView: 3, spaceBetween: 40 }
        }
    });

    console.log("Projects Swiper initialized:", !!projectsSwiper);

    // Testimonials Carousel
    const testimonialsSwiper = new Swiper('.testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 32,
        loop: true,
        grabCursor: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.testimonials-swiper .swiper-button-next',
            prevEl: '.testimonials-swiper .swiper-button-prev',
        },
        pagination: {
            el: '.testimonials-swiper .swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });

    console.log("Testimonials Swiper initialized:", !!testimonialsSwiper);
}

// Global error handler (great for debugging)
window.addEventListener('error', (event) => {
    console.error('Global error:', event.message, event.filename, event.lineno);
});
