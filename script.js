// ================== SETTINGS ==================
// Change texts, emojis and images here!
// If you want to use an image instead of an emoji,
// add: image: 'img/your-photo.jpg'
const gifts = [
  {
    emoji: '💖',
    label: 'For You',
    title: 'You Are Amazing!',
    text: 'Thank you for being you. You make this world brighter and kinder every single day.'
  },
  {
    emoji: '🎂',
    label: 'A Wish',
    title: 'Happiness!',
    text: 'May every day bring you joy, and may your smile never leave your face!'
  },
  {
    emoji: '🌸',
    label: 'Compliment',
    title: 'You Are Beautiful',
    text: 'Beautiful, smart, kind — you combine all the best things in one person.'
  },
  {
    emoji: '🎈',
    label: 'A Dream',
    title: 'May It Come True',
    text: 'All your dreams will definitely come true. I truly believe in it!'
  },
  {
    emoji: '🍰',
    label: 'Something Sweet',
    title: 'Life Is Like a Cake',
    text: 'May your life be as sweet as this birthday cake.'
  },
  {
    emoji: '💌',
    label: 'A Postcard',
    title: 'With Love',
    text: 'This little card is a piece of my warmth, just for you.'
  },
  {
    emoji: '🌟',
    label: 'A Star',
    title: 'You Are a Star',
    text: 'Shine bright and never let anyone dim your light.'
  },
  {
    emoji: '🎁',
    label: 'A Surprise',
    title: 'Smile!',
    text: 'You are the best. Always remember that! 💕'
  },
  {
    // ← HERE: bouquet with a real image instead of emoji
    image: 'img/bouquet.jpg',
    emoji: '💐',
    label: 'A Bouquet',
    title: 'A Bouquet of Flowers',
    text: 'This virtual bouquet is for you — may it warm your heart. 🌷'
  }
];

// Falling hearts on the background
const heartEmojis = ['💖', '💗', '💕', '🌸', '💝', '🎀'];

// Confetti colors
const confettiColors = ['#ff6fa5', '#ff9ec4', '#ffd1e3', '#d63384', '#fff0f6', '#ffb3d1'];

// ================== BUILD THE GRID ==================
const grid = document.getElementById('grid');

gifts.forEach((gift, index) => {
  const div = document.createElement('div');
  div.className = 'gift';
  div.dataset.index = index;

  // If gift has an image, render an <img>, otherwise an emoji
  const media = gift.image
    ? `<img class="gift-img" src="${gift.image}" alt="${gift.title}">`
    : `<span class="emoji">${gift.emoji}</span>`;

  div.innerHTML = `
    ${media}
    <span class="label">${gift.label}</span>
  `;

  div.addEventListener('click', (e) => openGift(index, e));
  grid.appendChild(div);
});

// ================== FALLING HEARTS ==================
function createFallingHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.left = Math.random() * 100 + '%';
  heart.style.fontSize = (16 + Math.random() * 18) + 'px';
  heart.style.animationDuration = (6 + Math.random() * 6) + 's';
  heart.style.animationDelay = Math.random() * 2 + 's';
  document.getElementById('heartsBg').appendChild(heart);
  setTimeout(() => heart.remove(), 14000);
}

const isMobile = window.innerWidth < 768;
const heartInterval = isMobile ? 700 : 400;
setInterval(createFallingHeart, heartInterval);

// ================== MODAL ==================
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');

function openGift(index, event) {
  const gift = gifts[index];
  const giftEl = document.querySelector(`.gift[data-index="${index}"]`);

  burstConfetti(event.clientX, event.clientY);
  giftEl.classList.add('opened');

  setTimeout(() => {
    // If the gift has an image, show it in the modal instead of an emoji
    if (gift.image) {
      modalIcon.innerHTML = `<img src="${gift.image}" alt="${gift.title}" class="modal-img">`;
    } else {
      modalIcon.innerHTML = gift.emoji;
    }
    modalTitle.textContent = gift.title;
    modalText.textContent = gift.text;
    modal.classList.add('active');
  }, 220);
}

function closeModal() {
  modal.classList.remove('active');
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ================== CONFETTI ==================
function burstConfetti(x, y) {
  const container = document.getElementById('confettiContainer');
  const count = isMobile ? 22 : 40;

  for (let i = 0; i < count; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = x + 'px';
    c.style.top = y + 'px';
    c.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';

    const angle = Math.random() * Math.PI * 2;
    const distance = 60 + Math.random() * 140;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance + 60;
    const rot = (Math.random() - 0.5) * 720;

    c.style.setProperty('--tx', tx + 'px');
    c.style.setProperty('--ty', ty + 'px');
    c.style.setProperty('--rot', rot + 'deg');
    c.style.animationDelay = (Math.random() * 0.1) + 's';
    c.style.width = (6 + Math.random() * 8) + 'px';
    c.style.height = (6 + Math.random() * 8) + 'px';

    container.appendChild(c);
    setTimeout(() => c.remove(), 1600);
  }
}