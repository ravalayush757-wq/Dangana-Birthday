/* ==========================================
   Main Application — Navigation & Initialization
   Royal Birthday Website
   ========================================== */

const RoyalApp = {
  currentPage: 'landing',
  pages: ['landing', 'decree', 'tribute', 'chronicle', 'gallery', 'special', 'blessing'],

  init() {
    // Initialize all modules
    if (window.FlowerShower) {
      FlowerShower.init();
      FlowerShower.start(1.5);
    }
    RoyalCountdown.init();
    RoyalDecree.init();
    RoyalGallery.init();
    GiftReveal.init();
    if (window.RoyalWishes) {
      RoyalWishes.init();
    }

    // Bind navigation
    this.bindNavigation();
    this.bindMobileNav();
    this.bindScrollEffects();
    this.bindWishButton();

    // Show landing page
    this.navigateTo('landing');

    // Animate elements that are in view
    this.observeAnimatedElements();
  },

  /**
   * Navigate to a page
   */
  navigateTo(pageId) {
    if (!this.pages.includes(pageId)) return;

    // Hide current page
    const current = document.querySelector('.page.active');
    if (current) {
      current.classList.remove('active');
    }

    // Show target page
    const target = document.getElementById(pageId);
    if (target) {
      target.classList.add('active');
      window.scrollTo(0, 0);
    }

    // Update nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-page') === pageId) {
        link.classList.add('active');
      }
    });

    // Page-specific actions
    this.onPageEnter(pageId);
    this.currentPage = pageId;

    // Close mobile nav if open
    const navLinks = document.querySelector('.nav-links');
    const navToggle = document.querySelector('.nav-toggle');
    if (navLinks) navLinks.classList.remove('open');
    if (navToggle) navToggle.classList.remove('open');

    // Re-observe animated elements for new page
    setTimeout(() => this.observeAnimatedElements(), 100);
  },

  /**
   * Actions when entering a specific page
   */
  onPageEnter(pageId) {
    switch (pageId) {
      case 'decree':
        RoyalDecree.unfurl();
        break;
    }
  },

  /**
   * Bind navigation click events
   */
  bindNavigation() {
    document.querySelectorAll('[data-page]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        this.navigateTo(pageId);
      });
    });
  },

  /**
   * Mobile navigation toggle
   */
  bindMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        navLinks.classList.toggle('open');
      });
    }
  },

  /**
   * Scroll effects (nav shrink)
   */
  bindScrollEffects() {
    const nav = document.querySelector('.royal-nav');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  },

  /**
   * Observe elements for scroll-triggered animations
   */
  observeAnimatedElements() {
    const elements = document.querySelectorAll('.tribute-card, .timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger the animation
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 150);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => {
      if (!el.classList.contains('visible')) {
        observer.observe(el);
      }
    });
  },

  /**
   * Make a Wish button — releases golden lanterns
   */
  bindWishButton() {
    const wishBtn = document.getElementById('wish-btn');
    if (!wishBtn) return;

    wishBtn.addEventListener('click', () => {
      this.releaseLanterns(20);
      this.launchFireworks();
      
      // Change button text
      wishBtn.textContent = '✨ Wish Granted! ✨';
      wishBtn.style.pointerEvents = 'none';
      
      setTimeout(() => {
        wishBtn.textContent = '🌟 Make a Wish 🌟';
        wishBtn.style.pointerEvents = 'auto';
      }, 5000);
    });
  },

  /**
   * Release golden lanterns from the bottom
   */
  releaseLanterns(count) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const lantern = document.createElement('div');
        lantern.className = 'lantern';
        lantern.style.left = (Math.random() * 90 + 5) + 'vw';
        lantern.style.bottom = '0';
        lantern.style.animationDuration = (3 + Math.random() * 4) + 's';
        
        const size = 20 + Math.random() * 20;
        lantern.style.width = size + 'px';
        lantern.style.height = (size * 1.3) + 'px';
        
        document.body.appendChild(lantern);
        
        setTimeout(() => {
          if (lantern.parentNode) lantern.parentNode.removeChild(lantern);
        }, 8000);
      }, i * 200);
    }
  },

  /**
   * Launch fireworks using canvas
   */
  launchFireworks() {
    const canvas = document.getElementById('fireworks-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#FFD700', '#FF69B4', '#FF6347', '#7B68EE', '#00CED1', '#FF1493', '#FFB6C1', '#D4AF37'];

    // Create firework bursts
    for (let burst = 0; burst < 8; burst++) {
      setTimeout(() => {
        const cx = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
        const cy = Math.random() * canvas.height * 0.5 + canvas.height * 0.1;
        const color = colors[Math.floor(Math.random() * colors.length)];

        for (let i = 0; i < 60; i++) {
          const angle = (Math.PI * 2 / 60) * i;
          const speed = 2 + Math.random() * 4;
          particles.push({
            x: cx,
            y: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            decay: 0.008 + Math.random() * 0.015,
            color: color,
            size: 2 + Math.random() * 2,
          });
        }
      }, burst * 400);
    }

    let animFrame;
    function animate() {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';

      let alive = false;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gravity
        p.vx *= 0.99;
        p.life -= p.decay;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      if (alive || particles.length > 0) {
        animFrame = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animFrame);
      }
    }

    animate();
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  RoyalApp.init();
});
