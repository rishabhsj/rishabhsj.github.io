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

// Project data for modals (kept as-is, even if modal is not used right now)
const projectData = {
    user_auth: {
        title: "User Authentication using NLP & ML",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        description: "Built a biometric authentication system using facial and speech recognition with Python, TensorFlow, and OpenCV. Processed 1+ million audio and image records.",
        features: [
            "Facial recognition using OpenCV",
            "Speech recognition with NLP",
            "ML models for authentication",
            "Processing large-scale audio/image data"
        ],
        technologies: ["Python", "TensorFlow", "OpenCV", "+1 more"],
        techStack: {
            "Languages": "Python",
            "Frameworks": "TensorFlow, OpenCV",
            "Tools": "NLP libraries",
            "Impact": "Secure authentication system"
        },
        github: "https://github.com/rishabhsj/User_Authentication_Using_Facial-Speech_Recognition"
    },
    smart_control: {
        title: "Smart Control System in Automobile",
        image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        description: "Developed real-time data pipeline processing sensor telemetry using Python and Raspberry Pi for automated vehicle controls with sub-second latency.",
        features: [
            "Real-time sensor data processing",
            "Automated vehicle controls",
            "Sub-second latency optimization",
            "Raspberry Pi integration"
        ],
        technologies: ["Python", "IOT", "Real-time", "+2 more"],
        techStack: {
            "Languages": "Python",
            "Frameworks": "Raspberry Pi",
            "Tools": "Sensor telemetry",
            "Impact": "Automated systems"
        },
        github: "https://github.com/rishabhsj/Smart-Control-System-in-Automobile"
    },
    online_exam: {
        title: "Online Examination Portal & College Predictor",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        description: "Designed normalised MySQL schemas and built SQL-based analytics for exam results and college prediction using statistical algorithms.",
        features: [
            "Normalized MySQL schemas",
            "SQL-based analytics",
            "Exam results processing",
            "College prediction algorithms"
        ],
        technologies: ["MySQL", "Postgres", "Analytics", "+1 more"],
        techStack: {
            "Databases": "MySQL, Postgres",
            "Tools": "SQL analytics",
            "Impact": "Educational portal"
        },
        github: "https://github.com/rishabhsj/Online-Examination-Portal"
    },
    home_automation: {
        title: "Home Automation and Security System",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        description: "College-sponsored project on home automation system using IOT for controlling the home appliances and various devices using the internet and cloud to advance security in the home.",
        features: [
            "IOT-based appliance control",
            "Cloud integration",
            "Security enhancement",
            "Remote device management"
        ],
        technologies: ["IOT", "Python", "Cloud Computing", "+1 more"],
        techStack: {
            "Languages": "Python",
            "Frameworks": "IOT devices",
            "Tools": "Cloud services",
            "Impact": "Smart home security"
        },
        github: "https://github.com/rishabhsj/Home-Automation-and-Security-System"
    },
    training_app: {
        title: "Training & Placement App",
        image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        description: "Android app for Training and Placement Cell of PCET’s PCCOER involving placement activities and student interactions.",
        features: [
            "Placement activities management",
            "Student interaction tools",
            "Android-based interface",
            "Backend integration with PHP/MySQL"
        ],
        technologies: ["Android Studio", "PHP", "MYSQL", "+1 more"],
        techStack: {
            "Frontend": "Android Studio",
            "Backend": "PHP",
            "Database": "MYSQL",
            "Impact": "Educational app"
        },
        github: "https://github.com/rishabhsj/"
    }
};

// Main initialization - runs when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("Portfolio loaded successfully!");

    initializeLucideIcons();
    initializeTypingAnimation();
    initializeNavigation();
    initializeScrollEffects();
    initializeSkillsAnimation();
    initializeContactForm();
    initializeTheme();
    initializeProjectModals(); // Optional - remove if you don't use modals

    // Initialize Swiper Carousels (this is the critical part!)
    initializeSwipers();
});

// 1. Lucide Icons
function initializeLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
        console.log("Lucide icons initialized");
    } else {
        console.warn("Lucide library not loaded");
    }
}

// 2. Typing Animation
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
    console.log("Typing animation started");
}

// 3. Navigation (scroll spy + mobile menu)
function initializeNavigation() {
    const navigation = document.getElementById('navigation');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY > 100;
        if (scrolled) {
            navigation.classList.add('nav-scrolled');
            navigation.classList.remove('bg-transparent');
        } else {
            navigation.classList.remove('nav-scrolled');
            navigation.classList.add('bg-transparent');
        }
        updateActiveSection();
    });

    console.log("Navigation scroll effects initialized");
}

// Update active nav item
function updateActiveSection() {
    const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
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

// 4. Scroll Animations
function initializeScrollEffects() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => observer.observe(section));
    console.log("Scroll animations initialized");
}

// 5. Skills Progress Bars
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

// 6. Contact Form
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        showToast("Message sent! I'll get back to you soon.");
        form.reset();
    });
}

// 7. Theme Toggle
function initializeTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
        toggleTheme();
    }
}

function toggleTheme() {
    const body = document.body;
    const lightIcon = document.querySelector('.theme-icon-light');
    const darkIcon = document.querySelector('.theme-icon-dark');
    
    isDarkTheme = !isDarkTheme;
    
    if (isDarkTheme) {
        body.classList.remove('light');
        if (lightIcon) lightIcon.classList.add('hidden');
        if (darkIcon) darkIcon.classList.remove('hidden');
        localStorage.setItem('portfolio-theme', 'dark');
    } else {
        body.classList.add('light');
        if (lightIcon) lightIcon.classList.remove('hidden');
        if (darkIcon) darkIcon.classList.add('hidden');
        localStorage.setItem('portfolio-theme', 'light');
    }
}

// 8. Mobile Menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    isMenuOpen = !isMenuOpen;
    
    if (mobileMenu) {
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
        } else {
            mobileMenu.classList.add('hidden');
        }
    }
}

// 9. Utility Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        if (isMenuOpen) toggleMobileMenu();
    }
}

function downloadResume() {
    const link = document.createElement('a');
    link.href = 'Rishabh_Jain_Resume.pdf'; // ← Update this path if needed
    link.download = 'Rishabh_Jain_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Resume downloading...');
}

// 10. Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('toast-show');
        
        setTimeout(() => {
            toast.classList.remove('toast-show');
        }, 3000);
    }
}

// 11. Project Modal (optional - keep if you use it)
function initializeProjectModals() {
    // Comment out or remove if you don't have project modal triggers in HTML
    // const projectCards = document.querySelectorAll('.project-card');
    // projectCards.forEach((card, index) => {
    //     const keys = Object.keys(projectData);
    //     const key = keys[index % keys.length];
    //     card.addEventListener('click', () => openProjectModal(key));
    // });
}

// 12. Critical: Swiper Carousel Initialization
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
            640: {
                slidesPerView: 2,
                spaceBetween: 32
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40
            }
        }
    });

    console.log("Projects Swiper initialized:", projectsSwiper);

    // Testimonials Carousel (optional - add if you have .testimonials-swiper)
    const testimonialsSwiper = new Swiper('.testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 32,
        loop: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });

    console.log("Testimonials Swiper initialized:", testimonialsSwiper);
}

// Global error handler (very useful for debugging)
window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.message, event.filename, event.lineno);
});
