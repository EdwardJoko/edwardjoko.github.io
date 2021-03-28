const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-link");
const navLinks = document.querySelectorAll("link");

let i = 0;

burger.addEventListener("click", () => {
  nav.style.display = i == 0 ? "flex" : "none";
  i = i == 0 ? 1 : 0;
});
