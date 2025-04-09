document.addEventListener('DOMContentLoaded', function() {
  /***** Kontaktni obrazec *****/
  var sendBtn = document.getElementById('sendBtn');
  if (sendBtn) {
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
  }

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

  /***** Hamburger meni in animacija *****/
  var hamburger = document.getElementById("hamburger");
  if (hamburger) {
    hamburger.addEventListener("mouseenter", function () {
      // Dodamo animacijski razred, ki sproži "smart animate" efekt
      hamburger.classList.add("hover-animate");

      // Odstranili smo preusmeritev, ker URL "home-menu.html" povzroča 404 napako.
      // Če želite preusmeriti, poskrbite, da URL ustreza obstoječi datoteki, npr.:
      // setTimeout(function () {
      //   window.location.href = "index.html"; // Posodobite URL, da ustreza vaši datoteki
      // }, 300);
    });
  }

  /***** DNA dinamične pikice *****/
  var container = document.getElementById('dnaContainer');
  if (container) {
    // Nastavitve: število vrst, razmik med vrstami, fiksni horizontalni položaji
    const numRows = 10; // število vrst (vsaka vrst ima dve pikici)
    const containerHeight = container.clientHeight;
    const verticalSpacing = containerHeight / (numRows + 1);
    const leftX = 30; // fiksna oddaljenost leve pikice
    const rightX = container.clientWidth - 30 - 10; // 10 je širina pikice

    // Ustvarimo dve pikici na vsaki vrstici
    for (let i = 1; i <= numRows; i++) {
      const y = i * verticalSpacing - 5; // prilagoditev, da je pikica centrirana (polovica višine)

      // Leva pikica
      let dotLeft = document.createElement('div');
      dotLeft.classList.add('dot');
      dotLeft.style.left = leftX + 'px';
      dotLeft.style.top = y + 'px';
      // Shranimo prvotni položaj kot podatkovni atribut
      dotLeft.dataset.origX = leftX;
      dotLeft.dataset.origY = y;
      container.appendChild(dotLeft);

      // Desna pikica
      let dotRight = document.createElement('div');
      dotRight.classList.add('dot');
      dotRight.style.left = rightX + 'px';
      dotRight.style.top = y + 'px';
      dotRight.dataset.origX = rightX;
      dotRight.dataset.origY = y;
      container.appendChild(dotRight);
    }

    // Ob premiku kurzorja nad DNA kontejnerjem se pikice "razpršijo"
    container.addEventListener('mouseenter', function () {
      const dots = container.querySelectorAll('.dot');
      dots.forEach(dot => {
        // Naključni offset med -20 in 20 pikslov
        const offsetX = Math.random() * 40 - 20;
        const offsetY = Math.random() * 40 - 20;
        dot.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    });

    // Ob odstranitvi kurzorja se pikice vrnejo na prvotni položaj
    container.addEventListener('mouseleave', function () {
      const dots = container.querySelectorAll('.dot');
      dots.forEach(dot => {
        dot.style.transform = 'translate(0, 0)';
      });
    });
  }
});
