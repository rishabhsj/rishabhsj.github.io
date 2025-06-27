// Animate fade-in sections on scroll
function fadeInSections() {
  document.querySelectorAll('.fade-in-section').forEach(section => {
    const rect = section.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100) section.classList.add('visible');
  });
}
window.addEventListener('scroll', fadeInSections);
window.addEventListener('DOMContentLoaded', fadeInSections);

// Animate hero elements
document.querySelectorAll('.fade-in-up').forEach((el, i) => {
  setTimeout(() => el.style.opacity = 1, 400 + i * 200);
});

// Testimonials Carousel
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.testimonial-controls .dot');
let testiIndex = 0;
function showTestimonial(i) {
  testimonials.forEach((t,idx) => {
    t.classList.toggle('active', idx === i);
    dots[idx].classList.toggle('active', idx === i);
  });
}
dots.forEach((dot, idx) => {
  dot.addEventListener('click', () => {
    testiIndex = idx;
    showTestimonial(testiIndex);
  });
});
setInterval(() => {
  testiIndex = (testiIndex + 1) % testimonials.length;
  showTestimonial(testiIndex);
}, 4800);

// Contact Form Demo Handler
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const msg = document.getElementById('form-message');
  msg.style.color = 'var(--accent2)';
  msg.textContent = 'Thanks for your message! (Demo only)';
  setTimeout(() => { msg.textContent = ''; }, 3200);
});
