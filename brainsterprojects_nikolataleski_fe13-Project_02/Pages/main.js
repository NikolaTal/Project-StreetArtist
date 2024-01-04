//LANDING PAGE
// VARIABLES
const api = "https://jsonplaceholder.typicode.com/users";
const allPages = document.querySelectorAll(".allPages");
const landingPage = document.querySelector("#landingPage");
const allArtistsSelector = document.querySelector("#select");
const joinAsArtist = document.querySelector("#joinAsArtist");
const joinAsVisitor = document.querySelector("#joinAsVisitor");
const logos = document.querySelectorAll(".logoArtistHome");
const logoAuction = document.querySelectorAll(".logoAuction");

// HASHCHANGE
document.getElementById("landingPage").style.display = "block";

function handleRoute() {
  const hash = location.hash;
  allPages.forEach((el) => (el.style.display = "none"));

  switch (hash) {
    case "":
    case "#landingPage":
      document.getElementById("landingPage").style.display = "block";
      break;
    case "#artists":
      document.getElementById("artistHomePage").style.display = "block";
      initPageArtistHomePage();
      break;
    case "#artists/Items":
      document.getElementById("artistItemsPage").style.display = "block";
      initPageArtistItems();
      break;
    case "#artists":
      document.getElementById("artistHomePage").style.display = "block";
      break;
    case "#auction":
      document.getElementById("auction").style.display = "block";
      initPageAuction();
      break;
    case "#artistAddNewItemPage":
      document.getElementById("artistAddNewItemPage").style.display = "block";
      break;
    case "#artistEditItemPage":
      document.getElementById("artistEditItemPage").style.display = "block";
      initPageEdit();
      break;
    case "#camera":
      document.getElementById("camera").style.display = "block";
      break;
    case "#visitor":
      document.getElementById("visitorHomePage").style.display = "block";
      break;
    case "#visitor/listing":
      document.getElementById("visitorListingPage").style.display = "block";
      const allItems = JSON.parse(localStorage.getItem("allItems"));
      renderCards(allItems);
      break;
    default:
      document.getElementById("landingPage").style.display = "block";
      location.hash = "#landingPage";
      break;
  }
}

if (!localStorage.getItem("allItems")) {
  localStorage.setItem("allItems", JSON.stringify(items));
}

// DISPLAY ARTISTS
const processName = (fullName) => {
  const words = fullName.split(" ");
  if (words[0] === "Mrs.") {
    return {
      name: words[1],
      surname: words[2][0] + ".",
    };
  } else {
    return {
      name: words[0],
      surname: words[1][0] + ".",
    };
  }
};

//API
fetch(api)
  .then((result) => result.json())
  .then((users) => {
    users.forEach((user) => {
      const fullName = user.name;
      const processedNames = processName(fullName);
      allArtistsSelector.innerHTML += `
        <option value="${fullName}">
          ${processedNames.name} ${processedNames.surname}
        </option>
      `;

      filterByArtist.innerHTML += `
      <option value="${fullName}">
        ${processedNames.name} ${processedNames.surname}
      </option>
    `;
    });
  });

allArtistsSelector.addEventListener("change", function () {
  localStorage.setItem("currentArtist", allArtistsSelector.value);
});

joinAsArtist.addEventListener("click", () => {
  if (allArtistsSelector.value === "choose") {
    allArtistsSelector.focus();
  } else {
    location.hash = "#artists";
    const currentArtist = localStorage.getItem("currentArtist");
    localStorage.setItem("artistOrVisitor", "true");
    localStorage.setItem("currentArtist", currentArtist);
    bidValue.style.display = "none";
    btnBid.style.display = "none";
  }
});

joinAsVisitor.addEventListener("click", () => {
  event.preventDefault();
  location.hash = "#visitor";
  const allItems = JSON.parse(localStorage.getItem("allItems"));
  renderCards(allItems);
  bidValue.style.display = "block";
  btnBid.style.display = "block";
});

logos.forEach((logo) => {
  logo.addEventListener("click", () => {
    event.preventDefault();
    location.hash = "#landingPage";
  });
});

logoAuction.forEach((button) => {
  button.addEventListener("click", () => {
    event.preventDefault();
    location.hash = "auction";
  });
});

window.addEventListener("load", handleRoute);
window.addEventListener("hashchange", handleRoute);
