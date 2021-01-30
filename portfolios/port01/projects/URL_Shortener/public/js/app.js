// Copying hello pages
let copy_hello = document.querySelector('.copy-hello');

copy_hello.addEventListener('click', () => {
  let hello = "https://url-shrinker0306.herokuapp.com/hello";
  navigator.clipboard.writeText(hello);
});

// Copying other pages
let copy_button = document.getElementsByClassName("copy-link");

for (let i = 0; i < copy_button.length; i++) {
  copy_button[i].addEventListener('click', () => {
    let targetClass = ".target" + i;
    let link = "https://url-shrinker0306.herokuapp.com/";

    link += document.querySelector(targetClass).textContent;
    navigator.clipboard.writeText(link);
  });
}
