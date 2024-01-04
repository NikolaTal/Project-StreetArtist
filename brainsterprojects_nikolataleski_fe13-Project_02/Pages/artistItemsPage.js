//ARTIST ITEMS PAGE
// VARIABLES

const artistItemsPage = document.querySelector("#artistItemsPage");
const pageArtistItemsTitle = document.querySelector(".mainItemsTitle");
const pageAddEditArtist = document.querySelector(".mainTitle1");
const addNewItem = document.querySelector("#addNewItem");
const artistCards = document.querySelector("#artistCards");
let titleEdit = document.querySelector(".titleEdit");
let descriptionEdit = document.querySelector(".descriptionEdit");
let typeEdit = document.querySelector(".typeEdit");
let priceEdit = document.querySelector(".priceEdit");
let textInputImageUrl = document.querySelector(".urlEdit");
let imageEdit = document.querySelector(".imageEdit");
const btnSave = document.querySelector("#btnSave");
const btnCancel = document.querySelector("#btnCancel");
const enterSnapshot = document.querySelector("#enterSnapshot");
const capturedImage = document.querySelector("#capturedImage");
const checkboxIsPublishied = document.querySelector("#checkboxIsPublishied");
const editTitle = document.querySelector("#editTitle");
const cameraIcon = document.querySelector("#camera-icon");
const cameraContainer = document.querySelector(".camera-container");
const liveCamera = document.querySelector("#camera-feed");
const captureButton = document.querySelector("#capture-button");
const cameraIcon1 = document.querySelector(".cameraIcon");
const uploadImage = document.querySelector(".uploadImage");
let imageChange;
let isContinueEditting = false;
let editingItem;
let isAdding;

//RENDER CARDS FOR SELECTED ARTIST
function initPageArtistItems() {
  const currentArtist = localStorage.getItem("currentArtist");
  pageArtistItemsTitle.innerHTML = currentArtist;
  const allItems = JSON.parse(localStorage.getItem("allItems"));
  const allItemsForCurrentArtist = allItems.filter((item) => {
    return item.artist === currentArtist;
  });
  artistCards.innerHTML = "";
  allItemsForCurrentArtist.forEach((item) => {
    artistCards.appendChild(createCard(item));
  });
}

//CREATE CARD
function createCard(item, isIncludedButton = true) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card", "mb-5", "w-414", "mx-0");

  const img = document.createElement("img");
  img.classList.add("card-img-top", "h-165");
  img.src = item.image;

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "primary-bg-color", "p-0");

  const titleRow = document.createElement("div");
  titleRow.classList.add("row", "align-items-center", "mx-0");

  const titleCol = document.createElement("div");
  titleCol.classList.add(
    "col-9",
    "card-title",
    "primary-text-color",
    "f-20",
    "py-auto"
  );
  titleCol.innerText = item.title;

  const dateCol = document.createElement("div");
  dateCol.classList.add(
    "col-9",
    "card-title",
    "primary-text-color",
    "f-14",
    "py-auto"
  );
  const date = new Date(item.dateCreated);
  const formatted = date.toString().split("T")[0];
  dateCol.innerText = formatted;

  const priceCol = document.createElement("div");
  priceCol.classList.add("col-3", "d-flex", "align-items-center");
  const priceParagraph = document.createElement("p");
  priceParagraph.classList.add(
    "tertiary-bg-color",
    "secondary-text-color",
    "text-center",
    "days",
    "m-0",
    "w-60"
  );
  priceParagraph.innerText = "$" + Math.floor(item.price);
  priceCol.appendChild(priceParagraph);

  const descriptionRow = document.createElement("div");
  descriptionRow.classList.add("row", "mt-3", "mx-0");

  const descriptionCol = document.createElement("div");
  descriptionCol.classList.add("col", "primary-text-color", "mb-1");
  descriptionCol.innerText = item.description;

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add(
    "row",
    "tertiary-bg-color",
    "py-3",
    "mx-0",
    "w-100"
  );

  const btnAuctionCol = document.createElement("div");
  btnAuctionCol.classList.add(
    "col-4",
    "p-0",
    "d-flex",
    "justify-content-center"
  );
  const btnAuction = document.createElement("button");
  btnAuction.innerText = "Send to Auction";
  btnAuction.classList.add(
    "text-white",
    "w-121",
    "send-to-auction-text-color",
    "buttonsDesign",
    "f-14",
    "p-2",
    "btnAuction"
  );
  btnAuctionCol.appendChild(btnAuction);

  const btnPublishCol = document.createElement("div");
  btnPublishCol.classList.add(
    "col-3",
    "p-0",
    "d-flex",
    "justify-content-center"
  );
  const btnPublish = document.createElement("button");
  btnPublish.innerText = "Publish";
  btnPublish.classList.add(
    "publish-text-color",
    "w-90",
    "bg-white",
    "buttonsDesign",
    "f-14",
    "p-2"
  );
  btnPublishCol.appendChild(btnPublish);

  const btnRemoveCol = document.createElement("div");
  btnRemoveCol.classList.add(
    "col-3",
    "p-0",
    "d-flex",
    "justify-content-center"
  );
  const btnRemove = document.createElement("button");
  btnRemove.innerText = "Remove";
  btnRemove.classList.add(
    "secondary-text-color",
    "w-79",
    "quaternary-bg-color",
    "buttonsDesign",
    "f-14",
    "p-2",
    "btnRemove"
  );
  btnRemoveCol.appendChild(btnRemove);

  const btnEditCol = document.createElement("div");
  btnEditCol.classList.add("col-2", "p-0", "d-flex", "justify-content-center");
  const btnEdit = document.createElement("button");
  btnEdit.innerText = "Edit";
  btnEdit.classList.add(
    "primary-text-color",
    "w-56",
    "primary-bg-color",
    "buttonsDesign",
    "f-14",
    "p-2",
    "btnEdit"
  );
  btnEditCol.appendChild(btnEdit);

  buttonsContainer.appendChild(btnAuctionCol);
  buttonsContainer.appendChild(btnPublishCol);
  buttonsContainer.appendChild(btnRemoveCol);
  buttonsContainer.appendChild(btnEditCol);

  titleCol.appendChild(dateCol);
  titleRow.appendChild(titleCol);
  titleRow.appendChild(priceCol);

  descriptionRow.appendChild(descriptionCol);

  cardBody.appendChild(titleRow);
  cardBody.appendChild(descriptionRow);

  if (isIncludedButton) {
    cardBody.appendChild(buttonsContainer);
  }

  cardDiv.appendChild(img);
  cardDiv.appendChild(cardBody);

  const isPublishied = item.isPublished;

  if (isPublishied) {
    btnPublish.innerText = "Unpublish";
    btnPublish.classList.remove("publish-text-color", "bg-white");
    btnPublish.classList.add("text-white", "bg-green");
  } else {
    btnPublish.innerText = "Publish";
    btnPublish.classList.remove("text-white", "bg-green");
  }

  btnPublish.addEventListener("click", () => {
    const allItems = JSON.parse(localStorage.getItem("allItems"));
    if (btnPublish.innerText === "Publish") {
      btnPublish.innerText = "Unpublish";
      btnPublish.classList.remove("publish-text-color", "bg-white");
      btnPublish.classList.add("text-white", "bg-green");
      allItems.forEach((i) => {
        if (i.id === item.id) {
          i.isPublished = false;
        }
      });
    } else {
      btnPublish.innerText = "Publish";
      btnPublish.classList.remove("text-white", "bg-green");
      allItems.forEach((i) => {
        if (i.id === item.id) {
          i.isPublished = true;
        }
      });
    }
    localStorage.setItem("allItems", JSON.stringify(allItems));
  });

  btnRemove.addEventListener("click", () => {
    const oldArray = JSON.parse(localStorage.getItem("allItems"));
    const newArr = oldArray.filter((i) => i.id !== item.id);
    localStorage.setItem("allItems", JSON.stringify(newArr));
    initPageArtistItems();
  });

  btnEdit.addEventListener("click", () => {
    editingItem = item;
    isAdding = false;
    enterSnapshot.classList.add("p-0");
    uploadImage.style.display = "none";
    cameraIcon1.style.display = "none";
    location.hash = "#artistEditItemPage";
  });

  btnAuction.addEventListener("click", () => {
    item.price = item.price / 2;
    if (!item.isAuctioning) {
      initAuctionTimer(120);
      item.isAuctioning = true;
    }
    localStorage.setItem("auctionItem", JSON.stringify(item));
    location.hash = "#auction";
  });

  return cardDiv;
}

//EDITING CARDS
function initPageEdit() {
  pageAddEditArtist.innerHTML = localStorage.getItem("currentArtist");
  editTitle.innerHTML = isAdding ? "Add New Item" : "Edit Item";
  btnSave.innerHTML = isAdding ? "Add New Item" : "Save";
  if (!isContinueEditting) {
    titleEdit.value = editingItem.title;
    descriptionEdit.value = editingItem.description;
    typeEdit.value = editingItem.type;
    priceEdit.value = editingItem.price;
    textInputImageUrl.value = editingItem.image;
    capturedImage.src = editingItem.image;
    checkboxIsPublishied.checked = editingItem.isPublished;
  }
  isContinueEditting = false;

  btnCancel.addEventListener("click", () => {
    location.hash = "#artists/Items";
  });
}

btnSave.addEventListener("click", () => {
  const allItems = JSON.parse(localStorage.getItem("allItems"));
  const ii = isAdding ? {} : allItems.find((i) => i.id === editingItem?.id);

  ii.title = titleEdit.value;
  ii.description = descriptionEdit.value;
  ii.type = typeEdit.value;
  ii.price = priceEdit.value;
  ii.image = textInputImageUrl.value = imageChange;
  if (isAdding) {
    ii.artist = allArtistsSelector.value;
    ii.id = allItems.length + 1;
    allItems.push(ii);
  }
  ii.isPublished = checkboxIsPublishied.checked;
  localStorage.setItem("allItems", JSON.stringify(allItems));
  location.hash = "#artists/Items";
});

// CAMERA
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  enterSnapshot.addEventListener("click", () => {
    const imageElement = liveContainer.querySelector("img");
    cameraIcon1.style.display = "none";
    uploadImage.style.display = "none";
    if (imageElement) {
      imageElement.style.display = "none";
    }

    liveCamera.style.display = "block";
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        liveCamera.srcObject = stream;
        liveContainer.appendChild(liveCamera);
        mediaStream = stream;
        captureButton.style.display = "block";
      })
      .catch(function (error) {
        console.error("Error accessing camera:", error);
      });
  });

  captureButton.addEventListener("click", () => {
    if (mediaStream) {
      const canvas = document.createElement("canvas");
      const video = document.querySelector("#camera-feed");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, canvas.width, canvas.height);
      textInputImageUrl.value = capturedImage.src =
        canvas.toDataURL("image/png");
      liveCamera.style.display = "none";
      imageChange = capturedImage.src;
      enterSnapshot.classList.add("p-0");
      isContinueEditting = true;
      location.hash = "#artistEditItemPage";
    }
  });
}

//CLICKS
addNewItem.addEventListener("click", () => {
  event.preventDefault();
  editingItem = {
    title: "",
    description: "",
    type: "",
    price: "",
    image: "",
  };
  isAdding = true;
  enterSnapshot.classList.remove("p-0");
  cameraIcon1.style.display = "block";
  uploadImage.style.display = "block";
  location.hash = "#artistEditItemPage";
});

enterSnapshot.addEventListener("click", () => {
  event.preventDefault();
  location.hash = "camera";
});
