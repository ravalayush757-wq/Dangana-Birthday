/* ==========================================
   Royal Gallery — Photo Gallery with Lightbox
   ========================================== */

const RoyalGallery = {
  // ======================================================
  // ADD YOUR PHOTOS HERE!
  // Place your photo files in the "photos/" folder,
  // then add entries below with the filename and a caption.
  // ======================================================
  photos: [
    { file: 'MYFAVPIC.jpg', caption: 'Her Radiant Splendour — The Fairest in All the Realm' },
    { file: 'ILV.jpg', caption: 'With All My Devotion & Eternal Love' },
    { file: 'din 1.jpg', caption: 'Her Celestial Grace & Sweetest Charm' },
    { file: 'din 4.jpg', caption: 'A Gentle Moment of Pure Elegance' },
    { file: '31.11.2024.jpg', caption: 'A Golden Memory Inscribed in Time' },
    { file: 'WhatsApp Image 2025-10-16 at 01.54.42_0a33c9fb.jpg', caption: 'The Light That Brightens Every Day' },
    { file: 'Screenshot 2025-10-15 185015.png', caption: 'Her Enchanting Smile That Captivates My Soul' },
    { file: 'Screenshot 2025-04-10 003407.png', caption: 'Beauty Beyond the Measure of Words' },
    { file: 'Screenshot 2024-11-22 230404.png', caption: 'Treasured Chapters in Our Chronicle' },
    { file: 'Screenshot_20231217-204918_Instagram.jpg', caption: 'A Divine Blessing Upon My Life' }
  ],

  currentIndex: 0,
  galleryGrid: null,
  lightbox: null,
  lightboxImg: null,

  init() {
    this.galleryGrid = document.getElementById('gallery-grid');
    this.lightbox = document.getElementById('lightbox');
    this.lightboxImg = document.getElementById('lightbox-img');

    if (this.photos.length > 0) {
      this.renderGallery();
    } else {
      this.renderEmpty();
    }

    this.bindEvents();
  },

  renderGallery() {
    if (!this.galleryGrid) return;
    this.galleryGrid.innerHTML = '';

    this.photos.forEach((photo, index) => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.setAttribute('data-index', index);
      const encodedSrc = encodeURI('photos/' + photo.file);
      item.innerHTML = `
        <img src="${encodedSrc}" alt="${photo.caption || 'Royal Memory'}" loading="lazy">
        ${photo.caption ? `<div class="caption">${photo.caption}</div>` : ''}
      `;
      item.addEventListener('click', () => this.openLightbox(index));
      this.galleryGrid.appendChild(item);
    });
  },

  renderEmpty() {
    if (!this.galleryGrid) return;
    this.galleryGrid.innerHTML = `
      <div class="gallery-empty" style="grid-column: 1 / -1;">
        <div class="empty-icon">🖼️</div>
        <p>The Royal Gallery awaiteth its treasures.</p>
        <p style="margin-top: 15px; font-size: 1rem;">
          Place thy photographs within the <code>photos/</code> folder,<br>
          then list them in <code>js/gallery.js</code> to behold them here.
        </p>
      </div>
    `;
  },

  openLightbox(index) {
    this.currentIndex = index;
    if (!this.lightbox || !this.lightboxImg) return;

    this.lightboxImg.src = encodeURI('photos/' + this.photos[index].file);
    this.lightboxImg.alt = this.photos[index].caption || 'Royal Memory';
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeLightbox() {
    if (!this.lightbox) return;
    this.lightbox.classList.remove('active');
    document.body.style.overflow = '';
  },

  navigate(direction) {
    if (this.photos.length === 0) return;
    this.currentIndex = (this.currentIndex + direction + this.photos.length) % this.photos.length;
    if (this.lightboxImg) {
      this.lightboxImg.src = encodeURI('photos/' + this.photos[this.currentIndex].file);
      this.lightboxImg.alt = this.photos[this.currentIndex].caption || 'Royal Memory';
    }
  },

  bindEvents() {
    // Close lightbox on background click
    if (this.lightbox) {
      this.lightbox.addEventListener('click', (e) => {
        if (e.target === this.lightbox) {
          this.closeLightbox();
        }
      });
    }

    // Close button
    const closeBtn = document.getElementById('lightbox-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeLightbox();
      });
    }

    // Navigation buttons
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.navigate(-1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.navigate(1);
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.lightbox || !this.lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowLeft') this.navigate(-1);
      if (e.key === 'ArrowRight') this.navigate(1);
    });
  }
};
