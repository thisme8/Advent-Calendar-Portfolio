const tttEl = document.getElementById("ttt-btn");
const gameCardTtt = document.querySelectorAll(".game-card");
let ticTacToe = gameCardTtt[2];
let newX = 0;
let newY = 0;
let startX = 0;
let startY = 0;

function playTtt() {
  // to show the grid on the game card
  ticTacToe.innerHTML = `<div class="grid-ttt"></div>
                        <div style="display:flex; 
                        flex-wrap: wrap;
                        align-items : center;
                        justify-content: center;
                        position: relative;
                        ">

                            <div  class="icon-o" style ="width:20%;">
                            <i class="fa fa-o fa-3x"></i> 
                            <p>Pick your turn<p>
                            </div>
                            
                            <div style ="width:60%;">
                                <button id="rpt-ttt-btn">REPEAT</button>
                                <a href="games.html">
                                    <button id="return-btn">RETURN</button>
                                </a>
                            </div>

                            <div class="icon-x" style ="width:20%;">   
                            <i  class="fa fa-x fa-3x"></i>
                            <p>Pick your turn<p>
                            </div>

                        </div>`;

  // to create cells one by one in a loop and fill the predefined grid format
  let gridTttEl = document.querySelector(".grid-ttt");
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      gridTttEl.appendChild(cell);
    }
  }

  let rptTttEl = document.getElementById("rpt-ttt-btn");
  rptTttEl.addEventListener("click", () => tttEl.click());
  // Initialize the game with turns
  startGame(gridTttEl);
}

function startGame(gridTttEl) {
  let cellTtt = gridTttEl.querySelectorAll(".cell");
  let iconXEl = document.querySelector(".icon-x");
  let iconOEl = document.querySelector(".icon-o");
  let rptTttEl = document.getElementById("rpt-ttt-btn");

  const winningCombinations = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // main diagonal
    [2, 4, 6], // anti-diagonal
  ];

  /* -------------------------------------------------------------------FOR Checking Winner------------------------------------------------------------------------------------------------------- */

  function checkWinner() {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;

      if (
        cellTtt[a].innerHTML.trim() !== "" &&
        cellTtt[a].innerHTML === cellTtt[b].innerHTML &&
        cellTtt[a].innerHTML === cellTtt[c].innerHTML
      ) {
        return true;
      }
    }
    return false;
  }

  function checkDraw() {
    let array = Array.from(cellTtt);
    return array.every((cell) => cell.innerHTML.trim() !== "");
  }

  /* --------------------------------------------------------------------------FOR X------------------------------------------------------------------------------------------------------- */

  //to listen the click on the X icon
  iconXEl.addEventListener("click", function () {
    iconXEl.innerHTML = `<div class="icon-x">
                            <i class="fa fa-x fa-5x"></i>
                            <p>YOU'RE UP<p>
                        </div>`;
    iconOEl.innerHTML = `<div class="icon-o">
                            <i class="fa fa-o fa-4x"></i>
                        </div>`;

    //for the game to start with X
    let turn = "X";
    rptTttEl.innerHTML = `${turn}'s TURN`;

    cellTtt.forEach((box) => {
      box.addEventListener("click", function () {
        // to prevent the overriding of already-filled cells
        if (box.innerHTML.trim() !== "") return;

        // updating cells with the current player's symbol
        box.innerHTML = `<i class="fa fa-${turn.toLowerCase()} fa-5x"></i>`;

        if (checkWinner()) {
          alert(`🎉🎉🎉It is a clear VICTORY for ${turn} 🎉🎉🎉`);
          rptTttEl.innerHTML = `REPEAT`;
          return;
        }
        if (checkDraw()) {
          rptTttEl.innerHTML = `REPEAT`;
          alert(
            `👏👏👏              Good game Players              👏👏👏 
            
            This means the both of you are WINNERS 🤝 
            
            or......
            
            The both of you are LOSERS 👀`
          );
          return;
        }

        // to switch turns
        turn = turn === "X" ? "O" : "X";

        if (turn === "O") {
          iconOEl.innerHTML = `<div class="icon-o">
                            <i class="fa fa-o fa-5x"></i>
                        </div>`;
          iconXEl.innerHTML = `<div class="icon-x">
                            <i class="fa fa-x fa-3x"></i>
                        </div>`;
        } else {
          iconXEl.innerHTML = `<div class="icon-x">
                            <i class="fa fa-x fa-5x"></i>
                        </div>`;
          iconOEl.innerHTML = `<div class="icon-o">
                            <i class="fa fa-o fa-3x"></i>
                        </div>`;
        }
        rptTttEl.innerHTML = `${turn}'s TURN`;
      });
    });
  });

  /* --------------------------------------------------------------------------FOR O------------------------------------------------------------------------------------------------------- */

  //to listen the click on the O icon
  iconOEl.addEventListener("click", function () {
    iconOEl.innerHTML = `<div class="icon-o">
                            <i class="fa fa-o fa-5x"></i>
                            <p>YOU'RE UP<p>
                        </div>`;
    iconXEl.innerHTML = `<div class="icon-x">
                            <i class="fa fa-x fa-4x"></i>
                        </div>`;

    //for the game to start with O
    let turn = "O";
    rptTttEl.innerHTML = `${turn}'s TURN`;

    cellTtt.forEach((box) => {
      box.addEventListener("click", function () {
        // to prevent the overriding of already-filled cells
        if (box.innerHTML.trim() !== "") return;

        // updating cells with the current player's symbol
        box.innerHTML = `<i class="fa fa-${turn.toLowerCase()} fa-5x"></i>`;

        if (checkWinner()) {
          alert(`🎉🎉🎉It is a clear VICTORY for ${turn} 🎉🎉🎉`);
          rptTttEl.innerHTML = `REPEAT`;
          return;
        }
        if (checkDraw()) {
          rptTttEl.innerHTML = `REPEAT`;
          alert(
            `👏👏👏              Good game Players              👏👏👏 
            
            This means the both of you are WINNERS 🤝 
            
            or......
            
            The both of you are LOSERS 👀`
          );
          return;
        }

        // to switch turns
        turn = turn === "X" ? "O" : "X";

        if (turn === "O") {
          iconOEl.innerHTML = `<div class="icon-o">
                            <i class="fa fa-o fa-5x"></i>
                        </div>`;
          iconXEl.innerHTML = `<div class="icon-x">
                            <i class="fa fa-x fa-3x"></i>
                        </div>`;
        } else {
          iconXEl.innerHTML = `<div class="icon-x">
                            <i class="fa fa-x fa-5x"></i>
                        </div>`;
          iconOEl.innerHTML = `<div class="icon-o">
                            <i class="fa fa-o fa-3x"></i>
                        </div>`;
        }
        rptTttEl.innerHTML = `${turn}'s TURN`;
      });
    });
  });
}

tttEl.addEventListener("click", function () {
  playTtt();
});
