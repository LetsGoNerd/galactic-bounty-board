const hunterName = localStorage.getItem("hunterName");
if (hunterName === null || hunterName === "") {
  window.location.href = "index.html";
} else {
  document.querySelector("#welcomeMessage").innerText =
    "Well, look who's here. " + hunterName + ".";
}

// bounty bios
const bounties = [
  {
    name: "Twi'Leaky Fingers", planet: "Nar Shaddaa", danger: "Medium", reward: 8500,
    image: "images/twilek.png",
    bio: "Wanted for slicing into a Hutt's bank account. Accidentally leaked her own location while deleting the evidence. Still insists she's impossible to track."
  },
  {
    name: "TK-404 NOT FOUND", planet: "Corellia", danger: "Ridiculously Really Low", reward: 1,
    image: "images/stormtrooper.png",
    bio: "Fired 47 shots at a stationary crate and missed every single one. The crate has since been promoted."
  },
  {
    name: "Din Djarin't", planet: "Mandalore", danger: "High", reward: 12500,
    image: "images/mandalorian.png",
    bio: "Claims 'This is the Way,' but has never once found the way. Accepted his own bounty twice and still hasn't managed to catch himself."
  },
  {
    name: "IG-0 IQ", planet: "Ryloth", danger: "Low", reward: 3000,
    image: "images/ig-unit.png",
    bio: "Programmed to eliminate high-priority threats. Recently declared a caf machine hostile after it served decaf. Still waiting for backup."
  }
];

const cards = document.querySelectorAll(".bounty-card");
const hologram = document.querySelector("#hologram");
const puck = document.querySelector("#bountyPuck");
const message = document.querySelector("#contractMessage");
const pewSound = new Audio("sounds/pew.mp3");
pewSound.volume = 0.4;
let selectedBounty = 0;

function playSound() {
  pewSound.currentTime = 0;
  pewSound.play();
}

// Change the hologram and details when a bounty is chosen.
function showBounty(index) {
  selectedBounty = index;
  const bounty = bounties[index];

  document.querySelector("#targetImage").src = bounty.image;
  document.querySelector("#targetImage").alt = "Hologram of " + bounty.name;
  document.querySelector("#targetName").innerText = bounty.name.toUpperCase();
  document.querySelector("#targetBio").innerText = bounty.bio;
  document.querySelector("#targetPlanet").innerText = bounty.planet;
  document.querySelector("#targetDanger").innerText = bounty.danger;
  document.querySelector("#targetReward").innerText = bounty.reward.toLocaleString() + (bounty.reward === 1 ? " credit" : " credits");

  // Remove the blue border from every card first.
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove("selected");
  }
  cards[index].classList.add("selected");
  hologram.classList.add("active");
  puck.setAttribute("aria-pressed", "true");
}

// Give each picture its own click event.
for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", function () {
    showBounty(i);
    playSound();
    message.innerText = "Target identified.";
  });
}

// Turn the hologram on or off when the puck is clicked.
puck.addEventListener("click", function () {
  hologram.classList.toggle("active");
  puck.setAttribute("aria-pressed", hologram.classList.contains("active"));
  playSound();
});

// Save the contract the hunter accepts.
document.querySelector("#acceptButton").addEventListener("click", function () {
  localStorage.setItem("activeBountyIndex4", selectedBounty);
  message.innerText = "Consider it yours. Bring them in.";
  playSound();
});

// Restore the last accepted contract when u refresh the page.
const savedBounty = localStorage.getItem("activeBountyIndex4");
if (savedBounty !== null && bounties[Number(savedBounty)] !== undefined) {
  showBounty(Number(savedBounty));
  message.innerText = "You've already got a job.";
} else {
  showBounty(0);
}


const backgroundMusic = document.querySelector(".background-music");
backgroundMusic.volume = 2.5;

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
