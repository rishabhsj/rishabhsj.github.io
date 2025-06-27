// Smooth scroll for nav links and scroll-down
document.querySelectorAll('.nav-link, .scroll-down').forEach(link => {
  link.addEventListener('click', function(e) {
    const hash = this.getAttribute('href');
    if (hash && hash.startsWith('#')) {
      e.preventDefault();
      document.querySelector(hash).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Navbar active link highlight on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('main section');
  const navLinks = document.querySelectorAll('nav a.nav-link');
  let current = '';
  sections.forEach(sec => {
    const sectionTop = sec.offsetTop - 120;
    if (window.pageYOffset >= sectionTop) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// Animate skill bars on scroll into view
function animateSkills() {
  const skills = document.querySelectorAll('.progress');
  skills.forEach(bar => {
    bar.style.width = 0;
    setTimeout(() => {
      bar.style.width = bar.getAttribute('style').replace('width:', '').trim();
    }, 400);
  });
}
let skillsAnimated = false;
window.addEventListener('scroll', () => {
  const skillsSection = document.getElementById('skills');
  if (!skillsAnimated && skillsSection.getBoundingClientRect().top < window.innerHeight - 100) {
    animateSkills();
    skillsAnimated = true;
  }
});

// Fake contact form submit with feedback
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const msg = document.getElementById('form-message');
  msg.style.color = 'var(--primary)';
  msg.textContent = 'Thanks for your message! (Demo only)';
  setTimeout(() => { msg.textContent = ''; }, 3200);
});

// Fade-in animation for hero and sections on scroll
function revealSections() {
  document.querySelectorAll('.reveal').forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      sec.classList.add('reveal');
    }
  });
}
window.addEventListener('scroll', revealSections);
window.addEventListener('DOMContentLoaded', revealSections);

// Typing effect in hero section
const typeStrings = [
  "Hi, I'm <span class='highlight'>Rishabh Jain</span>",
  "Web Developer",
  "Open Source Contributor",
  "UI/UX Enthusiast"
];
let typeIndex = 0, charIndex = 0, typing = true;
function typeEffect() {
  const typed = document.getElementById('typed');
  if (!typed) return;
  if (typing) {
    if (charIndex < typeStrings[typeIndex].length) {
      typed.innerHTML = typeStrings[typeIndex].substring(0, charIndex + 1);
      charIndex++;
      setTimeout(typeEffect, 55);
    } else {
      typing = false;
      setTimeout(typeEffect, 1200);
    }
  } else {
    if (charIndex > 0) {
      typed.innerHTML = typeStrings[typeIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeEffect, 25);
    } else {
      typing = true;
      typeIndex = (typeIndex + 1) % typeStrings.length;
      setTimeout(typeEffect, 500);
    }
  }
}
window.addEventListener('DOMContentLoaded', typeEffect);

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', function() {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  themeToggle.innerHTML = document.body.classList.contains('dark')
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
});
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
});

// Project modal popup
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalLink = document.getElementById('modal-link');
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;
    modalLink.href = card.dataset.link;
    modal.style.display = 'flex';
  });
});
document.querySelector('.close-modal').onclick = () => { modal.style.display = 'none'; };
window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };

// Scroll-to-top button
const toTopBtn = document.getElementById('to-top-btn');
window.addEventListener('scroll', () => {
  toTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});
toTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
