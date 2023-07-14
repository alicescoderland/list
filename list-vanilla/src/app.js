import { data } from "./data.js";

let listData = [...data];
const list = document.getElementsByClassName("products")[0];

// CREATE HTML
function createItem(item) {
  const listItem = document.createElement("li");

  const imgElements = document.createElement("div");
  imgElements.classList.add("imgElements");

  const image = document.createElement("img");
  image.src = item.img;
  image.alt = item.title;

  imgElements.appendChild(image);
  listItem.appendChild(imgElements);

  const textElements = document.createElement("div");
  textElements.classList.add("textElements");
  const titleEl = document.createElement("span");
  const yearEl = document.createElement("span");
  const priceEl = document.createElement("span");
  const itemText1 = document.createTextNode(`${item.title}`);
  const itemText2 = document.createTextNode(`Year: ${item.year}yr`);
  const itemText3 = document.createTextNode(`Price: ${item.price} PLN`);

  titleEl.appendChild(itemText1);
  yearEl.appendChild(itemText2);
  priceEl.appendChild(itemText3);

  textElements.appendChild(titleEl);
  textElements.appendChild(yearEl);
  textElements.appendChild(priceEl);

  listItem.appendChild(textElements);
  list.appendChild(listItem);

  const descriptionElements = document.createElement("div");
  descriptionElements.classList.add("descriptionElements");
  const itemText4 = document.createTextNode(`${item.description}`);

  descriptionElements.appendChild(itemText4);
  listItem.appendChild(descriptionElements);
}

let currentPage = 1;
let itemsPerPage = listData.length;
const pageNumbersElement = document.querySelector(".page-numbers");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

// COMPOUND SORTING
const sortingOptionsElements = document.querySelector("#sorting-options");
function handleSortChange(event) {
  const [sortingDirection, field] = event.target.value.split("-");
  const sorted = sortDataByCompoundCriteria(sortingDirection, field);
  listData = sorted;
  renderPage(currentPage, itemsPerPage);
}
sortingOptionsElements.addEventListener("change", handleSortChange);

function sortDataByCompoundCriteria(sortingDirection, field) {
  let sortedArr = [];
  sortedArr = listData.sort((a, b) => {
    const sortValueA = a[field];
    const sortValueB = b[field];

    if (sortingDirection === "asc") {
      return typeof sortValueA === "string"
        ? sortValueA.localeCompare(sortValueB)
        : sortValueA - sortValueB;
    } else {
      return typeof sortValueA === "string"
        ? sortValueB.localeCompare(sortValueA)
        : sortValueB - sortValueA;
    }
  });
  return sortedArr;
}

// PAGING SORTING
const paginationOptionsElements = document.querySelector("#pagination-options");
function handlePaginationChange(event) {
  const value = parseInt(event.target.value);
  itemsPerPage = value;
  renderPage(currentPage, itemsPerPage);
  setItemsPerPageAndPaginate();
}

paginationOptionsElements.addEventListener("change", handlePaginationChange);
renderPage(currentPage, itemsPerPage);

// BUTTON
function renderPage(currentPage, itemsPerPage) {
  const firstItemOnPage = (currentPage - 1) * itemsPerPage;
  const firstItemOnNewPage = firstItemOnPage + itemsPerPage;
  const itemsToRender = listData.slice(firstItemOnPage, firstItemOnNewPage);

  list.innerHTML = "";
  itemsToRender.forEach(createItem);
}

function setItemsPerPageAndPaginate() {
  let totalPages =
    itemsPerPage === 0 ? 1 : Math.ceil(listData.length / itemsPerPage);
  pageNumbersElement.textContent = `Page ${currentPage} of ${totalPages}`;

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;

  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }
  renderPage(currentPage, itemsPerPage || listData.length);
}

prevBtn.addEventListener("click", () => {
  currentPage--;
  setItemsPerPageAndPaginate();
});

nextBtn.addEventListener("click", () => {
  currentPage++;
  setItemsPerPageAndPaginate();
});
