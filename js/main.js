const elForm = document.querySelector(".js-form");
const elInput = document.querySelector(".js-input");
const elList = document.querySelector(".js-list");

const todos = [];

let activePage = 1;

const render = (arr, node) => {
  elList.innerHTML = "";
  for (i of arr) {
    const newItem = document.createElement("li");
    const newBox = document.createElement("div");
    const newImg = document.createElement("img");
    const newTitle = document.createElement("h4");
    const newYear = document.createElement("p");
    const newType = document.createElement("p");

    newItem.setAttribute("class", "col-3");
    newBox.setAttribute("class", "h-100 bg-primary p-4");
    newImg.setAttribute("src", i.Poster);
    newImg.setAttribute("class", "d-block mx-auto w-100");
    newTitle.setAttribute("class", "text-center text-danger mb-0 mt-3");
    newYear.setAttribute("class", "text-center text-warning fs-4 mb-0 mt-3");
    newType.setAttribute("class", "text-center fs-5 text-light");

    newTitle.innerHTML = i.Title;
    newYear.innerHTML = i.Year;
    newType.innerHTML = i.Type;

    node.appendChild(newItem);
    newItem.appendChild(newBox);
    newBox.appendChild(newImg);
    newBox.appendChild(newTitle);
    newBox.appendChild(newYear);
    newBox.appendChild(newType);
  }
};

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  if(elInput.value != ''){
    fetchFunc();
  }
});

function fetchFunc() {
  if(activePage == 1) {
    elPrevBtn.setAttribute("disabled", "true")
  }
  else {
    elPrevBtn.removeAttribute("disabled")
  }
  fetch(
    `https://www.omdbapi.com/?i=tt3896198&apikey=e7f9c222&s=${elInput.value}&page=${activePage}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        render(data.Search, elList);
      }

      if(activePage == Math.ceil(data.totalResults / 10)) {
        elNextBtn.setAttribute("disabled", "true")
      }else {
        elNextBtn.removeAttribute("disabled")
      }
    });
}

const elPrevBtn = document.querySelector(".js-prev")
const elNextBtn = document.querySelector(".js-next")

elPrevBtn.addEventListener("click", () => {
  activePage--;
  fetchFunc()
})

elNextBtn.addEventListener("click", () => {
  activePage++;
  fetchFunc()
})
