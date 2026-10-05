// ================== SETTINGS ==================
// Change texts, emojis and images here!
// If you want to use an image instead of an emoji,
// add: image: 'img/your-photo.jpg'
const gifts = [
  {
    emoji: '💖',
    label: 'For You',
    title: 'You are amazing',
    text: 'Thank you for being you <3'
  },
  {
    emoji: '🎂',
    label: 'A Wish',
    title: 'Happiness',
    text: 'I wish you happiness, health and wealth in life and whichever things u want!!'
  },
  {
    emoji: '🌸',
    label: 'Compliment',
    title: 'You Are Beautiful',
    text: 'Kind, interesting, understanding and much more. I hope you know this'
  },
  {
    emoji: '🎈',
    label: 'Dream',
    title: 'May it come true',
    text: 'All your dreams will definitely come true!!'
  },
  {
    emoji: '🍰',
    label: 'Something sweet',
    title: 'Cute cake',
    text: 'May your life be as sweet as a cake'
  },
  {
    emoji: '💌',
    label: 'Postcard',
    title: 'With Love',
    text: 'This little card is a piece of my love just for you'
  },
  {
    emoji: '🌟',
    label: 'Star',
    title: 'You are like a star',
    text: 'Never be upset with yourself because someone looks up to you',
    modalImage: 'img/you.jpg'
  },
  {
    emoji: '🎁',
    label: 'A Surprise',
    title: 'Bunny!',
    text: 'You look like this bunny, they always remind me of you hehe',
    modalImage: 'img/bunny.jpg'
  },
  {
    emoji: '💐',
    label: 'Bouquet',
    title: 'A bouquet of flowers',
    text: 'This bouquet is for you since i cant give it to you irl',
    modalImage: 'img/bouquet.jpg'   // ← показывается ТОЛЬКО в модалке
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

  div.innerHTML = `
    <span class="emoji">${gift.emoji}</span>
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
    // Если у подарка есть modalImage — показываем маленькую картинку над заголовком
    if (gift.modalImage) {
      modalIcon.innerHTML = `<img src="${gift.modalImage}" alt="${gift.title}" class="modal-img">`;
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