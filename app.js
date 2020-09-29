// For the loading screen
const main = document.getElementById('main');

function showMain() {
  setTimeout(() => {
    main.style.display = 'block';
  }, 1500);
}

// Removing the loading screen from html
const loading = document.getElementById("loading");

function removeLoadingDiv() {
  setTimeout(() => {
    loading.parentNode.removeChild(loading);
  }, 3000);
}


// For slider in Projects section
const sliderImages = document.querySelectorAll('.slide');
const left  = document.getElementById('arrow-left');
const right = document.getElementById('arrow-right');
let current = 0;

// init the slide
function reset() {
  for (let i = 0; i < sliderImages.length; i++) {
    sliderImages[i].style.transform = 'translateX(125%)';
  }
}

function startSlide() {
  reset();
  sliderImages[0].style.transform = 'translateX(0)';
  sliderImages[0].style.display = 'flex';
}

// left arrow click
left.addEventListener('click', () => {
  if (current !== 0) {
    sliderImages[current].style.transform = 'translateX(125%)';
    sliderImages[current - 1].style.transform = 'translateX(0)';
    current -= 1;
  } else {
    for (let i = 0; i < sliderImages.length - 1; i++) {
      sliderImages[i].style.transform = 'translateX(-125%)';
    }
    sliderImages[sliderImages.length - 1].style.transform = 'translateX(0)';
    current = sliderImages.length - 1;
  }
});

// right arrow click
right.addEventListener('click', () => {
  if (current !== sliderImages.length - 1) {
    sliderImages[current].style.transform = 'translateX(-125%)';
    sliderImages[current + 1].style.transform = 'translateX(0)';
    current += 1;
  } else {
    startSlide();
    current = 0;
  }
});


// Showing email and number
const show_email  = document.getElementById('show-email');
const show_number = document.getElementById('show-number');
const email_div   = document.querySelector('.email');
const number_div  = document.querySelector('.number');

// init and reset
email_div.style.display  = 'none';
number_div.style.display = 'none';

show_email.addEventListener('click', () => {
  let display = email_div.style.display;
  if (display === 'none') {
    number_div.style.display = 'none';
    email_div.style.display = 'flex';
  }
  else email_div.style.display = 'none';
});

show_number.addEventListener('click', () => {
  let display = number_div.style.display;
  if (display === 'none') {
    email_div.style.display = 'none'
    number_div.style.display = 'flex';
  }
  else number_div.style.display = 'none';
});


// Copying contact to clipboard
const copied      = document.getElementById('copied');
const copy_email  = document.getElementById('copy-email');
const copy_number = document.getElementById('copy-number');

function copiedToClipboard() {
  copied.style.display = 'block';

  setTimeout(() => {
    copied.style.display = 'none';
  }, 1500);
}

function copyEmail() {
  copiedToClipboard();

  let email = document.querySelector('.email_string').textContent;
  navigator.clipboard.writeText(email);
}

copy_email.addEventListener('click', () => copyEmail());

function copyNumber() {
  copiedToClipboard();

  let number = document.querySelector('.number_string').textContent;
  navigator.clipboard.writeText(number);
}

copy_number.addEventListener('click', () => copyNumber());

// Run the all functions
const app = () => {
  // Loading screen process
  showMain();
  removeLoadingDiv();
  // enabling slider in project section
  startSlide();
}

app();
