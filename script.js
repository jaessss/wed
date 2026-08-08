// ===== Intro Overlay =====
const intro = document.getElementById('intro');
document.body.classList.add('intro-locked');

window.addEventListener('load', () => {
  setTimeout(() => {
    intro.classList.add('hide');
    document.body.classList.remove('intro-locked');
  }, 2200);
});

// Fallback: never leave the intro stuck if `load` is slow or already fired
setTimeout(() => {
  intro.classList.add('hide');
  document.body.classList.remove('intro-locked');
}, 4000);

// ===== Cover Script Text: letter-by-letter reveal =====
const scriptBaseDelay = 3.6; // seconds — matches when .cover-inner finishes fading in
const scriptStep = 0.06;
let scriptLetterIndex = 0;

document.querySelectorAll('.cover-script .script-line').forEach(line => {
  const text = line.textContent;
  line.textContent = '';
  [...text].forEach(char => {
    const letter = document.createElement('span');
    letter.className = 'letter';
    letter.textContent = char === ' ' ? '\u00a0' : char;
    letter.style.animationDelay = `${scriptBaseDelay + scriptLetterIndex * scriptStep}s`;
    line.appendChild(letter);
    scriptLetterIndex++;
  });
});

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

// ===== Gallery =====
const photos = [
  'images/gallery/01.jpg',
  'images/gallery/02.jpg',
  'images/gallery/03.jpg',
  'images/gallery/04.jpg',
  'images/gallery/05.jpg',
  'images/gallery/06.jpg',
  'images/gallery/07.jpg',
  'images/gallery/08.jpg',
  'images/gallery/09.jpg',
  'images/gallery/10.jpg',
  'images/gallery/11.jpg',
  'images/gallery/12.jpg',
  'images/gallery/13.jpg',
  'images/gallery/14.jpg',
  'images/gallery/15.jpg',
  'images/gallery/16.jpg',
  'images/gallery/17.jpg',
  'images/gallery/18.jpg',
  'images/gallery/19.jpg',
  'images/gallery/20.jpg',
];

// ===== Gallery: Show More =====
const galleryGrid = document.getElementById('gallery-grid');
const galleryMoreBtn = document.getElementById('gallery-more-btn');
const galleryHiddenCount = galleryGrid.querySelectorAll('.g-item.more-hidden').length;

function toggleGalleryMore() {
  const expanded = galleryGrid.classList.toggle('expanded');
  galleryMoreBtn.textContent = expanded ? '접기' : `사진 더보기 (${galleryHiddenCount})`;
}

// ===== Lightbox =====
let currentIndex = 0;
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCounter = document.getElementById('lightbox-counter');

function renderLightbox() {
  lightboxImg.src = photos[currentIndex];
  lightboxCounter.textContent = `${currentIndex + 1} / ${photos.length}`;
}

function openLightbox(index) {
  currentIndex = index;
  renderLightbox();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function changeLightbox(dir) {
  currentIndex = (currentIndex + dir + photos.length) % photos.length;
  renderLightbox();
}

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowRight') changeLightbox(1);
  if (e.key === 'ArrowLeft')  changeLightbox(-1);
});

// Swipe support inside the lightbox
let touchStartX = 0;
lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
lightbox.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) changeLightbox(dx < 0 ? 1 : -1);
});

// ===== Account Accordion =====
function toggleAccount(button) {
  const panel = button.nextElementSibling;
  const isOpen = button.getAttribute('aria-expanded') === 'true';

  if (isOpen) {
    button.setAttribute('aria-expanded', 'false');
    panel.style.maxHeight = null;
  } else {
    button.setAttribute('aria-expanded', 'true');
    panel.style.maxHeight = panel.scrollHeight + 'px';
  }
}

// ===== Copy & Share =====
function copyToClipboard(text) {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  return Promise.resolve();
}

function copyText(text) {
  copyToClipboard(text).then(() => showToast('복사되었습니다 ✓'));
}

const toast = document.getElementById('copy-toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
}
