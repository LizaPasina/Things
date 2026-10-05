// ================== НАСТРОЙКИ ==================
// Меняйте тексты и эмодзи под себя!
const gifts = [
  { emoji: '💖', label: 'Для тебя',    title: 'Ты — чудо!',       text: 'Спасибо, что ты есть. Ты делаешь этот мир ярче и добрее каждый день.' },
  { emoji: '🎂', label: 'Пожелание',   title: 'Счастья!',         text: 'Пусть каждый день приносит радость, а улыбка не сходит с лица!' },
  { emoji: '🌸', label: 'Комплимент',  title: 'Ты прекрасна',     text: 'Красивая, умная, добрая — ты сочетаешь в себе всё самое лучшее.' },
  { emoji: '🎈', label: 'Мечта',       title: 'Пусть сбудется',   text: 'Все твои мечты обязательно сбудутся. Я в это верю!' },
  { emoji: '🍰', label: 'Сладкое',     title: 'Жизнь — как торт', text: 'Пусть жизнь будет такой же сладкой, как этот праздничный торт.' },
  { emoji: '💌', label: 'Открытка',    title: 'С любовью',        text: 'Эта открытка — маленький кусочек моего тепла для тебя.' },
  { emoji: '🌟', label: 'Звезда',      title: 'Ты — звезда',      text: 'Сияй ярко и никогда не позволяй никому погасить твой свет.' },
  { emoji: '🎁', label: 'Сюрприз',     title: 'Улыбнись!',        text: 'Ты самая лучшая. Помни об этом всегда! 💕' },
  { emoji: '💐', label: 'Букет',       title: 'Букет цветов',     text: 'Дарю тебе этот виртуальный букет — пусть он согреет твоё сердечко.' }
];

// Падающие сердечки на фоне
const heartEmojis = ['💖', '💗', '💕', '🌸', '💝', '🎀'];

// Цвета конфетти
const confettiColors = ['#ff6fa5', '#ff9ec4', '#ffd1e3', '#d63384', '#fff0f6', '#ffb3d1'];

// ================== ГЕНЕРАЦИЯ СЕТКИ ==================
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

// ================== ПАДАЮЩИЕ СЕРДЕЧКИ ==================
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

// На телефоне сердечек меньше — чтобы не тормозило
const isMobile = window.innerWidth < 768;
const heartInterval = isMobile ? 700 : 400;
setInterval(createFallingHeart, heartInterval);

// ================== МОДАЛЬНОЕ ОКНО ==================
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');

function openGift(index, event) {
  const gift = gifts[index];
  const giftEl = document.querySelector(`.gift[data-index="${index}"]`);

  // Конфетти из места клика
  burstConfetti(event.clientX, event.clientY);

  // Пометить как открытый
  giftEl.classList.add('opened');

  // Заполнить и показать модалку (с небольшой задержкой для конфетти)
  setTimeout(() => {
    modalIcon.textContent = gift.emoji;
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

// ================== КОНФЕТТИ ==================
function burstConfetti(x, y) {
  const container = document.getElementById('confettiContainer');
  // На телефоне меньше частиц
  const count = isMobile ? 22 : 40;

  for (let i = 0; i < count; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = x + 'px';
    c.style.top = y + 'px';
    c.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';

    // Случайное направление разлёта
    const angle = Math.random() * Math.PI * 2;
    const distance = 60 + Math.random() * 140;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance + 60; // чуть вниз
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