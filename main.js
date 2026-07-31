document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     STICKY HEADER EFFECT
     ========================================================================== */
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ==========================================================================
     MOBILE NAVIGATION TOGGLE
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  /* ==========================================================================
     ACTIVE LINK HIGHLIGHTING ON SCROLL
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      // Offset by header height
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      
      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });
  });

  /* ==========================================================================
     SCROLL REVEAL ANIMATIONS (Intersection Observer)
     ========================================================================== */
  const scrollElements = document.querySelectorAll('.scroll-reveal');
  
  const elementInView = (el, dividend = 1.15) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };
  
  const displayScrollElement = (element) => {
    element.classList.add('active');
  };
  
  const hideScrollElement = (element) => {
    element.classList.remove('active'); // Optional: removes class when scrolled away
  };
  
  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.1)) {
        displayScrollElement(el);
      }
    });
  };
  
  // Use Intersection Observer for better performance where supported
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Unobserve once animation is triggered to avoid repeats
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters view
    });
    
    scrollElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    window.addEventListener('scroll', handleScrollAnimation);
    // Initial call
    handleScrollAnimation();
  }

  /* ==========================================================================
     CONTACT FORM HANDLING
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formSubmitBtn = document.getElementById('form-submit');
  const formStatus = document.getElementById('form-status');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Visual feedback: disabling submit button, loading state
      const originalBtnText = formSubmitBtn.innerHTML;
      formSubmitBtn.disabled = true;
      formSubmitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-circle-notch fa-spin"></i>';
      
      // Capture form data
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const subject = formData.get('subject');
      const message = formData.get('message');
      
      // Simulate API request/submission
      setTimeout(() => {
        // Simple client-side validation check
        if (name && email && subject && message) {
          // Success State
          formStatus.className = 'form-status success';
          formStatus.textContent = 'Thank you! Your message was sent successfully.';
          contactForm.reset();
        } else {
          // Error State
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Oops! Please fill out all fields before submitting.';
        }
        
        // Reset submit button state
        formSubmitBtn.disabled = false;
        formSubmitBtn.innerHTML = originalBtnText;
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          formStatus.textContent = '';
        }, 5000);
        
      }, 1500); // 1.5 second delay simulation
    });
  }

  /* ==========================================================================
     INTERACTIVE EFFECTS (SVG Nodes Hover Highlight)
     ========================================================================== */
  const svgLines = document.querySelectorAll('.network-svg line');
  const svgNodes = document.querySelectorAll('.network-svg .node');
  
  svgNodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      const cx = node.getAttribute('cx');
      const cy = node.getAttribute('cy');
      
      svgLines.forEach(line => {
        const x1 = line.getAttribute('x1');
        const y1 = line.getAttribute('y1');
        const x2 = line.getAttribute('x2');
        const y2 = line.getAttribute('y2');
        
        // Highlight connections matching the coordinates of the hovered node
        if ((x1 === cx && y1 === cy) || (x2 === cx && y2 === cy)) {
          line.style.stroke = 'rgba(124, 58, 237, 0.7)';
          line.style.strokeWidth = '3';
        }
      });
    });
    
    node.addEventListener('mouseleave', () => {
      svgLines.forEach(line => {
        // Reset to original styling
        line.style.stroke = '';
        line.style.strokeWidth = '';
      });
    });
  });
  
});