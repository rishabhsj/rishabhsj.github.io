// Portfolio JavaScript functionality

// Global variables
let isMenuOpen = false;
let isDarkTheme = true;
let currentTypingIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let activeSection = 'home';

// Typing animation texts
const typingTexts = [
    "Software Engineer | MERN Stack Developer",
    "Open Source Enthusiast | GSSoC'23",
    "Coding Mentor | Building Scalable Products"
];

// Project data for modals
const projectData = {
    taskify: {
        title: "Taskify",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        description: "Taskify is a comprehensive Kanban-style productivity application built with the MERN stack. It features real-time collaboration capabilities, intuitive drag-and-drop functionality, and comprehensive notification systems to keep teams synchronized and productive.",
        features: [
            "Real-time collaboration with Socket.io",
            "Drag-and-drop Kanban board interface",
            "User authentication and authorization",
            "Push notifications for task updates",
            "File attachments and comments",
            "Team management and invitations"
        ],
        technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Redux"],
        techStack: {
            "Frontend": "React.js, Redux, Tailwind CSS",
            "Backend": "Node.js, Express.js, Socket.io",
            "Database": "MongoDB, Mongoose",
            "Deployment": "Heroku, Netlify"
        },
        github: "https://github.com/rishabhsj/taskify"
    },
    gssoc: {
        title: "GSSoC'23 Contributions",
        image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        description: "During GirlScript Summer of Code 2023, I actively contributed to multiple open source projects while mentoring new contributors. This experience involved developing scalable backend APIs, writing modular code, and fostering an inclusive community environment.",
        features: [
            "Mentored 50+ new contributors during GSSoC 2023",
            "Contributed to 15+ open source projects",
            "Reviewed 200+ pull requests",
            "Conducted weekly office hours for contributor support",
            "Developed scalable backend APIs for multiple projects",
            "Improved documentation and onboarding processes"
        ],
        technologies: ["Open Source", "Mentoring", "APIs", "JavaScript", "Python"],
        techStack: {
            "Languages": "JavaScript, Python, TypeScript",
            "Frameworks": "React, Node.js, Express",
            "Tools": "Git, GitHub, CI/CD",
            "Impact": "150+ PRs merged, 10,000+ lines of code"
        },
        github: "https://github.com/rishabhsj"
    },
    mentorship: {
        title: "Mentorship Platform",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        description: "A comprehensive web platform designed to connect mentors and mentees in the tech industry. The platform facilitates meaningful mentorship relationships through intelligent matching, integrated communication tools, and progress tracking capabilities.",
        features: [
            "Mentor-mentee matching algorithm",
            "Integrated video calling and chat system",
            "Learning path creation and tracking",
            "Progress monitoring and analytics",
            "Resource sharing and homework assignments",
            "Community forums and group discussions"
        ],
        technologies: ["React", "Express", "MongoDB", "Socket.io"],
        techStack: {
            "Frontend": "React.js, Material-UI, WebRTC",
            "Backend": "Express.js, Socket.io",
            "Database": "MongoDB with aggregation pipelines",
            "Analytics": "Custom dashboard with charts"
        },
        github: "https://github.com/rishabhsj/mentorship-platform"
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeLucideIcons();
    initializeTypingAnimation();
    initializeNavigation();
    initializeScrollEffects();
    initializeSkillsAnimation();
    initializeContactForm();
    initializeTheme();
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
    
    // Observe sections for animations
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
    
    // In a real application, you would send this data to a server
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
    // In a real application, this would download an actual resume file
    showToast('Resume download feature coming soon!');
    console.log('Resume download requested');
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

// Project filtering
function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Update active filter button
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        btn.classList.add('border', 'border-gray-600', 'text-gray-300');
        btn.classList.remove('bg-blue-600', 'text-white');
    });
    
    event.target.classList.add('active');
    event.target.classList.remove('border', 'border-gray-600', 'text-gray-300');
    event.target.classList.add('bg-blue-600', 'text-white');
    
    // Filter projects
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.classList.add('animate-fade-in-up');
        } else {
            card.style.display = 'none';
        }
    });
}

// Project modal functionality
function openProjectModal(projectKey) {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    const project = projectData[projectKey];
    if (!project) return;
    
    modalTitle.textContent = project.title;
    
    modalContent.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="w-full rounded-lg shadow-lg mb-6">
        
        <div class="mb-6">
            <h4 class="text-lg font-semibold mb-3">About This Project</h4>
            <p class="text-gray-300 leading-relaxed">${project.description}</p>
        </div>
        
        <div class="mb-6">
            <h4 class="text-lg font-semibold mb-3">Key Features</h4>
            <ul class="space-y-2">
                ${project.features.map(feature => `
                    <li class="text-gray-300 flex items-start">
                        <span class="text-blue-400 mr-2">•</span>
                        ${feature}
                    </li>
                `).join('')}
            </ul>
        </div>
        
        <div class="mb-6">
            <h4 class="text-lg font-semibold mb-3">Technologies Used</h4>
            <div class="flex flex-wrap gap-2 mb-4">
                ${project.technologies.map(tech => `
                    <span class="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm">${tech}</span>
                `).join('')}
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${Object.entries(project.techStack).map(([category, tech]) => `
                    <div>
                        <strong class="text-white">${category}:</strong>
                        <p class="text-gray-300 text-sm">${tech}</p>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="flex gap-4 pt-4">
            <a href="${project.github}" target="_blank" rel="noopener noreferrer" 
               class="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-all">
                <i data-lucide="github" class="h-4 w-4"></i>
                View Code
            </a>
        </div>
    `;
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modal.querySelector('.bg-gray-800').classList.add('modal-enter');
    
    // Reinitialize icons for the modal content
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    const modalCard = modal.querySelector('.bg-gray-800');
    
    modalCard.classList.remove('modal-enter');
    modalCard.classList.add('modal-leave');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        modalCard.classList.remove('modal-leave');
    }, 300);
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

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(function() {
    updateActiveSection();
}, 100));
