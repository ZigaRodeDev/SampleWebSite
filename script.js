document.addEventListener('DOMContentLoaded', () => {
  /***** Contact Form Handling *****/
  const sendBtn = document.getElementById('sendBtn');
  const form = document.querySelector('#form form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('mail');
  const questionInput = document.getElementById('question');

  if (form && nameInput && emailInput && questionInput) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const question = questionInput.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !question) {
        return showMessage('Please fill in all fields.', '#dc3545');
      }

      if (!emailPattern.test(email)) {
        return showMessage('Please enter a valid email address.', '#dc3545');
      }

      showMessage('Sending...', '#007bff');

      try {
        const response = await fetch("https://formspree.io/f/xwpovbrq", {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok || response.redirected || response.status === 302) {
          showMessage('Message sent successfully!', '#28a745');
          form.reset();
        } else {
          showMessage('Sending failed. Please try again.', '#dc3545');
        }
      } catch (error) {
        console.error('Error:', error);
        showMessage('An error occurred. Please try again.', '#dc3545');
      }
    });
  }

  /***** Display Message Helper *****/
  function showMessage(text, backgroundColor) {
    const msg = document.createElement('div');
    Object.assign(msg.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      backgroundColor,
      color: '#fff',
      textAlign: 'center',
      padding: '15px',
      fontSize: '1.2em',
      zIndex: '1000',
      opacity: '0',
      transition: 'opacity 0.5s ease'
    });

    msg.textContent = text;
    document.body.appendChild(msg);

    setTimeout(() => msg.style.opacity = '1', 100);
    setTimeout(() => {
      msg.style.opacity = '0';
      setTimeout(() => msg.remove(), 500);
    }, 3000);
  }

  /***** Hamburger Menu Toggle *****/
  const hamburger = document.getElementById('hamburger');
  const dropdown = document.getElementById('dropdownMenu');
  const hamburgerSpans = hamburger ? hamburger.querySelectorAll('span') : [];

  if (hamburger && dropdown) {
    const toggleMenu = (show) => {
      dropdown.classList.toggle('show', show);
      hamburger.setAttribute('aria-expanded', show ? 'true' : 'false');
      
      // Animate hamburger to X when open
      if (hamburgerSpans.length === 3) {
        if (show) {
          // Transform to X
          hamburgerSpans[0].style.transform = 'rotate(45deg) translate(3px, 3px)';
          hamburgerSpans[1].style.opacity = '0';
          hamburgerSpans[2].style.transform = 'rotate(-45deg) translate(3px, -3px)';
          hamburgerSpans[0].style.width = '22px';
          hamburgerSpans[2].style.width = '22px';
        } else {
          // Reset to hamburger
          hamburgerSpans[0].style.transform = 'none';
          hamburgerSpans[1].style.opacity = '1';
          hamburgerSpans[2].style.transform = 'none';
          hamburgerSpans[0].style.width = '22px';
          hamburgerSpans[1].style.width = '16px';
          hamburgerSpans[2].style.width = '10px';
        }
      }
    };

    const closeMenu = () => toggleMenu(false);
    const openMenu = () => toggleMenu(true);

    hamburger.addEventListener('click', e => {
      e.stopPropagation();
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      toggleMenu(!isExpanded);
    });

    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !dropdown.contains(e.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });
    
    // Add hover effect for menu items
    const menuItems = dropdown.querySelectorAll('a');
    menuItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.style.transition = 'all 0.3s ease';
      });
    });
  }
});
