/* ==========================================
   Royal Countdown Timer
   Counts down to Her Majesty's Birthday — 14th November
   ========================================== */

const RoyalCountdown = {
  targetDate: null,
  timerInterval: null,
  elements: {
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
  },

  init() {
    this.calculateTargetDate();
    this.cacheElements();
    this.update();
    this.timerInterval = setInterval(() => this.update(), 1000);
  },

  calculateTargetDate() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let target = new Date(currentYear, 10, 14, 0, 0, 0); // 10 = November (0-indexed)

    if (now > target) {
      target = new Date(currentYear + 1, 10, 14, 0, 0, 0);
    }

    this.targetDate = target;
  },

  cacheElements() {
    this.elements.days = document.getElementById('countdown-days');
    this.elements.hours = document.getElementById('countdown-hours');
    this.elements.minutes = document.getElementById('countdown-minutes');
    this.elements.seconds = document.getElementById('countdown-seconds');
  },

  update() {
    const now = new Date();
    const diff = this.targetDate - now;

    if (diff <= 0) {
      this.onBirthdayArrived();
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    this.updateElement('days', days);
    this.updateElement('hours', hours);
    this.updateElement('minutes', minutes);
    this.updateElement('seconds', seconds);
  },

  updateElement(unit, value) {
    const el = this.elements[unit];
    if (!el) return;

    const paddedValue = String(value).padStart(2, '0');
    if (el.textContent !== paddedValue) {
      el.textContent = paddedValue;
      el.style.transform = 'scale(1.1)';
      setTimeout(() => {
        el.style.transform = 'scale(1)';
      }, 200);
    }
  },

  onBirthdayArrived() {
    clearInterval(this.timerInterval);

    if (this.elements.days) this.elements.days.textContent = '🎂';
    if (this.elements.hours) this.elements.hours.textContent = '👑';
    if (this.elements.minutes) this.elements.minutes.textContent = '🎉';
    if (this.elements.seconds) this.elements.seconds.textContent = '💖';

    const label = document.querySelector('.countdown-label');
    if (label) {
      label.textContent = '✦ THE MOST GLORIOUS DAY HATH ARRIVED! ✦';
      label.style.fontSize = '1.2rem';
      label.style.color = '#FFD700';
    }

    // Birthday celebration!
  },

  destroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
};
