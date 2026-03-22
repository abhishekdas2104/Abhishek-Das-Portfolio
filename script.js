/* ============================================================
   PORTFOLIO SCRIPT — Full Dynamic & Interactive
   Matches abusaid.netlify.app effects
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. TYPING CODE ANIMATION — Hero Code Window
  // ============================================================
  const codeContent = `<span class="ck">const</span> <span class="cv">coder</span> <span class="co">=</span> {
  <span class="cp">name</span>: <span class="cs">'Abhishek Das'</span>,
  <span class="cp">skills</span>: [<span class="cs">'React'</span>, <span class="cs">'Node.js'</span>,
    <span class="cs">'Express'</span>, <span class="cs">'MongoDB'</span>,
    <span class="cs">'JavaScript'</span>, <span class="cs">'Tailwind'</span>],
  <span class="cp">hardWorker</span>: <span class="cb">true</span>,
  <span class="cp">quickLearner</span>: <span class="cb">true</span>,
  <span class="cp">problemSolver</span>: <span class="cb">true</span>,
  <span class="cp">hireable</span>: <span class="ck">function</span>() {
    <span class="ck">return</span> (
      <span class="cv">this</span>.<span class="cp">hardWorker</span> <span class="co">&&</span>
      <span class="cv">this</span>.<span class="cp">problemSolver</span> <span class="co">&&</span>
      <span class="cv">this</span>.<span class="cp">skills</span>.<span class="cp">length</span> <span class="co">>=</span> <span class="cn">5</span>
    );
  },
};`;

  const typedCodeEl = document.getElementById('typed-code');
  if (typedCodeEl) {
    // Strip HTML tags for typing, but keep them for rendering
    const plainText = codeContent.replace(/<[^>]*>/g, '');
    let charIndex = 0;

    // Build a map: for each plain text character, what HTML to insert
    const htmlChars = [];
    let inTag = false;
    let buffer = '';
    for (let i = 0; i < codeContent.length; i++) {
      if (codeContent[i] === '<') {
        inTag = true;
        buffer += codeContent[i];
      } else if (codeContent[i] === '>') {
        inTag = false;
        buffer += codeContent[i];
      } else if (inTag) {
        buffer += codeContent[i];
      } else {
        htmlChars.push(buffer + codeContent[i]);
        buffer = '';
      }
    }
    if (buffer) htmlChars.push(buffer);

    let currentHTML = '';
    function typeCode() {
      if (charIndex < htmlChars.length) {
        currentHTML += htmlChars[charIndex];
        typedCodeEl.innerHTML = currentHTML;
        charIndex++;
        // Variable speed: faster for spaces/newlines
        const ch = htmlChars[charIndex - 1];
        const lastChar = ch[ch.length - 1];
        let delay = 18;
        if (lastChar === ' ') delay = 10;
        else if (lastChar === '\n') delay = 30;
        else if (lastChar === ',') delay = 50;
        else if (lastChar === '{' || lastChar === '}') delay = 60;
        setTimeout(typeCode, delay);
      }
    }

    // Start typing after a short delay
    setTimeout(typeCode, 600);
  }

  // ============================================================
  // 2. NAVBAR — Scroll Effect & Active Section Tracking
  // ============================================================
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scroll-top');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateNavbar() {
    const scrollY = window.scrollY;

    // Navbar background
    navbar.classList.toggle('scrolled', scrollY > 60);

    // Scroll to top
    scrollTopBtn.classList.toggle('visible', scrollY > 500);

    // Active section tracking
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 140;
      if (scrollY >= top && scrollY < top + section.offsetHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-section') === current);
    });
  }

  window.addEventListener('scroll', updateNavbar);
  updateNavbar();

  // Scroll to top click
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ============================================================
  // 3. MOBILE MENU
  // ============================================================
  const hamburger = document.getElementById('hamburger');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function toggleMobile() {
    hamburger.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMobile);
  mobileLinks.forEach(link => link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }));

  // ============================================================
  // 4. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  // ============================================================
  const animateElements = document.querySelectorAll('.animate-on-scroll');

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  animateElements.forEach(el => scrollObserver.observe(el));

  // ============================================================
  // 5. SMOOTH SCROLLING for anchor links
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = this.getAttribute('href');
      if (target === '#') return;
      e.preventDefault();
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ============================================================
  // 6. EMAILJS CONTACT FORM
  // ============================================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    emailjs.init('SSB5zI4BKPcXTseH9');

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const original = btn.innerHTML;

      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;

      emailjs.sendForm('service_dhmtngm', 'template_mibycp5', contactForm)
        .then(() => {
          btn.innerHTML = '<i class="fa-solid fa-check"></i> Sent!';
          btn.style.background = 'linear-gradient(135deg, #16f2b3, #10b981)';
          contactForm.reset();
          setTimeout(() => { btn.innerHTML = original; btn.style.background = ''; btn.disabled = false; }, 3000);
        })
        .catch(() => {
          btn.innerHTML = '<i class="fa-solid fa-xmark"></i> Failed';
          btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
          setTimeout(() => { btn.innerHTML = original; btn.style.background = ''; btn.disabled = false; }, 3000);
        });
    });
  }

  // ============================================================
  // 7. PARALLAX BLOB MOVEMENT on Mouse Move
  // ============================================================
  const blobs = document.querySelectorAll('.glow-blob');
  let mouseX = 0, mouseY = 0;
  let blobX = 0, blobY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animateBlobs() {
    blobX += (mouseX - blobX) * 0.03;
    blobY += (mouseY - blobY) * 0.03;

    blobs.forEach((blob, i) => {
      const speed = (i + 1) * 12;
      const direction = i % 2 === 0 ? 1 : -1;
      blob.style.transform = `translate(${blobX * speed * direction}px, ${blobY * speed}px)`;
    });

    requestAnimationFrame(animateBlobs);
  }

  animateBlobs();

  // ============================================================
  // 8. PROJECT CARDS — Parallax tilt on hover
  // ============================================================
  const projectCards = document.querySelectorAll('.project-code-window');

  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ============================================================
  // 9. TIMELINE CARDS — Subtle tilt on hover
  // ============================================================
  const timelineCards = document.querySelectorAll('.timeline-card');

  timelineCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
      card.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ============================================================
  // 10. SKILL CHIPS — Glow effect on hover
  // ============================================================
  const skillChips = document.querySelectorAll('.skill-chip');
  skillChips.forEach(chip => {
    chip.addEventListener('mousemove', (e) => {
      const rect = chip.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      chip.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(22,242,179,0.08), var(--bg-card) 60%)`;
    });

    chip.addEventListener('mouseleave', () => {
      chip.style.background = '';
    });
  });

  // ============================================================
  // 11. BLOG/CERT CARDS — Radial hover glow
  // ============================================================
  const blogCards = document.querySelectorAll('.blog-card');
  blogCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(139,92,246,0.06), var(--bg-card) 50%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });

});
