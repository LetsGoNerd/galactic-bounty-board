// Personal challenge: saving the hunter name with localStorage.
const form = document.querySelector("#hunterForm");
const nameInput = document.querySelector("#hunterName");
const message = document.querySelector("#formMessage");
const pewSound = new Audio("sounds/pew.mp3");
pewSound.volume = 0.4;

// Fill in the name if this hunter has visited before.
const savedName = localStorage.getItem("hunterName");
if (savedName !== null) {
  nameInput.value = savedName;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const hunterName = nameInput.value.trim();

  if (hunterName === "") {
    message.innerText = "The Guild doesn't deal with nameless strangers.";
  } else if (hunterName.length < 3) {
    message.innerText = "Even Jawas have longer names. Try again.";
  } else {
    localStorage.setItem("hunterName", hunterName);
    message.innerText = "You're on the roster. Let's see what's out there.";
    pewSound.play();

    setTimeout(function () {
      window.location.href = "bounties.html";
    }, 800);
  }
});

// Background music 
const backgroundMusic = document.querySelector(".background-music");
backgroundMusic.volume = .08;

function startMusic() {
  backgroundMusic.play().then(function () {
    document.removeEventListener("click", startMusic);
    document.removeEventListener("keydown", startMusic);
  }).catch(function () {
  });
}

startMusic();
document.addEventListener("click", startMusic);
document.addEventListener("keydown", startMusic);
