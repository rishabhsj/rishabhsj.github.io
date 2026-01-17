
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
    "Coding Mentor | Building Scalable Products"
];

// Project data (kept as-is)
const projectData = {
    // Your full project data object here (omitted for brevity)
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
    
    // New Features
    initParticlesBackground();   // 5
    init3DTiltCards();           // 6
    initTerminalAbout();         // 9
    initKonamiEasterEgg();       // 10
    initParallaxTimeline();      // 2
    initSkillsOrbit();           // 1

    initializeSwipers();         // Existing carousels
});

// ── Lucide Icons ────────────────────────────────
function initializeLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// ── Typing Animation ────────────────────────────
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

// ── Navigation ──────────────────────────────────
function initializeNavigation() {
    const navigation = document.getElementById('navigation');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY > 100;
        navigation.classList.toggle('nav-scrolled', scrolled);
        navigation.classList.toggle('bg-transparent', !scrolled);
        updateActiveSection();
    });
}

function updateActiveSection() {
    // Your existing code
}

// ── Scroll Effects ──────────────────────────────
function initializeScrollEffects() {
    // Your existing code
}

// ── Skills Animation ────────────────────────────
function initializeSkillsAnimation() {
    // Your existing code
}

function animateSkillBars() {
    // Your existing code
}

// ── Contact Form ────────────────────────────────
function initializeContactForm() {
    // Your existing code
}

// ── Theme ───────────────────────────────────────
function initializeTheme() {
    // Your existing code
}

function toggleTheme() {
    // Your existing code
}

// ── Mobile Menu ─────────────────────────────────
function toggleMobileMenu() {
    // Your existing code
}

// ── Scroll to Section ───────────────────────────
function scrollToSection(sectionId) {
    // Your existing code
}

// ── Resume Download ─────────────────────────────
function downloadResume() {
    // Your existing code
}

// ── Toast ───────────────────────────────────────
function showToast(message) {
    // Your existing code
}

// ── Project Modals ──────────────────────────────
function initializeProjectModals() {
    // Your existing code
}

// ── Swipers ─────────────────────────────────────
function initializeSwipers() {
    // Your existing code
}

// ── New Feature 1: 3D Orbit Skills ─────────────
function initSkillsOrbit() {
    const container = document.getElementById('skills-orbit');
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111827);

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Tech stack items
    const technologies = [
        "Databricks", "PySpark", "Delta Lake", "AWS", "SQL", "Python",
        "CI/CD", "Docker", "Tableau", "Power BI"
    ];

    const group = new THREE.Group();
    scene.add(group);

    technologies.forEach((tech, i) => {
        const geometry = new THREE.SphereGeometry(1.2, 32, 32);
        const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(`hsl(${i * 36}, 80%, 60%)`),
            emissive: new THREE.Color(`hsl(${i * 36}, 80%, 40%)`),
            emissiveIntensity: 0.5,
            metalness: 0.9,
            roughness: 0.1
        });
        const sphere = new THREE.Mesh(geometry, material);

        const angle = (i / technologies.length) * Math.PI * 2;
        const radius = 15;
        sphere.position.set(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            Math.sin(angle * 0.5) * 5
        );

        const textSprite = makeTextSprite(tech, {
            fontsize: 90,
            fontface: "Inter",
            borderColor: { r: 255, g: 255, b: 255, a: 0.8 },
            backgroundColor: { r: 0, g: 0, b: 0, a: 0.6 }
        });
        textSprite.position.copy(sphere.position);
        textSprite.position.y += 2.5;

        group.add(sphere);
        group.add(textSprite);
    });

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const pointLight = new THREE.PointLight(0xffffff, 1.2);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        group.rotation.y += 0.002;
        renderer.render(scene, camera);
    }
    animate();

    // Resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

function makeTextSprite(message, parameters) {
    // Your existing code
}

// ── New Feature 2: Parallax Timeline ───────────
function initParallaxTimeline() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".timeline-item").forEach((item, i) => {
        gsap.from(item, {
            yPercent: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Parallax background layers (if you added .parallax-layer)
    gsap.utils.toArray(".parallax-layer").forEach(layer => {
        gsap.to(layer, {
            yPercent: -30,
            ease: "none",
            scrollTrigger: {
                trigger: ".timeline-container",
                scrub: true
            }
        });
    });
}

// ── New Feature 5: Particles ────────────────────
function initParticlesBackground() {
    tsParticles.load("tsparticles", {
        fpsLimit: 60,
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#3b82f6" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#8b5cf6",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 200, line_linked: { opacity: 0.7 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true,
        background: { color: "#00000000" }
    });
}

// ── New Feature 6: 3D Tilt ──────────────────────
function init3DTiltCards() {
    VanillaTilt.init(document.querySelectorAll(".tilt-element"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.5
    });
}

// ── New Feature 9: Terminal About ───────────────
function initTerminalAbout() {
    const content = document.getElementById('terminal-content');
    if (!content) return;

    const lines = [
        "$ whoami",
        "Rishabh Jain - Data Engineer Extraordinaire",
        "",
        "$ cat expertise.txt",
        "Databricks Certified | PySpark Master | Delta Lake Architect",
        "AWS Cloud Native | CI/CD Pipeline Specialist",
        "SQL Optimization Expert | Big Data Handler",
        "",
        "$ cat location.txt",
        "London, United Kingdom",
        "",
        "$ cat mission.txt",
        "Crafting scalable data solutions that power tomorrow's innovations",
        "",
        "$ echo 'Ready to connect? Scroll down!'"
    ];

    let index = 0;
    function typeNextLine() {
        if (index >= lines.length) return;

        const p = document.createElement('p');
        p.className = 'mb-1';
        content.appendChild(p);

        let char = 0;
        const timer = setInterval(() => {
            if (char < lines[index].length) {
                p.textContent += lines[index][char++];
            } else {
                clearInterval(timer);
                index++;
                setTimeout(typeNextLine, 600);
            }
        }, 50);
    }

    typeNextLine();
}

// ── New Feature 10: Konami Egg ──────────────────
function initKonamiEasterEgg() {
    const canvas = document.getElementById('konami-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let konamiIndex = 0;
    const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'];

    document.addEventListener('keydown', e => {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                startKonamiGame();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function startKonamiGame() {
        canvas.classList.remove('hidden');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 8 + 4,
                speedX: Math.random() * 6 - 3,
                speedY: Math.random() * 6 - 3,
                color: `hsl(${Math.random()*360}, 100%, 60%)`
            });
        }

        function animate() {
            ctx.fillStyle = 'rgba(0,0,0,0.05)';
            ctx.fillRect(0,0,canvas.width,canvas.height);

            particles.forEach(p => {
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
                ctx.fill();

                p.x += p.speedX;
                p.y += p.speedY;

                if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
                if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            });

            requestAnimationFrame(animate);
        }

        animate();

        setTimeout(() => canvas.classList.add('hidden'), 10000);
    }
}

// ── Global Error Handler ────────────────────────
window.addEventListener('error', (event) => {
    console.error('Error:', event.message, 'in', event.filename, 'line', event.lineno);
});
