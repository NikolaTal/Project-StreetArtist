//ARTIST HOME PAGE
// VARIABLES
const artistHomePage = document.querySelector("#artistHomePage");
const pageArtistTitle = document.querySelector(".mainTitle");
const liveContainer = document.querySelector(".live");
const liveAuctionItem = document.querySelector("#liveAuctionItem");
const offcanvasButton = document.querySelector('[data-bs-toggle="offcanvas"]');
const offcanvasElement = document.querySelector(".offcanvas");
const livePrice = document.querySelector("#livePrice");
const ctx = document.querySelector("#myChart");
const days7 = document.querySelector("#days7");
const days14 = document.querySelector("#days14");
const days30 = document.querySelector("#days30");

//GET DATE
function initPageArtistHomePage() {
  const currentArtist = localStorage.getItem("currentArtist");
  pageArtistTitle.innerHTML = currentArtist;
  const allItems = JSON.parse(localStorage.getItem("allItems"));
  const allItemsForCurrentArtist = allItems.filter((item) => {
    return item.artist === currentArtist;
  });

  const currentDate = new Date();
  const soldItemsForCurrentArtist = allItemsForCurrentArtist.filter(
    (item) => new Date(item.dateSold) < currentDate
  );

  const totalItemsSold = document.querySelector("#totalItemsSold");
  totalItemsSold.innerHTML = `${soldItemsForCurrentArtist.length} / ${allItemsForCurrentArtist.length}`;

  let totalIncome = 0;
  soldItemsForCurrentArtist.forEach((item) => {
    totalIncome += Math.floor(item.priceSold);
  });
  const auctionItem = JSON.parse(localStorage.getItem("auctionItem"));
  livePrice.innerText =
    Math.floor(auctionItem?.artist === currentArtist && auctionItem?.price) || "/";
  document.querySelector("#totalIncome").innerHTML = totalIncome;
}

//CHART
let chart = null;
function calculateChartData(days) {
  const currentArtist = allArtistsSelector.value;
  const allItems = JSON.parse(localStorage.getItem("allItems"));
  const allItemsForCurrentArtist = allItems.filter((item) => {
    return item.artist === currentArtist;
  });

  const currentDate = new Date();
  const filteredItems = allItemsForCurrentArtist.filter((item) => {
    const itemDate = new Date(item.dateSold);
    const cutoffDate = new Date(currentDate);
    cutoffDate.setDate(currentDate.getDate() - days);
    return itemDate >= cutoffDate && itemDate <= currentDate;
  });
  const groupedData = {};

  const dateLabels = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - i);
    dateLabels.push(date.toISOString().split("T")[0]);
  }

  for (const item of filteredItems) {
    const itemDate = new Date(item.dateSold);
    const dateString = itemDate.toISOString().split("T")[0];
    if (!groupedData[dateString]) {
      groupedData[dateString] = 0;
    }
    groupedData[dateString] += 1;
  }

  const data = dateLabels.map((label) => groupedData[label] || 0);
  return { labels: dateLabels, data };
}

function updateChart(days) {
  const { labels, data } = calculateChartData(days);

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Amount",
          data: data,
          backgroundColor: "#a16a5e",
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: "y",
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

//CLICKS
liveAuctionItem.addEventListener("click", () => {
  event.preventDefault();
  location.hash = "auction";
});

offcanvasButton.addEventListener("click", () => {
  if (offcanvasElement.classList.contains("show")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
});

days7.addEventListener("click", () => {
  updateChart(7);
});

days14.addEventListener("click", () => {
  updateChart(14);
});

days30.addEventListener("click", () => {
  updateChart(30);
});
