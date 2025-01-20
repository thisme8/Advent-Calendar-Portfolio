let cardEl = document.querySelectorAll(".card");
let messageEl = document.getElementById("alert-message");

//function for recording rendering time
function advent() {
  let entryTime = Date.now();
  console.log(entryTime);
  localStorage.setItem("firstEntry", entryTime);
  if (localStorage.getItem("cardState0") != "true") {
    messageEl.innerHTML = `<p>Click the first card to initialize the Calendar 🗓️</p>`;
  } else {
    messageEl.innerHTML = `<div>
                            <img src= src/img/img18.png
                                style = "height:50px; width:50px; border-radius:50%"
                            >
                           </div>`;
  }
}
advent();

// function for saving card's lock state
function saveCardLock(index, lock) {
  localStorage.setItem(`cardLock${index}`, lock);
}

// function for acquiring card's lock state
function getCardLock(index) {
  console.log(localStorage.getItem(`cardLock${index}`));
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
  function checkAndUnlock() {
    let currentTime = Date.now();
    let coolDownTime = index * 30 * 1000;
    let elapsedTime =
      currentTime - JSON.parse(localStorage.getItem("lastOpenTime0"));

    // condition for changing card's lock state
    let lockState = getCardLock(index);
    if (index === 0 || lockState === "unlocked") {
      unlockCard(card, index);
    } else {
      if (
        elapsedTime >= coolDownTime &&
        localStorage.getItem("cardState0") === "true"
      ) {
        unlockCard(card, index);
      } else {
        lockCard(card, index);
      }
    }
  }
  setInterval(checkAndUnlock, 100);

  card.addEventListener("click", function () {
    let currentTime = Date.now();
    const cardKey = `cardState${index}`;
    const cardBackEl = card.querySelector(".card-back");
    messageEl.innerHTML = `<div>
                            <img src= src/img/img18.png
                                style = "height:50px; width:50px; border-radius:50%"
                            >
                           </div>`;

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
      let coolDownTime = index * 30 * 1000;

      let elapsedTime = currentTime - lastOpenTime;

      // For the first card
      if (index === 0) {
        localStorage.setItem(lastOpenTimeKey, currentTime);
        localStorage.setItem(cardKey, "true");

        cardBackEl.innerHTML = `<button class = "glide-btn">SHOW</button>`;
        card.classList.toggle("show-back");
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
          unlockCard(card, index);

          card.classList.toggle("show-back");
          console.log(`Card ${index} opened after waiting.`);
        } else {
          // if the card has not reached the required coolDown time

          const remainingTime = Math.ceil((coolDownTime - elapsedTime) / 1000);
          lockCard(card, index);
          console.log(
            `Please wait ${remainingTime} more seconds(s) to open card ${index}.`
          );
          messageEl.innerHTML = `Please wait ${remainingTime} more seconds(s) to open card ${index}.`;
        }
      }
    }
  });
});
