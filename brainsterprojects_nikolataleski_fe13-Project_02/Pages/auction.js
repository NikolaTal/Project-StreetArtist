//AUCTION PAGE
// VARIABLES
const auctionPlace = document.querySelector(".auctionPlace");
const timer = document.querySelector("#timer");
const results = document.querySelector("#results");
const btnBid = document.querySelector("#bid");
const bidValue = document.querySelector("#bidValue");
const form = document.querySelector("#form");
let bidAmountValue = +"";

const artistOrVisitor = localStorage.getItem("artistOrVisitor");

if (artistOrVisitor === "true") {
  bidValue.style.display = "none";
  btnBid.style.display = "none";
} else {
  bidValue.style.display = "block";
  btnBid.style.display = "block";
}

function initPageAuction() {
  const auctionItem = JSON.parse(localStorage.getItem("auctionItem"));

  auctionPlace.innerHTML = "";
  auctionPlace.appendChild(createCard(auctionItem, false));
}

function endAuction() {
  const auctionItem = JSON.parse(localStorage.getItem("auctionItem"));
  const allItems = JSON.parse(localStorage.getItem("allItems"));
  const index = allItems.findIndex((item) => item.id === auctionItem.id);
  allItems[index] = auctionItem;
  btnBid.disabled = true;
  localStorage.setItem("allItems", JSON.stringify(allItems));
}

//TIMER
function tick() {
  let seconds = localStorage.getItem("timer");
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  document.getElementById(
    "timer"
  ).innerHTML = `Auction time remaining: ${minutes}:${remainingSeconds}`;
  if (seconds > 0) {
    seconds--;
    localStorage.setItem("timer", seconds);
  } else {
    endAuction();
    return;
  }
  setTimeout(tick, 1000);
}

function initAuctionTimer(seconds) {
  localStorage.setItem("biddedPrices", JSON.stringify([]));
  localStorage.setItem("timer", seconds);
  tick();
}

function resetTimer() {
  let seconds = parseInt(localStorage.getItem("timer"), 10);
  seconds += 60;
  localStorage.setItem("timer", seconds);
}

initAuctionTimer(localStorage.getItem("timer"));

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const auctionItem = JSON.parse(localStorage.getItem("auctionItem"));
  let seconds = JSON.parse(localStorage.getItem("timer"));
  if (!auctionItem.isAuctioning || +seconds === 0) return;
  const newBid = bidValue.value;
  if (newBid < 50) {
    alert("Please bid more than $50");
  } else {
    const biddedPrices = JSON.parse(localStorage.getItem("biddedPrices"));
    auctionItem.price += +newBid + bidAmountValue;
    auctionItem.isAuctioning = false;
    auctionItem.dateSold = new Date();
    auctionItem.priceSold = auctionItem.price;
    biddedPrices.push(auctionItem.price);
    localStorage.setItem("biddedPrices", JSON.stringify(biddedPrices));
    localStorage.setItem("auctionItem", JSON.stringify(auctionItem));
    initPageAuction();
  }

  const formData = new FormData();
  formData.set("amount", bidValue.value);
  results.innerHTML += `<li style="padding-left: 100px; list-style-type: none;" class="secondary-text-color">Your bid: $${bidValue.value}</li>`;

  fetch("https://projects.brainster.tech/bidding/api", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.isBidding) {
        results.innerHTML += `<li style="list-style-type: none;" class="secondary-text-color">Other bid: $${data.bidAmount}</li>`;
        bidAmountValue += +data.bidAmount;
        resetTimer();
      } else {
        alert("You won the auction");
        btnBid.disabled = true;
        endAuction();
        initAuctionTimer(0);
      }
    });
});
