//VISITOR LISTING PAGE
// VARIABLES
const filterByTitle = document.querySelector("#filterByTitle");
const filterByArtist = document.querySelector("#filterByArtist");
const filterByMinPrice = document.querySelector("#filterByMinPrice");
const filterByMaxPrice = document.querySelector("#filterByMaxPrice");
const clickAndFilter = document.querySelector("#clickAndFilter");
const filterByType = document.querySelector("#filterByType");
const listingCards = document.querySelector(".listingCards ");
const filterSearch = document.querySelector("#filter");

//RENDERING CARDS FUNCTION FOR VISITOR LISTING PAGE
function renderCards(items) {
  const listingCards = document.querySelector(".listingCards ");

  items.forEach((item, index) => {
    if (!item.isPublished) return;
    if (index % 2 !== 0) {
      const card = document.createElement("div");
      card.classList.add("d-flex", "justify-content-center");
      card.innerHTML += `<div class="card  mt-5 w-100" style="width: 18rem">
      <img
        src="${item.image}"
        class="card-img-top h-165"
      />
      <div class="card-body primary-bg-color">
        <div class="row mx-auto">
          <div class="col-9"><h5 class="card-title f-30 additional-font primary-text-color">${item.artist}</h5></div>
          <div class="col-3 align-content-center d-flex align-items-center"><p class="tertiary-bg-color secondary-text-color text-center days m-0 w-60">${item.price}$</p></div>
        </div>
        <div class="row mx-auto">
          <div class="col">
            <p class="primary-text-color f-18 m-0">${item.title}</p>
          </div>
        </div>
        <div class="row mx-auto">
          <div class="col">
            <p class="card-text p-0 f-14 primary-text-color">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, accusamus.
            </p>
          </div>
        </div>
      </div>
    </div>`;
      listingCards.appendChild(card);
    } else {
      const card = document.createElement("div");
      card.classList.add("d-flex", "justify-content-center");
      card.innerHTML = `<div class="card  mt-5 w-100" style="width: 18rem">
      <img
        src="${item.image}"
        class="card-img-top h-165"
      />
      <div class="card-body tertiary-bg-color">
        <div class="row mx-auto">
          <div class="col-9"><h5 class="card-title f-30 additional-font secondary-text-color">${item.artist}</h5></div>
          <div class="col-3 align-content-center d-flex align-items-center"><p class="primary-bg-color primary-text-color text-center days m-0 w-60">${item.price}$</p></div>
        </div>
        <div class="row mx-auto">
          <div class="col">
            <p class="secondary-text-color f-18 m-0">${item.title}</p>
          </div>
        </div>
        <div class="row mx-auto">
          <div class="col">
            <p class="card-text p-0 f-14 secondary-text-color">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, accusamus.
            </p>
          </div>
        </div>
      </div>
    </div>`;
      listingCards.appendChild(card);
    }
  });
}

//FILTERS
function filterCards() {
  const allItems = JSON.parse(localStorage.getItem("allItems"));
  let isPublished = allItems.filter((item) => item.isPublished === true);
  let titleValue = filterByTitle.value.toLowerCase();
  let artistValue = filterByArtist.value;
  let minPriceValue =
    filterByMinPrice.value ?? parseInt(filterByMinPrice.value);
  let maxPriceValue =
    filterByMaxPrice.value ?? parseInt(filterByMaxPrice.value);
  let typeValue = filterByType.value;

  let filterByValues = isPublished.filter(
    (item) =>
      (titleValue != ""
        ? item.title.toLowerCase().includes(titleValue.toLowerCase())
        : true) &&
      (artistValue === "choose" || item.artist === artistValue) &&
      (minPriceValue ? item.price >= minPriceValue : true) &&
      (maxPriceValue ? item.price <= maxPriceValue : true) &&
      (typeValue != "Choose" ? item.type === typeValue : true)
  );
  listingCards.innerHTML = "";
  renderCards(filterByValues);

  filterByTitle.value = "";
  artistValue = "Choose";
  minPriceValue = "";
  maxPriceValue = "";
  typeValue = "Choose";
}

//CLICKS
clickAndFilter.addEventListener("click", () => {
  event.preventDefault();
  filterCards();
});

