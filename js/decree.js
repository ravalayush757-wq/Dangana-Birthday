/* ==========================================
   Royal Decree — Scroll Unfurl Animation
   ========================================== */

const RoyalDecree = {
  scrollBody: null,
  hasUnfurled: false,

  init() {
    this.scrollBody = document.querySelector('.scroll-body');
  },

  /**
   * Unfurl the scroll with a smooth animation
   */
  unfurl() {
    if (this.hasUnfurled || !this.scrollBody) return;
    this.hasUnfurled = true;

    // Small delay for dramatic effect
    setTimeout(() => {
      this.scrollBody.classList.add('unfurled');
    }, 500);
  },

  /**
   * Reset the scroll (refurl)
   */
  reset() {
    if (!this.scrollBody) return;
    this.hasUnfurled = false;
    this.scrollBody.classList.remove('unfurled');
  }
};
