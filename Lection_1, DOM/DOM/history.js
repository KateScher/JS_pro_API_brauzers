const backButton = document.querySelector(".backButton");
const forwardButton = document.querySelector(".forwardButton");

backButton.addEventListener("click", () => {
  window.history.back();
});

forwardButton.addEventListener("click", () => {
  window.history.forward();
});
