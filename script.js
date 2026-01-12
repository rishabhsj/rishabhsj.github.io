// Portfolio JavaScript functionality

// Global variables
let isMenuOpen = false;
let isDarkTheme = true;
let currentTypingIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let activeSection = 'home';

// Typing animation texts (updated from new HTML)
const typingTexts = [
    "Data Engineer",
    "MSc Artificial Intelligence & Robotics",
    "Coding Enthusiast | Building Scalable Pipelines"
];

// Project data for modals (updated with new projects from HTML)
const projectData = {
    user_auth: {
        title: "User Authentication using NLP & ML",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        description: "Built biometric authentication system using facial and speech recognition with Python, TensorFlow, and OpenCV. Processed 1+ million audio and image records.",
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
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", // Placeholder, as URL invalid
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
        image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", // Placeholder, as URL invalid
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
	console.log("Portfolio loaded successfully!");
    initializeLucideIcons();
    initializeTypingAnimation();
    initializeNavigation();
    initializeScrollEffects();
    initializeSkillsAnimation();
    initializeContactForm();
    initializeTheme();
    initializeProjectModals(); // New: Add listeners for project cards
	initializeSwipers();
});

// Initialize Lucide icons
function initializeLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Typing animation
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

// Navigation functionality
function initializeNavigation() {
    const navigation = document.getElementById('navigation');
    
    // Handle scroll events for navigation
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
}

// Update active section in navigation
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

// Scroll effects and animations
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe sections for animations (including new testimonials)
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));
}

// Skills animation
function initializeSkillsAnimation() {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
            }
        });
    }, { threshold: 0.5 });
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
}

function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        const skillLevel = item.getAttribute('data-skill');
        const progressBar = item.querySelector('.skill-progress');
        
        if (progressBar) {
            setTimeout(() => {
                progressBar.style.width = `${skillLevel}%`;
            }, index * 200);
        }
    });
}

// Contact form handling
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmission();
        });
    }
}

function handleContactFormSubmission() {
    const formData = new FormData(document.getElementById('contact-form'));
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    showToast('Message sent successfully! I\'ll get back to you soon.');
    
    // Reset form
    document.getElementById('contact-form').reset();
    
    // In a real application, you would send this data to a server (e.g., via fetch to Formspree or Netlify Forms)
    console.log('Contact form data:', data);
}

// Theme management
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
        lightIcon.classList.add('hidden');
        darkIcon.classList.remove('hidden');
        localStorage.setItem('portfolio-theme', 'dark');
    } else {
        body.classList.add('light');
        lightIcon.classList.remove('hidden');
        darkIcon.classList.add('hidden');
        localStorage.setItem('portfolio-theme', 'light');
    }
}

// Utility functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        
        // Close mobile menu if open
        if (isMenuOpen) {
            toggleMobileMenu();
        }
    }
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
    }
}

function downloadResume() {
    // Download the PDF (assuming it's in the root or provide full path)
    const link = document.createElement('a');
    link.href = 'Rishabh_Jain_Resume.pdf'; // Update with actual filename/path if needed
    link.download = 'Rishabh_Jain_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Resume downloading...');
    console.log('Resume download initiated');
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(`Copied: ${text}`);
        }).catch(() => {
            showToast('Failed to copy to clipboard');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showToast(`Copied: ${text}`);
        } catch (err) {
            showToast('Failed to copy to clipboard');
        }
        document.body.removeChild(textArea);
    }
}

// Project modal functionality (updated for new projects)
function initializeProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        const keys = Object.keys(projectData); // Get keys from projectData
        const key = keys[index % keys.length]; // Cycle through keys if needed, or map properly
        card.addEventListener('click', () => openProjectModal(key));
    });
}

// Toast notifications
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    toastMessage.textContent = message;
    toast.classList.add('toast-show');
    
    setTimeout(() => {
        toast.classList.remove('toast-show');
    }, 3000);
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('project-modal');
    if (e.target === modal) {
        closeProjectModal();
    }
});

// Handle keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        const modal = document.getElementById('project-modal');
        if (!modal.classList.contains('hidden')) {
            closeProjectModal();
        }
        
        // Close mobile menu if open
        if (isMenuOpen) {
            toggleMobileMenu();
        }
    }
    
    // Theme toggle with Ctrl/Cmd + Shift + T
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        toggleTheme();
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu on window resize
    if (isMenuOpen && window.innerWidth >= 768) {
        toggleMobileMenu();
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
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
