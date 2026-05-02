// ===== Countdown Timer =====
const weddingDate = new Date('2026-06-06T14:30:00');

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    document.getElementById('countdown').style.display = 'none';
    document.getElementById('dday').textContent = '오늘이 결혼식 날입니다 🎉';
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('days').textContent    = String(days).padStart(2, '0');
  document.getElementById('hours').textContent   = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

  const dday = Math.ceil((weddingDate - new Date(new Date().toDateString())) / (1000 * 60 * 60 * 24));
  document.getElementById('dday').textContent = `D - ${dday}`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== Scroll Fade-in =====
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

sections.forEach(sec => observer.observe(sec));

// ===== Gallery Lightbox =====
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// ===== Copy Account Number =====
function copyText(text, el) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
  showToast();
}

function showToast() {
  const toast = document.getElementById('copy-toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}
