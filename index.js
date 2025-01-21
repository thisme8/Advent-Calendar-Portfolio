let cardEl = document.querySelectorAll(".card");
let messageEl = document.getElementById("alert-message");
let timeEl = document.getElementById("time-btn");

//function for recording rendering time
function advent() {
  let entryTime = Date.now();
  console.log(entryTime);
  localStorage.setItem("firstEntry", entryTime);

  //to set time-alert message to original state
  let messageOriginal = `<div>
                            <img src= "src/img/img18.png"
                                style = "height:50px; width:50px; border-radius:50%"
                            >
                           </div>`;
  localStorage.setItem("messageOriginal", messageOriginal);

  if (localStorage.getItem("cardState0") != "true") {
    messageEl.innerHTML = `<p>Click the first card to initialize the Calendar 🗓️</p>`;
    setTimeout(() => {
      messageEl.innerHTML = localStorage.getItem("messageOriginal");
    }, 4000);
  } else {
    messageEl.innerHTML = `<div>
                            <img src= "src/img/img18.png"
                                style = "height:50px; width:50px; border-radius:50%"
                            >
                           </div>`;
  }

  //to set timer-collapse message to original state
  let originalTimeContent = `<div><i class="fas fa-clock fa-3x"></i></div>`;
  localStorage.setItem("original", originalTimeContent);

  timeEl.innerHTML = `<div><i class="fas fa-clock fa-3x"></i></div>`;

  timeEl.addEventListener("click", function () {
    for (let i = 0; i < 12; i++) {
      localStorage.setItem(`cardState${i}`, true);
      localStorage.setItem(`cardLock${i}`, "unlocked");
    }
  });
  setTimeout(() => {
    messageEl.innerHTML = messageOriginal;
  });
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

// content for each of the 12 cards
const cardContent = [
  {
    title: "INTRODUCTION",
    layout: `
      <div  style="display: flex; flex-direction: column; align-items: center;">
        <h2 style="color:rgb(4, 4, 55)">${"INTRODUCTION"}</h2>
        <div class="glide-box">Name: Stuti Upreti</div>
        <br>
        <br>
        <div class="glide-box">Location: Kathmandu, Nepal</div>
        <br>
        <br>
        <div class="glide-box">Major: Computer Engineering</div>
        <br>
        <br>
        <div class="glide-box">College: Himalaya College Of Engineering</div>
      </div>`,
  },
  {
    title: "ALMA MATER",
    layout: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <h2 style="color:rgb(4, 4, 55)">${"ALMA MATER"}</h2>
        <ul style="text-align:center; margin:5px">
          <li class="glide-box">Himalaya College Of Engineering (2021-2025)</li>
          <br>
          <br>
          <li class="glide-box">St. Mary's High School (2018-2020)</li>
          <br>
          <br>
          <li class="glide-box">St. Mary's Secondary School (2008-2018)</li>
        </ul>
      </div>`,
  },
  {
    title: "SKILLS",
    layout: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <h2 style="color:rgb(4, 4, 55)">${"SKILLS"}</h2>
        
          <div class="glide-box">Python</div>
          <div class="glide-box">JavaScript</div>
          <div class="glide-box">HTML</div>
          <div class="glide-box">CSS</div>
          <div class="glide-box">C Programming</div>
          <div class="glide-box">C++</div>
          <div class="glide-box">SQL</div>
          <div class="glide-box">Dart</div>
        
        
      </div>`,
  },
  {
    title: "TOOLS AND FRAMEWORKS",
    layout: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <h2 style="color:rgb(4, 4, 55)">${"TOOLS AND FRAMEWORKS"}</h2>

          <div class="glide-box">MongoDB</div>
          <div class="glide-box">Express.js</div>
          <div class="glide-box">React</div>
          <div class="glide-box">Node.js</div>
          <div class="glide-box">Flask</div>
          <div class="glide-box">Django</div>
          <div class="glide-box">TensorFlow </div>
          <div class="glide-box">PyTorch</div>
        
        
      </div>`,
  },
  {
    title: "SOFT SKILLS",
    layout: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <h2 style="color:rgb(4, 4, 55)">${"SOFT SKILLS"}</h2>
      
         <div class="glide-box">Creativity</div>
         <div class="glide-box">Communication Skills</div>
         <div class="glide-box">Teamwork and Collaboration</div>
         <div class="glide-box">Time Management</div>
         <div class="glide-box">Interpersonal Skills</div>
         <div class="glide-box">Emotional Intelligence (EQ)</div>
   
        
      </div>`,
  },
  {
    title: " RELEVANT PROJECTS",
    layout: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <h2 style="color:rgb(4, 4, 55)">${"RELEVANT PROJECTS"}</h2>
        
       

         <div class="glide-box" style="height : 100px; width:550px">
                                <a href="https://github.com/thisme8/bctminor-repo"
                                  style="text-align: center;
                                  font-size: large;
                                  font-weight: bold;
                                  color: white;">
                                Region-Based Crop Yield Prediction in Nepal using LSTM
                                </a>
                                <p>Python, Flask</p>
                                <p>Prediction and Recommendation System</p>
         </div>
  
        <div class="glide-box" style="height : 100px; width:550px"> <a href="https://github.com/thisme8/LeadsTracker"
                                  style="text-align: center;
                                  font-size: large;
                                  font-weight: bold;
                                  color: white;">
                                Leads-Tracker
                                </a>
                                <p>Vanilla Javascript, HTML, CSS</p>
                                <p>Google chrome extension for tracking and storing sales leads</p>
        </div>
  
        <div class="glide-box" style="height : 100px; width:550px"; padding: 6px"> <a href="https://github.com/thisme8/Advent-Calendar-Portfolio"
                                  style="text-align: center;
                                  font-size: large;
                                  font-weight: bold;
                                  color: white;">
                                Advent-Calendar-Portfolio
                                </a>
                                <p>Vanilla Javascript, HTML, CSS</p>
                                <p>Personal portfolio designed as an interactive advent calendar</p>
        </div>
      </div>`,
  },
  {
    title: "RESUME",
    layout: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <h2 style="color:rgb(4, 4, 55)">${"RESUME"}</h2>
        
        <iframe src="src/resume.pdf" type="pdf" width="500px" height="550px"></iframe>
      </div>`,
  },
  {
    title: "KONAMI CODE",
    layout: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <h2 style="color:rgb(4, 4, 55)">${"KONAMI CODE"}</h2>
        
        <div class="glide-box"><i class="fa fa-arrow-up"></i>   <i class="fa fa-arrow-up"></i></div>
         <div class="glide-box"><i class="fa fa-arrow-down"></i>   <i class="fa fa-arrow-down"></i></div>
         <div class="glide-box"><i class="fa fa-arrow-left"></i>   <i class="fa fa-arrow-right"></i></div>
         <div class="glide-box"><i class="fa fa-arrow-left"></i>   <i class="fa fa-arrow-right"></i></div>
         <div class="glide-box"><i class="fa fa-b"></i>   <i class="fa fa-a"></i></div></div>
         
        <form><p>🥳🥳🥳🥳🥳🥳🥳🥳 
        <br>
        <br>
        You have just unlocked the KONAMI CODES🤫 for the 
        <br>
        <br>
        MEMORY MAP🧠 game in the games section 
        <br>
        <br>
        So the memory game for YOU could be to remember THIS code 😎😎
        <br>
        <br>
        Have fun WINNING!! 💪
        </p></form>
        
      </div>`,
  },
  {
    title: "CONTACT INFO",
    layout: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <h2 style="color:rgb(4, 4, 55)">${"CONTACT INFO"}</h2>
        
        <div class="glide-box"><i class="fas fa-phone"></i> Contact No : 
        <a href="tel:+977 9840308107" target="_blank" style="color:white; font-weight:bold">+977 9840308107</a>
        </div>
        <br>
        <br>
        <div class="glide-box"><i class="fas fa-envelope"></i> Email : 
        <a href="mailto: stutiupreti8@gmail.com" target="_blank" style="color:white; font-weight:bold"> stutiupreti8@gmail.com</a>
        </div>
        <br>
        <br>
        <div class="glide-box"><i class="fab fa-linkedin"></i> LinkedIn :
        <a href="https://github.com/thisme8" target="_blank" style="color:white; font-weight:bold">Stuti Upreti</a>
        </div>
        <br>
        <br>
        <div class="glide-box"><i class="fab fa-github"></i> GitHub : 
        <a href="https://github.com/thisme8" target="_blank" style="color:white; font-weight:bold">thisme8</a>
        </div>
        
        
      </div>`,
  },
  {
    title: "SOCIALS",
    layout: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <h2 style="color:rgb(4, 4, 55)">${"SOCIALS"}</h2>
        
        <div class="glide-box"><i class="fab fa-facebook"></i> Facebook : 
        <a href="https://www.facebook.com/innu.upreti" target="_blank" style="color:white; font-weight:bold">Stuti Upreti</a>
        </div>
        <br>
        <br>
        <div class="glide-box"><i class="fab fa-instagram"></i> Instagram : 
        <a href="https://www.instagram.com/stuti_nu/" target="_blank" style="color:white; font-weight:bold">stuti_nu</a>
        </div>
        <br>
        <br>
        <div class="glide-box"><i class="fab fa-twitter"></i> Twitter :
        <a href="https://x.com/stutiupreti8" target="_blank" style="color:white; font-weight:bold">@stutiupreti8</a>
        </div>
        <br>
        <br>
        <div class="glide-box"><i class="fab fa-medium"></i> Medium : 
        <a href="https://medium.com/@stutiupreti8" target="_blank" style="color:white; font-weight:bold">@stutiupreti8</a>
        </div>
        
        
      </div>`,
  },
  {
    title: "COURSES AND CERTIFICATION",
    layout: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <h2 style="color:rgb(4, 4, 55)">${"COURSES AND CERTIFICATION"}</h2>

         <div class="glide-box" style="height : 80px">Flutter Development : 45 hours Training program
                                <br>
                                <p>Certificate of Completion</p>
         </div>
  
        <div class="glide-box" style="height : 80px">MERN Stack Training program
                                <br>
                                <p>Himalaya College Of Engineering, 2024</p>
        </div>
  
        <div class="glide-box" style="height : 80px; padding: 6px ">Infrastructure Cloud Club Camp : workshop
                                <br>
                                <p style="display: flex; flex-direction: row; justify-content: center;">Credly, 2024
                                <a href="https://www.credly.com/badges/452cebfb-322f-4e1d-b17c-6475c1b5eae7/public_url"  target="_blank">
                                <img src="src/img/aws-cloud-clubs-infrastructure-camper.png" style=" width:35px; height:40px; margin-bottom:3px">
                                </a>
                                </p>
        </div>
      </div>`,
  },
  {
    title: "HOBBIES AND INTERESTS",
    layout: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <h2 style="color:rgb(4, 4, 55)">${"HOBBIES AND INTERESTS"}</h2>
        
        <div class="glide-box" style="height : 80px">Creating Fun And Personal Coding Projects 💻</div>
         <div class="glide-box" style="height : 80px">Travel of any form and anywhere 🏕️</div>
         <div class="glide-box" style="height : 80px">Creating Written Pieces ✍️</div>
         <div class="glide-box" style="height : 80px">Exploring fiction and non-fiction works 📖</div>
         
        
        
      </div>`,
  },
];

// creating a NodeList for all the card elements within cardEl from DOM
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

  // to select individual content depending on the index of the array cardContent
  const selectedContent = cardContent[index];

  // to listen to the click event of each of the 12 card elements
  card.addEventListener("click", function () {
    let currentTime = Date.now();
    const cardKey = `cardState${index}`;
    const cardBackEl = card.querySelector(".card-back");
    messageEl.innerHTML = `<div>
                            <img src= src/img/img18.png
                                style = "height:50px; width:50px; border-radius:50%"
                            >
                           </div>`;

    // if an already-opened card has been clicked
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
                                    
                                    <p style="color:rgb(4, 4, 55); font-weight:bold; font-size: 20px; ">${selectedContent.title}</p>
                                    
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

        cardBackEl.innerHTML = `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;">
                                    <p style="
                                        color: rgb(4, 4, 55); 
                                        font-size: 20px; 
                                        font-weight: bold; 
                                        font-family: Arial, sans-serif;">
                                        ${selectedContent.title}
                                    </p>
                                      <button class="glide-btn">SHOW</button>
                                  </div>
                                  `;
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

          cardBackEl.innerHTML = `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;">
                                    <p style="
                                        color: rgb(4, 4, 55); 
                                        font-size: 20px; 
                                        font-weight: bold; 
                                        font-family: Arial, sans-serif;">
                                        ${selectedContent.title}
                                    </p>
                                      <button class="glide-btn">SHOW</button>
                                  </div>
                                  `;
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
          // time-alert message to open the first card before they can open the others
          if (remainingTime <= 0) {
            messageEl.innerHTML = `Firstly, please open the card 0 to open card ${index} with<p style="color:rgb(4, 4, 55); font-weight:bold">${selectedContent.title}.</p>
                                  Or, may be you would like to play some fun games 
                                  <a href="#section" 
                                     style="color:rgb(4, 4, 55);
                                     font-weight: bold;
                                  ">
                                     Here</a>?`;

            timeEl.innerHTML = `Click here to collapse the time-keeping and unlock all cards 
                                <div><i class="fas fa-clock fa-3x"></i></div>`;

            setTimeout(() => {
              messageEl.innerHTML = localStorage.getItem("messageOriginal");
            }, 4000);

            setTimeout(() => {
              timeEl.innerHTML = localStorage.getItem("original");
            }, 4000);
          } else {
            // time-alert message to wait for the coolDown time to pass before the locked card is unlocked
            messageEl.innerHTML = `Please wait ${remainingTime} more seconds(s) to open card ${index} with<p style="color:rgb(4, 4, 55); font-weight:bold">${selectedContent.title}.</p>
                                  Meanwhile, Would you like to play some fun games 
                                  <a href="#section" 
                                     style="color:rgb(4, 4, 55);
                                     font-weight: bold;
                                  ">
                                     Here</a>?`;
            setTimeout(() => {
              messageEl.innerHTML = localStorage.getItem("messageOriginal");
            }, 4000);

            timeEl.innerHTML = `Click here to collapse the time-keeping and unlock all cards 
                                <div><i class="fas fa-clock fa-3x"></i></div>`;
            setTimeout(() => {
              timeEl.innerHTML = localStorage.getItem("original");
            }, 4000);
          }
        }
      }
    }

    // for the glide card to appear on each individual cards
    const glideEl = card.querySelector(".glide-btn");
    const overlayEl = document.getElementById("overlay");
    const glideCardEl = document.getElementById("glide-card");

    // To listen to the click event of glide-btn and show the glide card
    glideEl.addEventListener("click", () => {
      overlayEl.classList.remove("hidden");
      glideCardEl.innerHTML = `<div
                                  style="
                                    height: 800px;
                                    width: 700px;
                                    border-radius: 2%;
                                    border: 2px double black;
                                    background-color: #ffeed971;
                                  "
                                     >
                                  <div
                                    style="
                                      height: 700px;
                                      width: 600px;
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
  // to set the time-alert message to its original state after 5 seconds
  setTimeout(() => {
    messageEl.innerHTML = localStorage.getItem("messageOriginal");
  }, 4000);
});

let reAdventEl = document.getElementById("re-advent-btn");

reAdventEl.addEventListener("click", function () {
  messageEl.innerHTML = `<div>
                            <img src= "src/img/img18.png"
                                style = "height:50px; width:50px; border-radius:50%"
                            >
                           </div>`;
  timeEl.innerHTML = `<div><i class="fas fa-clock fa-3x"></i></div>`;
  localStorage.clear();
});
