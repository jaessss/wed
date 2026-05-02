// ===== Countdown Timer =====
const weddingDate = new Date('2026-11-14T11:30:00');

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

  const today = new Date(new Date().toDateString());
  const weddingDay = new Date(weddingDate.toDateString());
  const dday = Math.ceil((weddingDay - today) / (1000 * 60 * 60 * 24));
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
}, { threshold: 0.1 });

sections.forEach(sec => observer.observe(sec));

// ===== Gallery Lightbox =====
const photos = [
  'images/IMG_8058.jpeg',
  'images/IMG_8116.jpeg',
  'images/IMG_8121.jpeg',
  'images/IMG_8135.jpeg',
  'images/IMG_8151.jpeg',
  'images/IMG_8157.jpeg',
  'images/IMG_8165.jpeg',
  'images/IMG_8172.jpeg',
  'images/IMG_8176.jpeg',
];

let currentIndex = 0;
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = photos[currentIndex];
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function changeLightbox(dir) {
  currentIndex = (currentIndex + dir + photos.length) % photos.length;
  lightboxImg.src = photos[currentIndex];
}

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowRight')  changeLightbox(1);
  if (e.key === 'ArrowLeft')   changeLightbox(-1);
});

// Swipe support for lightbox
let touchStartX = 0;
lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
lightbox.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) changeLightbox(dx < 0 ? 1 : -1);
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
