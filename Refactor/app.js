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

// Run the all functions
const app = () => {
  // Loading screen process
  showMain();
  removeLoadingDiv();
}

app();
