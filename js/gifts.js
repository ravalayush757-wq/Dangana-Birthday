/* ==========================================
   Gift Reveal — Something Special Section
   On her birthday, set isRevealed = true
   and add gift photo filenames to the gifts array!
   ========================================== */

const GiftReveal = {
  // ======================================================
  // 🎁 GIFT REVEAL CONFIGURATION
  // 
  // On her birthday (14th November):
  // 1. Place gift photos in the "gifts/" folder
  // 2. Set isRevealed to true
  // 3. Add your gift photos to the array below
  // ======================================================
  isRevealed: false,

  gifts: [
    // Uncomment and edit these on her birthday:
    // { file: 'gift1.jpg', caption: 'A Gift Fit for a Queen' },
    // { file: 'gift2.jpg', caption: 'With All My Love' },
    // { file: 'gift3.jpg', caption: 'A Token of Devotion' },
  ],

  init() {
    const sealedNotice = document.getElementById('sealed-notice');
    const giftGrid = document.getElementById('gift-grid');

    if (this.isRevealed && this.gifts.length > 0) {
      // Reveal the gifts!
      if (sealedNotice) sealedNotice.style.display = 'none';
      if (giftGrid) this.renderGifts(giftGrid);
    } else {
      // Keep sealed
      if (giftGrid) giftGrid.style.display = 'none';
    }
  },

  renderGifts(container) {
    container.style.display = ''; // Make grid visible
    container.innerHTML = '';

    this.gifts.forEach((gift) => {
      const item = document.createElement('div');
      item.className = 'gift-item';
      item.innerHTML = `
        <img src="gifts/${gift.file}" alt="${gift.caption || 'A Royal Gift'}" loading="lazy">
        ${gift.caption ? `<div class="caption">${gift.caption}</div>` : ''}
      `;
      container.appendChild(item);
    });
  }
};
