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
  const navLinks = document.querySelectorAll('nav a');
  let current = '';
  sections.forEach(sec => {
    const sectionTop = sec.offsetTop - 120;
    if (pageYOffset >= sectionTop) current = sec.getAttribute('id');
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

// Fake contact form submit animation
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const msg = document.getElementById('form-message');
  msg.style.color = 'var(--primary)';
  msg.textContent = 'Thanks for your message! (Demo only)';
  setTimeout(() => { msg.textContent = ''; }, 3200);
});

// Fade-in effect for hero section
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = 1;
  });
});