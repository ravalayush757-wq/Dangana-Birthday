/* ==========================================
   Royal Birthday Wishes & Quotes Module
   Dedicated to Her Royal Highness Dr. Angana
   ========================================== */

const RoyalWishes = {
  // Pre-curated Celestial Quotes for Her Grace
  quotes: [
    {
      quote: "Among the countless billions who walk this earth, there is only one smile that turns my world to pure gold, only one voice that calms my every storm — Her Peerless Majesty, Dr. Angana.",
      sub: "Dedicated from the Faithful Heart of Manu"
    },
    {
      quote: "Thou art not merely a chapter in my mortal story; thou art the melody that gives rhythm to my days and the sacred prayer that grants peace to my nights.",
      sub: "Inscribed in the Royal Annals of Love"
    },
    {
      quote: "They say doctors heal with medicine and skill, but Her Grace Dr. Angana heals simply by breathing warmth, radiance, and infinite kindness into my life.",
      sub: "A Tribute to the Queen of My Heart"
    },
    {
      quote: "If all the stars in the midnight heavens were gathered into a single crown, they would still pale before the pure and gentle brilliance of thy laughter.",
      sub: "Proclaimed Under Witness of Heaven"
    },
    {
      quote: "Every second that ticks upon this royal countdown brings us closer to celebrating Providence's finest masterpiece: the day thou blessed this world with thy birth.",
      sub: "In Honour of November 14"
    },
    {
      quote: "Kings may rule empires of stone and gold, but my greatest kingdom will forever remain the sanctuary of thy smile and the honour of loving thee.",
      sub: "Forever Loyal, Forever Thine"
    }
  ],

  currentQuoteIndex: 0,
  storageKey: 'royal_angana_birthday_wish',

  init() {
    this.initWishForm();
    this.initQuotes();
    this.renderSavedWishIfExists();
  },

  /**
   * Initialize interactive quote showcase
   */
  initQuotes() {
    const quoteTextEl = document.getElementById('royal-quote-text');
    const quoteSubEl = document.getElementById('royal-quote-sub');
    const nextBtn = document.getElementById('royal-quote-next');
    const dotsContainer = document.getElementById('quote-dots-container');

    if (!quoteTextEl || !nextBtn) return;

    // Build dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      this.quotes.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.className = 'quote-dot' + (idx === 0 ? ' active' : '');
        dot.addEventListener('click', () => this.showQuote(idx));
        dotsContainer.appendChild(dot);
      });
    }

    nextBtn.addEventListener('click', () => {
      this.currentQuoteIndex = (this.currentQuoteIndex + 1) % this.quotes.length;
      this.showQuote(this.currentQuoteIndex);
    });

    // Initial display
    this.showQuote(0, false);
  },

  showQuote(index, animate = true) {
    this.currentQuoteIndex = index;
    const card = document.getElementById('royal-quote-card');
    const textEl = document.getElementById('royal-quote-text');
    const subEl = document.getElementById('royal-quote-sub');
    const dots = document.querySelectorAll('.quote-dot');

    if (!textEl || !this.quotes[index]) return;

    if (animate && card) {
      card.classList.add('quote-fade-out');
      setTimeout(() => {
        textEl.textContent = `"${this.quotes[index].quote}"`;
        if (subEl) subEl.textContent = `✦ ${this.quotes[index].sub} ✦`;
        card.classList.remove('quote-fade-out');
        card.classList.add('quote-fade-in');
        setTimeout(() => card.classList.remove('quote-fade-in'), 400);
      }, 250);
    } else {
      textEl.textContent = `"${this.quotes[index].quote}"`;
      if (subEl) subEl.textContent = `✦ ${this.quotes[index].sub} ✦`;
    }

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });
  },

  /**
   * Selection handlers for Celebration and Mood pills
   */
  selectCeleb(btn) {
    if (!btn) return;
    const container = document.getElementById('celeb-pills-container') || btn.closest('.pills-grid') || document;
    container.querySelectorAll('.celeb-pill').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    const input = document.getElementById('selected-royal-celeb');
    const val = btn.getAttribute('data-celeb') || btn.textContent.trim();
    if (input) input.value = val;
  },

  selectMood(btn) {
    if (!btn) return;
    const container = document.getElementById('mood-pills-container') || btn.closest('.mood-pills-row') || document;
    container.querySelectorAll('.mood-pill').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    const input = document.getElementById('selected-royal-mood');
    const val = btn.getAttribute('data-mood') || btn.textContent.trim();
    if (input) input.value = val;
  },

  /**
   * Initialize Wish Form & interactive buttons
   */
  initWishForm() {
    const form = document.getElementById('royal-wish-form');
    if (!form) return;

    // Celebration event delegation
    const celebContainer = document.getElementById('celeb-pills-container') || document.querySelector('.pills-grid');
    if (celebContainer) {
      celebContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.celeb-pill');
        if (btn) {
          e.preventDefault();
          this.selectCeleb(btn);
        }
      });
    }

    // Mood event delegation
    const moodContainer = document.getElementById('mood-pills-container') || document.querySelector('.mood-pills-row');
    if (moodContainer) {
      moodContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.mood-pill');
        if (btn) {
          e.preventDefault();
          this.selectMood(btn);
        }
      });
    }

    // Direct click backup on each pill
    document.querySelectorAll('.celeb-pill').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        this.selectCeleb(btn);
      };
    });

    document.querySelectorAll('.mood-pill').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        this.selectMood(btn);
      };
    });

    // Form submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleWishSubmit();
    });
  },

  ayushPhone: '919065405089',

  handleWishSubmit() {
    const wishInput = document.getElementById('her-royal-wish');
    const commandInput = document.getElementById('her-royal-command');
    const moodInput = document.getElementById('selected-royal-mood');
    const celebInput = document.getElementById('selected-royal-celeb');

    const wishText = wishInput ? wishInput.value.trim() : '';
    const commandText = commandInput ? commandInput.value.trim() : '';
    const mood = moodInput && moodInput.value ? moodInput.value : 'Majestic & Blessed 👑';
    const celebration = celebInput && celebInput.value ? celebInput.value : 'A Candlelight Royal Feast 🕯️';

    if (!wishText) {
      alert("Pray, Her Majesty must pen at least one secret wish before sealing the scroll!");
      if (wishInput) wishInput.focus();
      return;
    }

    const wishData = {
      wish: wishText,
      command: commandText || "To be cherished, pampered, and loved without measure.",
      mood: mood,
      celebration: celebration,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Save to localStorage
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(wishData));
    } catch (err) {
      console.warn("Storage warning:", err);
    }

    // Trigger celebration effects!
    if (window.RoyalApp && RoyalApp.launchFireworks) {
      RoyalApp.launchFireworks();
    }
    if (window.RoyalApp && RoyalApp.releaseLanterns) {
      RoyalApp.releaseLanterns(15);
    }
    if (window.FlowerShower && FlowerShower.burst) {
      FlowerShower.burst(40);
    }

    // Render the sealed decree certificate
    this.displaySealedCertificate(wishData);

    // Open WhatsApp directly to Ayush (+91 9065405089)
    const waUrl = this.buildWhatsAppUrl(wishData);
    try {
      window.open(waUrl, '_blank');
    } catch (e) {
      console.log("Auto-open blocked, user can tap the WhatsApp button", e);
    }
  },

  buildWhatsAppUrl(data) {
    const waMessage = 
`👑 *ROYAL BIRTHDAY DECREE FROM HER HIGHNESS DR. ANGANA* 👑
⚜ Proclaimed unto the Stars & Sealed for Manu ⚜

✨ *Her Majesty's Secret Birthday Wish:*
"${data.wish}"

💌 *Her Royal Command for Manu:*
"${data.command}"

🎉 *Her Dream Birthday Celebration:*
${data.celebration}

💖 *Her Royal Mood:*
${data.mood}

📅 *Inscribed:* ${data.date} at ${data.time}
✦ Forever Sealed in Manu's Heart ✦`;

    return `https://api.whatsapp.com/send?phone=${this.ayushPhone}&text=${encodeURIComponent(waMessage)}`;
  },

  /**
   * Check if a wish was previously saved and display it
   */
  renderSavedWishIfExists() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        if (data && data.wish) {
          this.displaySealedCertificate(data, false);
        }
      }
    } catch (e) {
      console.warn("Could not read saved wish", e);
    }
  },

  /**
   * Display the sealed decree certificate
   */
  displaySealedCertificate(data, scrollToCert = true) {
    const formCard = document.getElementById('royal-wish-form-wrapper');
    const certCard = document.getElementById('royal-wish-certificate');
    if (!formCard || !certCard) return;

    formCard.style.display = 'none';
    certCard.style.display = 'block';

    const certWish = document.getElementById('cert-wish-text');
    const certCommand = document.getElementById('cert-command-text');
    const certCeleb = document.getElementById('cert-celeb-text');
    const certMood = document.getElementById('cert-mood-text');
    const certDate = document.getElementById('cert-date-text');

    if (certWish) certWish.textContent = `"${data.wish}"`;
    if (certCommand) certCommand.textContent = `"${data.command}"`;
    if (certCeleb) certCeleb.textContent = data.celebration;
    if (certMood) certMood.textContent = data.mood;
    if (certDate) certDate.textContent = `Inscribed upon ${data.date} at ${data.time}`;

    // WhatsApp share link with phone number
    const waBtn = document.getElementById('cert-whatsapp-btn');
    if (waBtn) {
      waBtn.href = this.buildWhatsAppUrl(data);
      waBtn.target = '_blank';
    }

    // Edit button
    const editBtn = document.getElementById('cert-edit-btn');
    if (editBtn) {
      editBtn.onclick = () => {
        certCard.style.display = 'none';
        formCard.style.display = 'block';
        const wishInput = document.getElementById('her-royal-wish');
        if (wishInput) wishInput.focus();
      };
    }

    if (scrollToCert) {
      setTimeout(() => {
        certCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }
};

// Auto-initialize when script loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => RoyalWishes.init());
} else {
  RoyalWishes.init();
}
