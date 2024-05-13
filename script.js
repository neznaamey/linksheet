var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 7) || 1000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // CSS pro animaci
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};
window.addEventListener('load', function () {
  const loaderContainer = document.getElementById('loaderContainer');
  loaderContainer.style.display = 'none';
});
const animatedText = document.getElementById('animatedText');
let animationInProgress = false;

animatedText?.addEventListener('click', () => {
  if (!animationInProgress) {
    animatedText.classList.add('click-animation');
    animationInProgress = true;

    setTimeout(() => {
      animatedText.classList.remove('click-animation');
      animationInProgress = false;
    }, 500);
  }
});
// Animace po kliknutí na ikonu
const icons = document.querySelectorAll('.icon');
icons.forEach(icon => {
  icon.addEventListener('click', () => {
    icon.classList.add('click-animation'); // Přidáme třídu pro animaci
    setTimeout(() => {
      icon.classList.remove('click-animation'); // Po skončení animace odstraníme třídu
    }, 500);
  });
});

// Zakázání kontextového menu
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});







// Definice pole s texty pro titulky
var titles = ["neznaamey on top", "#neznaameygang", "neznaamey"];
// Index aktuálního titulku
var currentIndex = 0;
// ID intervalu pro změnu titulku
var intervalID;

// Funkce pro změnu titulku
function changeTitle() {
    document.title = titles[currentIndex]; // Nastavení nového titulku
    currentIndex = (currentIndex + 1) % titles.length; // Zajištění cyklického chování
}

// Spuštění cyklu změny titulku
function startTitleChange() {
    intervalID = setInterval(changeTitle, 3000); // Nastavení intervalu pro změnu titulku každých 5 sekund
}

// Okamžité zastavení cyklu změny titulku a změna na statický text
function stopTitleChange() {
    clearInterval(intervalID); // Zrušení intervalu pro změnu titulku
    document.title = "come back pookie <3"; // Nastavení statického textu
}

// Přidání posluchače události 'blur' (opuštění stránky)
window.addEventListener('blur', function() {
    stopTitleChange(); // Okamžité zastavení změny titulku
});

// Přidání posluchače události 'focus' (vrácení na stránku)
window.addEventListener('focus', function() {
    changeTitle(); // Okamžité změna titulku
    startTitleChange(); // Spuštění cyklu změny titulku
});

// Spuštění cyklu změny titulku
startTitleChange();