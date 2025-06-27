// --- Animated fade-in sections ---
function fadeInSections() {
  document.querySelectorAll('.fade-in-section').forEach(section => {
    const rect = section.getBoundingClientRect();
    if(rect.top < window.innerHeight - 80) section.classList.add('visible');
  });
}
window.addEventListener('scroll', fadeInSections);
window.addEventListener('DOMContentLoaded', fadeInSections);

// --- Animated counters ---
function animateCounters() {
  document.querySelectorAll('.counter').forEach(counter => {
    let count = 0;
    const target = +counter.dataset.count;
    function update() {
      if (count < target) {
        count += Math.ceil(target / 70);
        if (count > target) count = target;
        counter.innerText = count;
        setTimeout(update, 26);
      } else {
        counter.innerText = target;
      }
    }
    update();
  });
}
window.addEventListener('DOMContentLoaded', animateCounters);

// --- Particles.js background ---
particlesJS("particles-js", {
  particles: {
    number: { value: 52, density: { enable: true, value_area: 900 } },
    color: { value: ["#00ffe1", "#ff3b8d", "#2e2e38"] },
    shape: { type: "circle" },
    opacity: { value: 0.19, random: true },
    size: { value: 4, random: true },
    move: { enable: true, speed: 1.2 }
  },
  interactivity: {
    events: { onhover: { enable: true, mode: "repulse" } }
  }
});

// --- Skills radar chart ---
window.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('skills-radar');
  if (ctx) {
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: [
          'JavaScript','TypeScript','React','Node','MongoDB','Mentoring','Open Source'
        ],
        datasets: [{
          label: 'Skill Level',
          data: [95, 88, 92, 90, 89, 85, 83],
          backgroundColor: 'rgba(0,255,225,0.13)',
          borderColor: '#00ffe1',
          pointBackgroundColor: '#ff3b8d',
          borderWidth: 2,
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false }},
        scales: {
          r: {
            angleLines: { color: "#24243b" },
            grid: { color: "#232334" },
            pointLabels: { color: "#b0b3be", font: { size: 13 } },
            min: 0, max: 100, ticks: { display: false }
          }
        }
      }
    });
  }
});

// --- Project 3D tilt effect ---
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', function(e){
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const xc = rect.width/2, yc = rect.height/2;
    const dx = (x-xc)/xc, dy = (y-yc)/yc;
    card.style.transform = `rotateY(${-dx*7}deg) rotateX(${dy*7}deg) scale(1.05)`;
  });
  card.addEventListener('mouseleave', function(){
    card.style.transform = '';
  });
});

// --- Contact Form Demo Handler ---
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const msg = document.getElementById('form-message');
  msg.style.color = 'var(--accent2)';
  msg.textContent = 'Thanks for your message! (Demo only)';
  setTimeout(() => { msg.textContent = ''; }, 3200);
});
