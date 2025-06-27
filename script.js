// ==== Animated SVG/CANVAS background ====
function animateBgMorph() {
  const bg = document.getElementById('bg-morph');
  if (!bg) return;
  let t = 0;
  function render() {
    t += 0.008;
    const w = window.innerWidth, h = window.innerHeight;
    let s = `<svg width="${w}" height="${h}" style="position:fixed;top:0;left:0;z-index:0" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="g1" cx="60%" cy="40%" r="1"><stop stop-color="#00fff0" offset="0"/><stop stop-color="#181c34" offset="1"/></radialGradient></defs>`;
    for (let i = 0; i < 10; ++i) {
      const cx = w/2 + Math.sin(t+i)*w/3, cy = h/2 + Math.cos(t+i*1.2)*h/3, r = 100+60*Math.sin(t+i*1.3);
      s += `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r*0.7}" fill="url(#g1)" fill-opacity="0.13"/>`;
    }
    s += "</svg>";
    bg.innerHTML = s;
    requestAnimationFrame(render);
  }
  render();
}
animateBgMorph();

// ==== Hero canvas hover particles (optional, can remove if unwanted) ====
const heroCanvas = document.getElementById('hero-canvas');
if (heroCanvas) {
  heroCanvas.width = window.innerWidth;
  heroCanvas.height = 320;
  const ctx = heroCanvas.getContext('2d');
  let particles = [];
  for(let i=0;i<19;i++){
    particles.push({x:Math.random()*heroCanvas.width, y:Math.random()*heroCanvas.height, r:6+Math.random()*7, dx:0.5-Math.random(), dy:0.5-Math.random()});
  }
  function drawParticles(){
    ctx.clearRect(0,0,heroCanvas.width,heroCanvas.height);
    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,2*Math.PI);
      ctx.fillStyle='#00fff033'; ctx.fill();
      ctx.strokeStyle='#00fff099'; ctx.stroke();
      p.x += p.dx; p.y += p.dy;
      if (p.x<0||p.x>heroCanvas.width) p.dx*=-1;
      if (p.y<0||p.y>heroCanvas.height) p.dy*=-1;
    }
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

// ==== AI-Generated Hero Intro via Vercel Serverless ====
async function aiHeroIntro() {
  const el = document.getElementById('ai-intro');
  el.innerText = "Crafting your AI intro...";
  try {
    const response = await fetch('/api/ai-intro');
    const data = await response.json();
    el.innerText = data.intro;
  } catch {
    el.innerText = "Hi, I'm Rishabh Jain — MERN stack developer, mentor, and open source advocate!";
  }
}
window.addEventListener('DOMContentLoaded', aiHeroIntro);

// ==== Animated Skill Rings ====
function animateRings() {
  document.querySelectorAll('.ring-skill').forEach(el => {
    if (!el.querySelector('svg')) {
      const pct = +el.dataset.pct || 80;
      const r = 40, c = 2*Math.PI*r, v = c*(100-pct)/100;
      el.innerHTML += `<svg class="ring-svg"><circle cx="45" cy="45" r="40" stroke="#363b5f" stroke-width="9" fill="none"/><circle cx="45" cy="45" r="40" stroke="#00fff0" stroke-width="9" fill="none" stroke-dasharray="${c}" stroke-dashoffset="${c}" stroke-linecap="round"/></svg>` + el.innerHTML;
      setTimeout(()=>{
        el.querySelectorAll('circle')[1].style.transition='stroke-dashoffset 1.3s cubic-bezier(.63,0,.61,1)';
        el.querySelectorAll('circle')[1].setAttribute('stroke-dashoffset', v);
      },200);
    }
  });
}
window.addEventListener('DOMContentLoaded', animateRings);

// ==== Portfolio Filter ====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card=>{
      card.style.display = (filter==='all' || card.dataset.category===filter) ? '' : 'none';
    });
  });
});

// ==== 3D Project Card Tilt ====
document.querySelectorAll('.tilt').forEach(card => {
  card.addEventListener('mousemove', function(e){
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const xc = rect.width/2, yc = rect.height/2;
    const dx = (x-xc)/xc, dy = (y-yc)/yc;
    card.style.transform = `rotateY(${-dx*10}deg) rotateX(${dy*10}deg) scale(1.045)`;
  });
  card.addEventListener('mouseleave', function(){
    card.style.transform = '';
  });
});

// ==== Project Modal Popup ====
const modal = document.getElementById('project-modal');
if (modal) {
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
  document.querySelector('.close-modal').onclick = ()=>{modal.style.display='none';};
  window.onclick = e=>{if(e.target===modal)modal.style.display='none';};
}

// ==== Animated Counters ====
function runCounters() {
  document.querySelectorAll('.counter').forEach(counter=>{
    let target = +counter.dataset.target, val = 0;
    function up() {
      if (val < target) {
        val += Math.max(1,Math.ceil(target/35));
        if (val > target) val = target;
        counter.textContent = val;
        setTimeout(up, 28);
      } else {
        counter.textContent = target;
      }
    }
    up();
  });
}
window.addEventListener('DOMContentLoaded', runCounters);

// ==== Testimonials Carousel ====
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.testimonial-controls .dot');
let testiIndex = 0;
function showTestimonial(i) {
  testimonials.forEach((t,idx)=>{
    t.classList.toggle('active',idx===i);
    dots[idx].classList.toggle('active',idx===i);
  });
}
dots.forEach((dot,idx)=>{
  dot.addEventListener('click',()=>{
    testiIndex=idx;
    showTestimonial(testiIndex);
  });
});
setInterval(()=>{testiIndex=(testiIndex+1)%testimonials.length;showTestimonial(testiIndex);},4800);

// ==== Scroll to Top ====
const toTopBtn = document.getElementById('to-top-btn');
window.addEventListener('scroll',()=>{
  toTopBtn.style.display = window.scrollY>300 ? 'block':'none';
});
toTopBtn.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});

// ==== Section Reveal Animation ====
function revealSections() {
  document.querySelectorAll('.section, .hero-section').forEach(sec=>{
    const rect = sec.getBoundingClientRect();
    if(rect.top<window.innerHeight-80)sec.classList.add('reveal');
  });
}
window.addEventListener('scroll',revealSections);
window.addEventListener('DOMContentLoaded',revealSections);

// ==== Dark/Light Mode Toggle ====
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click',function(){
  document.body.classList.toggle('light');
  if(document.body.classList.contains('light')){
    document.documentElement.style.setProperty('--main-bg','#f6f8fc');
    document.documentElement.style.setProperty('--text','#181c34');
    document.documentElement.style.setProperty('--glass-bg','rgba(255,255,255,0.84)');
    themeToggle.innerHTML='<i class="fas fa-sun"></i>';
  } else {
    document.documentElement.style.setProperty('--main-bg','#181c34');
    document.documentElement.style.setProperty('--text','#e8f0fa');
    document.documentElement.style.setProperty('--glass-bg','rgba(30,34,69,0.84)');
    themeToggle.innerHTML='<i class="fas fa-moon"></i>';
  }
  localStorage.setItem('theme',document.body.classList.contains('light')?'light':'dark');
});
window.addEventListener('DOMContentLoaded',()=>{
  let saved=localStorage.getItem('theme');
  if(saved==='light'){
    document.body.classList.add('light');
    themeToggle.innerHTML='<i class="fas fa-sun"></i>';
    document.documentElement.style.setProperty('--main-bg','#f6f8fc');
    document.documentElement.style.setProperty('--text','#181c34');
    document.documentElement.style.setProperty('--glass-bg','rgba(255,255,255,0.84)');
  }
});

// ==== Contact Form Demo Handler ====
document.querySelector('.contact-form').addEventListener('submit',function(e){
  e.preventDefault();
  const msg = document.getElementById('form-message');
  msg.style.color = 'var(--accent2)';
  msg.textContent = 'Thanks for your message! (Demo only)';
  setTimeout(()=>{msg.textContent='';},3200);
});
