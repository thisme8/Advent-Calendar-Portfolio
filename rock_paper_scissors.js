let hands = ["🪨", "📄", "✂️"];
let firstHand = 0;
let secondHand = 0;
let gameCardRps = document.querySelectorAll(".game-card");
let rockPaperScissors = gameCardRps[0];
let rpsEl = document.getElementById("rps-btn");
let message = "";
let count1 = 0;
let count2 = 0;
let i = 0;

function playRps() {
  count1 = 0;
  count2 = 0;
  rockPaperScissors.innerHTML = `<form>${" First Hand "}</form>
                        <form>${" Second Hand "}</form>
                        <p>${" "}</p>
                        <table>
                        <tr>
                        <td>First Hand</td>
                        <td>Second Hand</td>
                        </tr>
                        <tr>
                        <td>${count1}</td>
                        <td>${count2}</td>
                        </tr>
                        </table>
                        <button id="shoot-btn">SHOOT</button>
                        <button id="rpt-btn">RACE TO THREE</button>
                        <button id="rpf-btn">RACE TO FIVE</button>
                        <a href="games.html">
                        <button id="return-btn">RETURN</button>
                        </a>
                        <br>
                        `;

  let shootEl = document.getElementById("shoot-btn");
  shootEl.addEventListener("click", function () {
    i = 1;
    shoot();
  });

  let rptEl = document.getElementById("rpt-btn");
  rptEl.addEventListener("click", function () {
    i = 3;
    shoot();
  });

  let rpfEl = document.getElementById("rpf-btn");
  rpfEl.addEventListener("click", function () {
    i = 5;
    shoot();
  });
}

function shoot() {
  firstHand = Math.floor(Math.random() * 3);
  secondHand = Math.floor(Math.random() * 3);

  if (
    (firstHand === 0 && secondHand === 1) ||
    (firstHand === 1 && secondHand === 2) ||
    (firstHand === 2 && secondHand === 0)
  ) {
    message = `the First Hand is ${hands[firstHand]}, the Second Hand is ${hands[secondHand]} <br> 
    The Second Hand wins this round`;
    count2 += 1;
    count1 = count1;
    rockPaperScissors.innerHTML = `<form>${hands[firstHand]}</form>
                        <form>${hands[secondHand]}</form>
                        <p>${[message]}</p>
                        <table>
                        <tr>
                        <td>First Hand</td>
                        <td>Second Hand</td>
                        </tr>
                        <tr>
                        <td>${count1}</td>
                        <td>${count2}</td>
                        </tr>
                        </table>
                        <button id="shoot-btn">SHOOT</button>
                        <a href="games.html">
                        <button id="return-btn">RETURN</button>
        
                        </a>`;
  } else if (firstHand === secondHand) {
    message = `the First Hand is ${hands[firstHand]}, the Second Hand is ${hands[secondHand]} <br> 
    There are no winners or losers`;
    count1 = count1;
    count2 = count2;
    rockPaperScissors.innerHTML = `<form>${hands[firstHand]}</form>
                        <form>${hands[secondHand]}</form>
                        <p>${[message]}</p>
                        <table>
                        <tr>
                        <td>First Hand</td>
                        <td>Second Hand</td>
                        </tr>
                        <tr>
                        <td>${count1}</td>
                        <td>${count2}</td>
                        </tr>
                        </table>
                        <button id="shoot-btn">SHOOT</button>
                        <a href="games.html">
                        <button id="return-btn">RETURN</button>
                        </a>`;
  } else {
    message = `the First Hand is ${hands[firstHand]}, the Second Hand is ${hands[secondHand]} <br> 
    The First Hand wins this round `;
    count1 += 1;
    count2 = count2;
    rockPaperScissors.innerHTML = `<form>${hands[firstHand]}</form>
                        <form>${hands[secondHand]}</form>
                        <p>${message}</p>
                        <table>
                        <tr>
                        <td>First Hand</td>
                        <td>Second Hand</td>
                        </tr>
                        <tr>
                        <td>${count1}</td>
                        <td>${count2}</td>
                        </tr>
                        </table>
                        <button id="shoot-btn">SHOOT</button>
                        <a href="games.html">
                        <button id="return-btn">RETURN</button>
                        </a>`;
  }

  let shootEl = document.getElementById("shoot-btn");
  if (count1 < i && count2 < i) {
    shootEl.addEventListener("click", function () {
      shoot();
    });
  } else {
    if (count1 > count2) {
      rockPaperScissors.innerHTML = `<form>${hands[firstHand]}</form>
                        <form>${hands[secondHand]}</form>
                        <p>${message}</p>
                        <table>
                        <tr>
                        <td>First Hand</td>
                        <td>Second Hand</td>
                        </tr>
                        <tr>
                        <td>${count1}</td>
                        <td>${count2}</td>
                        </tr>
                        </table>
                        <p>The First Hand wins with ${count1} points🏆🏆🏆</p>
                        
                        <button id="shoot-btn">YAY! YOU RACED TO ${i}</button>
                        <button id="restart-btn">RESTART</button>
                        <a href="games.html">
                        <button id="return-btn">RETURN</button>
                        </a>`;
    } else {
      rockPaperScissors.innerHTML = `<form>${hands[firstHand]}</form>
                        <form>${hands[secondHand]}</form>
                        <p>${message}</p>
                        <table>
                        <tr>
                        <td>First Hand</td>
                        <td>Second Hand</td>
                        </tr>
                        <tr>
                        <td>${count1}</td>
                        <td>${count2}</td>
                        </tr>
                        </table>
                        <p>The Second Hand wins with ${count2} points🏆🏆🏆</p>
                        
                        <button id="shoot-btn">YAY! YOU RACED TO ${i}</button>
                        <button id="restart-btn">RESTART</button>
                        <a href="games.html">
                        <button id="return-btn">RETURN</button>
                        </a>`;
    }
  }

  let rstEl = document.getElementById("restart-btn");
  rstEl.addEventListener("click", function () {
    playRps();
  });
}

rpsEl.addEventListener("click", function () {
  playRps();
});
