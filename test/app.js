// For the loading screen
const main = document.getElementById("main");

function showMain() {
  setTimeout(() => {
    main.style.display = "block";
  }, 1500);
}

// Removing the loading screen from html
const loading = document.getElementById("loading");

function removeLoadingDiv() {
  setTimeout(() => {
    loading.parentNode.removeChild(loading);
  }, 3000);
}

let sections = gsap.utils.toArray(".hello-panel");

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".hello-container",
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    // base vertical scrolling on how wide the container is so it feels more natural.
    end: () => "+=" + document.querySelector(".hello-container").offsetWidth
  }
});

// Run the all functions
const app = () => {
  // Loading screen process
  showMain();
  removeLoadingDiv();

}

app();
