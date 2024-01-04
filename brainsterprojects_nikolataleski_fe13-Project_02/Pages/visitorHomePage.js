//VISITOR HOME PAGE
// VARIABLES
const findOneNow = document.querySelector(".findOneNow");
const sliders = document.querySelector(".sliders");

//CLICKS
findOneNow.addEventListener("click", () => {
  event.preventDefault();
  location.hash = "#visitor/listing";
});

sliders.addEventListener("click", () => {
  event.preventDefault();
  location.hash = "#visitor/listing";
});