document.addEventListener('DOMContentLoaded', () => {
  // ===== Inject ABOUT US section directly under #services =====
  const servicesSection = document.querySelector('#services');

  if (servicesSection && !document.querySelector('#about')) {
    servicesSection.insertAdjacentHTML(
      'afterend',
      `
      <section id="about" class="about">
        <div class="container">
          <h2>About JunkASAP</h2>

          <p>
            JunkASAP is a Virginia-based junk removal team made up of local workers who genuinely care about our clients.
            We focus on quick turnarounds, clear communication, and clean finishes, with fast, reliable work and no hidden fees.
            Whether it’s a home, apartment, office, or full property cleanout, we show up on time, work carefully, and leave your space
            cleaner than we found it—making the entire process simple from start to finish.
          </p>
        </div>
      </section>
      `
    );
  }

  // ===== Mobile Navigation Toggle =====
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');

  // (Optional) add About link to nav if missing
  if (navMenu && !navMenu.querySelector('a[href="#about"]')) {
    const target = navMenu.querySelector('ul') || navMenu;
    if (target.tagName === 'UL') {
      target.insertAdjacentHTML('beforeend', `<li><a href="#about">About Us</a></li>`);
    } else {
      target.insertAdjacentHTML('beforeend', `<a href="#about">About Us</a>`);
    }
  }

  if (navToggle && navMenu) {
    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  }

  // ===== Sticky CTA visibility control =====
  const stickyCta = document.querySelector('.sticky-cta');
  const heroSection = document.querySelector('.hero');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!stickyCta) return;

      if (!entry.isIntersecting) {
        stickyCta.style.display = 'flex';
        setTimeout(() => {
          stickyCta.style.opacity = '1';
        }, 10);
      } else {
        stickyCta.style.opacity = '0';
        setTimeout(() => {
          stickyCta.style.display = 'none';
        }, 300);
      }
    });
  }, observerOptions);

  if (heroSection && stickyCta) {
    stickyCta.style.opacity = '0';
    stickyCta.style.transition = 'opacity 0.3s ease';
    observer.observe(heroSection);
  }

  // ===== Smooth scroll for navigation links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();

        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;

        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== Form validation enhancement =====
  const quoteForm = document.querySelector('.quote-form');

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(quoteForm);
      const phone = formData.get('phone');
      const message = formData.get('message');

      if (!phone || !message) {
        alert('Please fill in all required fields.');
        return;
      }

      alert('Thank you! We\'ve received your quote request and will get back to you within 24 hours. For faster service, text photos to (571) 977-8757.');
      quoteForm.reset();
    });
  }

  // ===== Add animation on scroll for service cards and steps =====
  const observeElements = document.querySelectorAll('.step, .service-card');

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  observeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScroll.observe(el);
  });

  // ===== Phone number formatting for better UX =====
  const phoneInput = document.querySelector('#phone');

  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');

      if (value.length > 0) {
        if (value.length <= 3) {
          value = `(${value}`;
        } else if (value.length <= 6) {
          value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
          value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
      }

      e.target.value = value;
    });
  }
});
