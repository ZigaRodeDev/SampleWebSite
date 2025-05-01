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

/***** Hamburger meni z klikom in zapiranjem zunaj *****/
const hamburger = document.getElementById('hamburger');
const dropdownMenu = document.getElementById('dropdownMenu');

if (hamburger && dropdownMenu) {
  hamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    dropdownMenu.classList.toggle('show');
  });

  document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !dropdownMenu.contains(e.target)) {
      dropdownMenu.classList.remove('show');
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      dropdownMenu.classList.remove('show');
    }
  });
}
});
