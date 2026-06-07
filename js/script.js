document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const themeButtons = document.querySelectorAll('.toggle-mode');
  const backTop = document.getElementById('backTop');
  const serviceSearch = document.getElementById('serviceSearch');
  const servicesGrid = document.getElementById('servicesGrid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryGrid = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('lightbox');
  const closeLightbox = document.getElementById('closeLightbox');
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxTitle = document.querySelector('.lightbox-title');
  const faqAccordion = document.getElementById('faqAccordion');
  const contactForm = document.getElementById('contactForm');
  const formNotice = document.getElementById('formNotice');
  const pageLoader = document.getElementById('pageLoader');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });
  }

  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark', isDark);
    themeButtons.forEach(btn => btn.textContent = isDark ? '☀️' : '🌙');
  };

  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = !document.body.classList.contains('dark');
      const nextTheme = isDark ? 'dark' : 'light';
      applyTheme(nextTheme);
      localStorage.setItem('theme', nextTheme);
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backTop.style.display = 'flex';
    } else {
      backTop.style.display = 'none';
    }
  });

  backTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  if (serviceSearch && servicesGrid) {
    serviceSearch.addEventListener('input', () => {
      const term = serviceSearch.value.trim().toLowerCase();
      const items = servicesGrid.querySelectorAll('.service-card');
      items.forEach(item => {
        const text = item.dataset.title.toLowerCase();
        item.style.display = text.includes(term) ? 'grid' : 'none';
      });
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      const items = galleryGrid.querySelectorAll('.gallery-item');
      items.forEach(item => {
        item.style.display = filter === 'all' || item.dataset.category === filter ? 'grid' : 'none';
      });
    });
  });

  galleryGrid?.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const title = item.dataset.title || 'Gallery';
      const style = window.getComputedStyle(item.querySelector('.gallery-thumb'));
      lightboxTitle.textContent = title;
      lightboxImage.style.background = style.background;
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });

  closeLightbox?.addEventListener('click', () => {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
  });

  lightbox?.addEventListener('click', event => {
    if (event.target === lightbox) {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
    }
  });

  faqAccordion?.querySelectorAll('.accordion-item').forEach(item => {
    const toggle = item.querySelector('.accordion-toggle');
    toggle.addEventListener('click', () => {
      const open = item.classList.contains('active');
      faqAccordion.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
      if (!open) item.classList.add('active');
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', event => {
      event.preventDefault();
      formNotice.textContent = 'Thank you! Your message has been received. We will contact you soon.';
      formNotice.style.color = 'var(--accent-2)';
      contactForm.reset();
    });
  }

  const counters = document.querySelectorAll('.counter');
  if (counters.length) {
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          let current = 0;
          const step = Math.max(1, Math.floor(target / 80));
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              el.textContent = target;
              clearInterval(interval);
              return;
            }
            el.textContent = current;
          }, 16);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(counter => counterObserver.observe(counter));
  }

  const rotateSlider = (containerSelector, cardSelector) => {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    const cards = container.querySelectorAll(cardSelector);
    let currentIndex = 0;
    const rotate = () => {
      cards.forEach((card, index) => card.classList.toggle('active', index === currentIndex));
      currentIndex = (currentIndex + 1) % cards.length;
    };
    rotate();
    setInterval(rotate, 4500);
  };

  rotateSlider('.testimonial-slider', '.testimonial-card');
  rotateSlider('.review-slider', '.review-card');

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape' && lightbox?.classList.contains('active')) {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
    }
  });

  if (pageLoader) {
    setTimeout(() => {
      pageLoader.style.opacity = '0';
      pageLoader.style.pointerEvents = 'none';
    }, 800);
  }
});
