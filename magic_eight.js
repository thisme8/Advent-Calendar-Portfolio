let answers = ["✨ Yes ✨", "✨ No ✨", "🤷‍♀️ Maybe 🤷‍♀️"];
let gameCardMe = document.querySelectorAll(".game-card");
const magicEightCard = gameCardMe[3];
let meEl = document.getElementById("me-btn");

function playMe() {
  magicEightCard.innerHTML = `<form>BEWARE!!! Herein lies the answer to all your questions 🔮</form>
                                <br>
                                <br>
                              <div><img src="src/img/me.webp" style="height:250px; width:250px"></img></div>
                                <br>
                              <button id="shake-btn">SHAKE</button>
                              <a href="games.html">
                                <button id="return-btn">RETURN</button>
                              </a>
  `;

  let shakeBtn = document.getElementById("shake-btn");
  shakeBtn.addEventListener("click", function () {
    let answer = Math.floor(Math.random() * 3);
    answer = answers[answer];

    let answerCard = `<form>${answer}</form>
                                <br>
                                <br>
                                <div>
                                  <img src="src/img/me.webp" style="height:250px; width:250px"></img>
                                </div>
                                <br>
                                <button id="rpt-me-btn">REPEAT</button>
                                <a href="games.html">
                                  <button id="return-btn">RETURN</button>
                                </a>
                                 
  `;

    magicEightCard.innerHTML = `<form>The magic 8 ball says...</form>
                                <br>
                                <br>
                                <div class="rotate-image">
                                  <img src="src/img/me.webp" style="height:250px; width:250px" class="rotate-image"></img>
                                </div>
  `;

    setTimeout(() => {
      magicEightCard.innerHTML = answerCard;
      let rptMeEl = document.getElementById("rpt-me-btn");
      rptMeEl.addEventListener("click", () => shakeBtn.click());
    }, 2000);
  });
}

meEl.addEventListener("click", function () {
  console.log("button clicked");
  playMe();
});
