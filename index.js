let cardEl = document.querySelectorAll(".card");

// function for saving card's lock state
function saveCardLock(index, lock) {
  localStorage.setItem(`cardLock${index}`, lock);
}

// function for acquiring card's lock state
function getCardLock(index) {
  return localStorage.getItem(`cardLock${index}`);
}

// function to unlock a card
function unlockCard(card, index) {
  saveCardLock(index, "unlocked");
  card.classList.remove("card-locked");
  card.classList.add("card-unlocked");
  const lockIndicator = card.querySelector(".lock-indicator");
  if (lockIndicator) lockIndicator.textContent = "🔓";
}

// function to lock a card
function lockCard(card, index) {
  saveCardLock(index, "locked");
  card.classList.remove("card-unlocked");
  card.classList.add("card-locked");
  const lockIndicator = card.querySelector(".lock-indicator");
  if (lockIndicator) lockIndicator.textContent = "🔐";
}

cardEl.forEach((card, index) => {
  //   for locking and unlocking card without event listener

  let currentTime = Date.now();
  let lastOpenTimeKey = `lastOpenTime${index}`;
  let lastOpenTime = JSON.parse(localStorage.getItem(lastOpenTimeKey) || "0");

  let coolDownTime = index * 5 * 1000;
  let elapsedTime = currentTime - lastOpenTime;

  let lockedEl = card.getElementsByClassName("card-unlocked");

  // condition for changing card's lock state
  let lockState = getCardLock(index);
  if (index === 0 || getCardLock(index) === "unlocked") {
    unlockCard(card, index);
  } else {
    if (elapsedTime >= coolDownTime) {
      unlockCard(card, index);
    } else {
      lockCard(card, index);
    }
  }

  card.addEventListener("click", function () {
    let currentTime = Date.now();
    const cardKey = `cardState${index}`;
    const cardBackEl = card.querySelector(".card-back");

    // if an already opened card has been clicked
    if (localStorage.getItem(cardKey) === "true") {
      cardBackEl.innerHTML = `<div style="text-align: center;">
                                    <p style="
                                        font-size: 20px;
                                        font-weight: bold;
                                        font-family: Arial, sans-serif;
                                        margin-bottom: 10px;">
                                        
                                        You opened this one already......
                                    
                                    <br/>
                                    
                                    You Silly You!!!</p>
                                    
                                    <br/>
                                    
                                    <button class = "glide-btn">SHOW</button>
                                </div>`;
      unlockCard(card, index);
      console.log("card has been opened already");
      card.classList.toggle("show-back");
    } else {
      // if the card hasn't been opened yet
      let lastOpenTimeKey = `lastOpenTime${index}`;
      let lastOpenTime = JSON.parse(
        localStorage.getItem("lastOpenTime0") || "0"
      );
      let coolDownTime = index * 5 * 1000;

      let elapsedTime = currentTime - lastOpenTime;

      // For the first card
      if (index === 0) {
        localStorage.setItem(lastOpenTimeKey, currentTime);
        localStorage.setItem(cardKey, "true");

        cardBackEl.innerHTML = `<button class = "glide-btn">SHOW</button>`;
        card.classList.toggle("show-back");
        unlockCard(card, index);
        console.log("Card 0 opened for the first time");
      } else {
        // Check if enough time has passed (e.g., `index` minutes since last open)
        // and if the first card has been opened
        if (
          elapsedTime >= coolDownTime &&
          localStorage.getItem("cardState0") === "true"
        ) {
          localStorage.setItem(lastOpenTimeKey, currentTime);
          localStorage.setItem(cardKey, "true");

          cardBackEl.innerHTML = `<button class = "glide-btn">SHOW</button>`;

          card.classList.toggle("show-back");
          unlockCard(card, index);
          console.log(`Card ${index} opened after waiting.`);
        } else {
          // if the card has not reached the required coolDown time

          const remainingTime = Math.ceil(
            (coolDownTime - elapsedTime) / 1000 / 60
          );
          lockCard(card, index);
          console.log(
            `Please wait ${remainingTime} more minute(s) to open card ${index}.`
          );
        }
      }
    }
  });
});

//   if (index === 0) {
//     Minutes = currentTime.getMinutes(index);
//     localStorage.setItem("Minutes", Minutes);

//     card.classList.toggle("show-back");
//     console.log(localStorage.getItem(Minutes));
//   } else {
//     Minutes = currentTime.getMinutes(index);
//     if (Minutes >= currentTime.getMinutes(index[0]) + 1) {
//       card.classList.toggle("show-back");
//       localStorage.setItem("Minutes", Minutes);
//       console.log(localStorage.getItem(Minutes));
//     }
//   }

//   if (index === 0) {
//     Minute = currentTime.getMinutes();
//     card.classList.toggle("show-back");
//     cardBackEl.innerHTML = `<button class = "glide-btn">SHOW</button>`;

//     localStorage.setItem("Minute", Minute);
//     localStorage.setItem(cardKey, "true");

//     console.log(localStorage.getItem(`Minutes${index}`));
//     console.log("card is being opened for the first time");
//   } else {
//     let Minutes = currentTime.getMinutes();
//     if (
//       Minutes === parseInt(localStorage.getItem(Minute)) + index ||
//       Minutes > parseInt(localStorage.getItem(Minute)) + index
//     ) {
//       card.classList.toggle("show-back");
//       cardBackEl.innerHTML = `<button class = "glide-btn">SHOW</button>`;

//       localStorage.setItem(`Minutes${index}`, Minutes);
//       localStorage.setItem(cardKey, "true");

//       console.log(localStorage.getItem(`Minutes${index}`));
//       console.log("card is being opened for the first time");
//     } else {
//       console.log(`please wait ${index} minutes`);
//     }
//   }

// const glideEl = card.querySelector(".glide-btn");
// glideEl.addEventListener("click", function () {
//   console.log("glide button pressed");
// });
