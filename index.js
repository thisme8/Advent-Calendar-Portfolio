let cardEl = document.querySelectorAll(".card");

cardEl.forEach((card, index) => {
  card.addEventListener("click", function () {
    const cardKey = `cardState${index}`;
    const cardBackEl = card.querySelector(".card-back");

    if (localStorage.getItem(cardKey) === "true") {
      cardBackEl.innerHTML = `<div style="text-align: center;">
                                    <p style="
                                        font-size: 20px;
                                        font-weight: bold;
                                        font-family: Arial, sans-serif;
                                        margin-bottom: 10px;">
                                        
                                        You opened this one already....
                                    
                                    <br/>
                                    
                                    You Silly You!!!</p>
                                    
                                    <br/>
                                    
                                    <button class = "glide-btn">SHOW</button>
                                </div>`;

      console.log("card has been opened already");
    } else {
      cardBackEl.innerHTML = `<button class = "glide-btn">SHOW</button>`;
      console.log("card is being opened for the first time");
      localStorage.setItem(cardKey, "true");
    }
    card.classList.toggle("show-back");
    console.log(localStorage.getItem(cardKey));
  });
});
