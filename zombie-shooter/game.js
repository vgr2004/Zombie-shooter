//Declaring and assigning values for the variables and constants
const gameBody = document.getElementById("game-body");
const $lives = document.getElementById("lives");
var seconds = document.getElementById("timer").textContent;
var zombieId = 0;
const img = [
  "zombie-1.png",
  "zombie-2.png",
  "zombie-4.png",
  "zombie-5.png",
  "zombie-6.png",
];
// Gun shot sound
const expAudio = new Audio(
  "https://freespecialeffects.co.uk/soundfx/weapons/shotgun_3.wav"
);
expAudio.volume = 0.2;
gameBody.onclick = () => {
  expAudio.pause();
  expAudio.currentTime = 0;
  expAudio.play();
};
// Background sound
const backgroundSound = new Audio(
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/soundtrack.mp3"
);
backgroundSound.play();
backgroundSound.loop = true;

//Lives
var lives = 4;

//Iteration 5: Write a function to create a zombie

function makeZombie() {
  randomImage = img[getRandomInt(0, img.length)];
  gameBody.innerHTML += `<img src="https://cdn.jsdelivr.net/gh/Kalvium-Program/zombie-shoot-game-final@main/assets/${randomImage}" class="zombie-image" id="zombie${zombieId}">`;
  let zombie = document.getElementById("zombie" + zombieId);
  zombie.style.transform = `translateX(${getRandomInt(20, 80)}vw)`;
  zombie.style.animationDuration = `${getRandomInt(2, 6)}s`;
  zombie.onclick = () => {
    zombieDestruct(zombie);
  };
}

// Iteration 6: Write a Function to find if the player missed a zombie

function checkCollision(zombie) {
  if (zombie.getBoundingClientRect().top <= 0) {
    lives--;
    return true;
  }
  return false;
}

// Iteration 7: Write a Function to destroy a zombie when it is shot

function zombieDestruct(zombie) {
  zombie.style.display = "none";
  zombieId++;
  makeZombie();
}

// Timer

var timer = setInterval(function () {
  seconds--;
  document.getElementById("timer").textContent = seconds;
  let zombie = document.getElementById("zombie" + zombieId);
  if (checkCollision(zombie) == true) {
    zombieDestruct(zombie);
    if (lives == 0) {
      clearInterval(timer);
      location.href = "./game-over.html";
    }
  }
  if (seconds == 0) {
    clearInterval(timer);
    location.href = "./win.html";
  }
}, 1000);

// Start the game by calling the first zombie

makeZombie();

// Helper function to get random integer

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
