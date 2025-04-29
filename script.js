document.addEventListener('DOMContentLoaded', function() {
  /***** Kontaktni obrazec - Formspree implementacija *****/
  var sendBtn = document.getElementById('sendBtn');
  if (sendBtn) {
    sendBtn.addEventListener('click', function(event) {
      event.preventDefault();

      const form = document.getElementById('form');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('mail');
      const questionInput = document.getElementById('question');

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (nameInput.value.trim() === "" || emailInput.value.trim() === "" || questionInput.value.trim() === "") {
        showMessage('Please fill in all fields.', '#dc3545');
        return;
      }

      if (!emailPattern.test(emailInput.value.trim())) {
        showMessage('Please enter a valid email address.', '#dc3545');
        return;
      }

      const formData = new FormData(form);

      showMessage('Sending...', '#007bff');

      fetch("https://formspree.io/f/xwpovbrq", {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        console.log('Response status:', response.status);
        if (response.ok || response.redirected || response.status === 302) {
          showMessage('Message sent successfully!', '#28a745');
          form.reset();
          console.log('Form reset.');
        } else {
          showMessage('Sending failed. Please try again.', '#dc3545');
        }
      })
      .catch(error => {
        console.error('Error sending form:', error);
        showMessage('An error occurred. Please try again.', '#dc3545');
      });
    });
  }

  function showMessage(text, backgroundColor) {
    var messageDiv = document.createElement('div');
    messageDiv.textContent = text;

    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '0';
    messageDiv.style.left = '0';
    messageDiv.style.width = '100%';
    messageDiv.style.backgroundColor = backgroundColor;
    messageDiv.style.color = '#fff';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.padding = '15px';
    messageDiv.style.fontSize = '1.2em';
    messageDiv.style.zIndex = '1000';
    messageDiv.style.transition = 'opacity 0.5s ease';
    messageDiv.style.opacity = '0';

    document.body.appendChild(messageDiv);

    setTimeout(function() {
      messageDiv.style.opacity = '1';
    }, 100);

    setTimeout(function() {
      messageDiv.style.opacity = '0';
      setTimeout(function() {
        messageDiv.remove();
      }, 500);
    }, 3000);
  }

  /***** Hamburger meni in animacija *****/
  const hamburgerWrapper = document.getElementById('hamburgerWrapper');
  const dropdownMenu = document.getElementById('dropdownMenu');

  if (hamburgerWrapper && dropdownMenu) {
    hamburgerWrapper.addEventListener('mouseenter', function () {
      dropdownMenu.classList.add('show');
    });

    hamburgerWrapper.addEventListener('mouseleave', function () {
      dropdownMenu.classList.remove('show');
    });
  }

  /***** DNA dinamične pikice *****/
  var container = document.getElementById('dnaContainer');
  if (container) {
    const numRows = 10;
    const containerHeight = container.clientHeight;
    const verticalSpacing = containerHeight / (numRows + 1);
    const leftX = 30;
    const rightX = container.clientWidth - 30 - 10;

    for (let i = 1; i <= numRows; i++) {
      const y = i * verticalSpacing - 5;

      let dotLeft = document.createElement('div');
      dotLeft.classList.add('dot');
      dotLeft.style.left = leftX + 'px';
      dotLeft.style.top = y + 'px';
      dotLeft.dataset.origX = leftX;
      dotLeft.dataset.origY = y;
      container.appendChild(dotLeft);

      let dotRight = document.createElement('div');
      dotRight.classList.add('dot');
      dotRight.style.left = rightX + 'px';
      dotRight.style.top = y + 'px';
      dotRight.dataset.origX = rightX;
      dotRight.dataset.origY = y;
      container.appendChild(dotRight);
    }

    container.addEventListener('mouseenter', function () {
      const dots = container.querySelectorAll('.dot');
      dots.forEach(dot => {
        const offsetX = Math.random() * 40 - 20;
        const offsetY = Math.random() * 40 - 20;
        dot.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    });

    container.addEventListener('mouseleave', function () {
      const dots = container.querySelectorAll('.dot');
      dots.forEach(dot => {
        dot.style.transform = 'translate(0, 0)';
      });
    });
  }
});
