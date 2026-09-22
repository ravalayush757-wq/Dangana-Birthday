/* ==========================================
   Flower Shower Particle System
   Creates a beautiful shower of falling flowers
   ========================================== */

const FlowerShower = {
  container: null,
  isActive: false,
  interval: null,
  maxFlowers: 50,
  currentCount: 0,

  flowerTypes: [
    { emoji: '🌹', minSize: 22, maxSize: 38 },
    { emoji: '🌸', minSize: 18, maxSize: 32 },
    { emoji: '🌺', minSize: 22, maxSize: 36 },
    { emoji: '🌷', minSize: 20, maxSize: 34 },
    { emoji: '💐', minSize: 24, maxSize: 40 },
    { emoji: '🏵️', minSize: 20, maxSize: 34 },
    { emoji: '🌻', minSize: 22, maxSize: 38 },
    { emoji: '💮', minSize: 18, maxSize: 30 },
    { emoji: '🪷', minSize: 20, maxSize: 34 },
    { emoji: '🌼', minSize: 20, maxSize: 32 },
    { emoji: '💗', minSize: 16, maxSize: 28 },
  ],

  petalColors: [
    '#FF69B4', '#FF1493', '#DB7093', '#FFB6C1',
    '#FFC0CB', '#FF91A4', '#E75480', '#DE3163',
    '#FF6B81', '#F8B4C8', '#FF85A2', '#FFD1DC'
  ],

  init() {
    this.container = document.getElementById('flower-shower');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'flower-shower';
      this.container.className = 'flower-shower';
      document.body.appendChild(this.container);
    }
  },

  start(intensity = 4) {
    if (this.isActive) return;
    this.isActive = true;

    for (let i = 0; i < 15; i++) {
      setTimeout(() => this.createFlower(), i * 200);
    }

    const intervalMs = Math.max(150, 1000 / intensity);
    this.interval = setInterval(() => {
      if (this.currentCount < this.maxFlowers) {
        this.createFlower();
      }
    }, intervalMs);
  },

  stop() {
    this.isActive = false;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  },

  createFlower() {
    const useEmoji = Math.random() > 0.3;
    const flower = document.createElement('div');
    flower.className = 'flower-petal';

    const swayClass = ['', 'flower-sway-1', 'flower-sway-2'][Math.floor(Math.random() * 3)];
    if (swayClass) flower.classList.add(swayClass);

    if (useEmoji) {
      const type = this.flowerTypes[Math.floor(Math.random() * this.flowerTypes.length)];
      const size = this.randomBetween(type.minSize, type.maxSize);
      flower.textContent = type.emoji;
      flower.style.fontSize = size + 'px';
    } else {
      const color = this.petalColors[Math.floor(Math.random() * this.petalColors.length)];
      const size = this.randomBetween(12, 22);
      flower.style.width = size + 'px';
      flower.style.height = (size * 1.4) + 'px';
      flower.style.background = `radial-gradient(ellipse at 30% 30%, ${color}, ${this.darkenColor(color, 30)})`;
      flower.style.borderRadius = '50% 0 50% 50%';
      flower.style.opacity = '0.8';
    }

    flower.style.left = this.randomBetween(0, 100) + 'vw';
    const duration = this.randomBetween(5, 12);
    flower.style.animationDuration = duration + 's';
    flower.style.animationDelay = this.randomBetween(0, 2) + 's';

    this.container.appendChild(flower);
    this.currentCount++;

    setTimeout(() => {
      if (flower.parentNode) {
        flower.parentNode.removeChild(flower);
        this.currentCount--;
      }
    }, (duration + 3) * 1000);
  },

  randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  },

  darkenColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, (num >> 16) - amt);
    const G = Math.max(0, ((num >> 8) & 0x00FF) - amt);
    const B = Math.max(0, (num & 0x0000FF) - amt);
    return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
  },

  burst(count = 30) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => this.createFlower(), i * 80);
    }
  }
};
