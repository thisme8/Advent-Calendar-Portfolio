let imageArray = [
  "src/img/img1.jpg",
  "src/img/img2.jpg",
  "src/img/img7.jpg",
  "src/img/img8.jpg",
  "src/img/img9.jpg",
  "src/img/img13.jpg",
  "src/img/img1.jpg",
  "src/img/img2.jpg",
  "src/img/img7.jpg",
  "src/img/img8.jpg",
  "src/img/img9.jpg",
  "src/img/img13.jpg",
];
let konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

inputSequence = [];

let gameCardMm = document.querySelectorAll(".game-card");
let memoryMap = gameCardMm[1];
let mmEl = document.getElementById("mm-btn");

// function to shuffle the items of the array properly
function shuffleArray(arr) {
  // using Fischer-Yates shuffle for randomly shuffling elements of an array
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// function to arrange cards on the mat
function arrange() {
  memoryMap.innerHTML = `<div class="grid"></div>
                        <button id="rpt-mm-btn">REPEAT</button>
                            <a href="games.html">
                                <button id="return-btn">RETURN</button>
                            </a>`;

  const gridEl = memoryMap.querySelector(".grid");
  const rptMmEl = document.getElementById("rpt-mm-btn");

  // calling the shuffle function
  shuffleArray(imageArray);
  matchedCards = 0; // counter for matched cards
  flippedCards = []; // array keeping count of flipped cards

  imageArray.forEach((imageSrc, index) => {
    let cell = document.createElement("div");
    cell.classList.add("cell");

    // creating the front of the cell element with its src as the image
    let front = document.createElement("div");
    front.classList.add("front");

    // creating the back of the cell element
    let cellBack = document.createElement("div");
    cellBack.classList.add("cell-back");

    let imgEl = document.createElement("img");
    imgEl.src = imageSrc;
    cellBack.appendChild(imgEl);

    // to create an identifier for each individual cell
    cell.dataset.index = index;

    //adding the front and back of the cell
    cell.appendChild(front);
    cell.appendChild(cellBack);

    //adding the cells to the grid
    gridEl.appendChild(cell);

    cell.addEventListener("click", function () {
      if (!cell.classList.contains("flipped") && flippedCards.length < 2)
        cell.classList.add("flipped");
      flippedCards.push(cell);

      if (flippedCards.length === 2) {
        checkMatch();
      }
    });
  });
  rptMmEl.addEventListener("click", () => mmEl.click());
}

function checkMatch() {
  const [firstCard, secondCard] = flippedCards;

  const firstImg = firstCard.querySelector(".cell-back img").src;
  const secondImg = secondCard.querySelector(".cell-back img").src;

  if (firstImg === secondImg) {
    // if the cards match then leave them flipped
    matchedCards += 2;
    flippedCards = [];

    // checking if all cards in the are matched
    if (matchedCards === imageArray.length) {
      setTimeout(() => {
        alert(`Congratulations! You've matched all the cards!`);
      }, 400);
    }
  } else {
    // if the cards do not match then flip them back
    setTimeout(() => {
      flippedCards.forEach((card) => card.classList.remove("flipped"));
      flippedCards = [];
    }, 800);
  }
}

localStorage.setItem("playState", false);

mmEl.addEventListener("click", function () {
  arrange();
  localStorage.setItem("playState", true);
});

document.addEventListener("keydown", (e) => {
  inputSequence.push(e.key);
  inputSequence = inputSequence.slice(-konamiCode.length);
  if (inputSequence.join("") === konamiCode.join("")) {
    if (localStorage.getItem("playState") === "true") {
      let cellEl = document.querySelectorAll(".cell");
      cellEl.forEach((cell) => cell.classList.add("flipped"));
      setTimeout(() => {
        alert(`Congratulations! You've matched all the cards!`);
      }, 400);
    }
  }
});
