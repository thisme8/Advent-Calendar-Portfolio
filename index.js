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

const cardContent = [
  {
    title: "INTRODUCTION",
    layout: `
      <div style="text-align: center;">
        <h2 style="color:rgb(4, 4, 55)">${"INTRODUCTION"}</h2>
        <p>Name: Stuti Upreti</p>
        <br>
        <p>Location: Kathmandu, Nepal</p>
        <br>
        <p>Major: Computer Engineering</p>
        <br>
        <p>College: Himalaya College Of Engineering</p>
      </div>`,
  },
  {
    title: "ALMA MATER",
    layout: `
      <div style="text-align: center;">
        <h2 style="color:rgb(4, 4, 55)">${"ALMA MATER"}</h2>
        <ul>
          <li><p>Himalaya College Of Engineering (2021-2025)</p></li>
          <br>
          <li><p>St. Mary's High School (2018-2020)</p></li>
          <br>
          <li><p>St. Mary's Secondary School (2008-2018)</p></li>
        </ul>
      </div>`,
  },
  {
    title: "SKILLS",
    layout: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <h2 style="color:rgb(4, 4, 55)">${"SKILLS"}</h2>
        <table style="border : 2px solid rgb(4, 4, 55); text-align:center; margin:5px">
        <tr>
        <th style="border : 2px solid rgb(4, 4, 55)">Programming Languages</th>
        </tr>
          <tr><td>Python</td></tr>
          <tr><td>JavaScript</td></tr>
          <tr><td>HTML</td></tr>
          <tr><td>CSS</td></tr>
          <tr><td>C Programming</td></tr>
          <tr><td>C++</td></tr>
          <tr><td>SQL</td></tr>
          <tr><td>Dart</td></tr>
        </table>
        
      </div>`,
  },
  {
    title: "TOOLS AND FRAMEWORKS",
    layout: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <h2 style="color:rgb(4, 4, 55)">${"TOOLS AND FRAMEWORKS"}</h2>
        <table style="border : 2px solid rgb(4, 4, 55); text-align:center; margin:5px">
        <tr>
        <th style="border : 2px solid rgb(4, 4, 55)">Tools and Frameworks</th>
        </tr>
          <tr><td>MongoDB</td></tr>
          <tr><td>Express.js</td></tr>
          <tr><td>React</td></tr>
          <tr><td>Node.js</td></tr>
          <tr><td>Flask</td></tr>
          <tr><td>Django</td></tr>
          <tr><td>TensorFlow </td></tr>
          <tr><td>PyTorch</td></tr>
        </table>
        
      </div>`,
  },
  {
    title: "RESUME",
    layout: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <h2 style="color:rgb(4, 4, 55)">${"RESUME"}</h2>
        
        <iframe src="src/resume.pdf" type="pdf" width="350px" height="350px"></iframe>
      </div>`,
  },
];

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
          messageEl.innerHTML = `Please wait ${remainingTime} more seconds(s) to open card ${index}.
                                  Meanwhile, Would you like to play some fun games 
                                  <a href="#section" 
                                     style="color:rgb(4, 4, 55);
                                     font-weight: bold;
                                  ">
                                     Here</a>?`;
        }
      }
    }
    const glideEl = card.querySelector(".glide-btn");
    const overlayEl = document.getElementById("overlay");
    const glideCardEl = document.getElementById("glide-card");
    // Show the glide card on button click
    // Show the glide card on button click
    glideEl.addEventListener("click", () => {
      overlayEl.classList.remove("hidden");
      const selectedContent = cardContent[index];
      glideCardEl.innerHTML = `<div
                                  style="
                                    height: 600px;
                                    width: 600px;
                                    border-radius: 2%;
                                    border: 2px double black;
                                    background-color: #ffeed971;
                                  "
                                     >
                                  <div
                                    style="
                                      height: 500px;
                                      width: 500px;
                                      border-radius: 2%;
                                      border: 2px double black;
                                      background-color: rgba(179, 108, 21, 0.46);
                                      margin: 50px 50px;
                                    "
                                  >
                                    <p>${selectedContent.layout}</p>
                                  </div>
                               </div>`;
    });

    // Hide the glide card when clicking outside the card
    overlayEl.addEventListener("click", (event) => {
      if (event.target === overlayEl) {
        overlayEl.classList.add("hidden");
      }
    });
  });
});
