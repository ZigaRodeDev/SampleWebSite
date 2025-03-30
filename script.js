document.addEventListener('DOMContentLoaded', function() {
  var sendBtn = document.getElementById('sendBtn');

  sendBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prepreči oddajo obrazca

    // Pridobimo obrazec in posamezna polja
    var form = document.querySelector('#form form');
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('mail');
    var questionInput = document.getElementById('question');

    // Preprosta validacija: preverimo, če so vsa polja izpolnjena
    if (nameInput.value.trim() === "" || emailInput.value.trim() === "" || questionInput.value.trim() === "") {
      showMessage('Check the form and try again!', '#dc3545'); // Rdeče obvestilo za napako
      return;
    }

    // Če validacija uspe, prikažemo sporočilo o uspehu
    showMessage('Message sent successfully!', '#28a745');

    // Po uspehu (opcijsko) resetiramo obrazec
    form.reset();
  });

  // Funkcija za prikaz sporočila z fade in/fade out učinkom
  function showMessage(text, backgroundColor) {
    var messageDiv = document.createElement('div');
    messageDiv.textContent = text;

    // Nastavimo osnovne CSS lastnosti za sporočilo
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
    messageDiv.style.opacity = '0'; // Začetno skrito

    // Dodamo sporočilo v telo strani
    document.body.appendChild(messageDiv);

    // Fade in: sporočilo postopoma prikažemo
    setTimeout(function() {
      messageDiv.style.opacity = '1';
    }, 100);

    // Po 3 sekundah sporočilo fade out in odstranimo
    setTimeout(function() {
      messageDiv.style.opacity = '0';
      setTimeout(function() {
        messageDiv.remove();
      }, 500);
    }, 3000);
  }
});
