let gameManager = null; 
let inputMap;
let startBtn;
let markForReset = false;
let onLeaderboardScreen = false;
let savedName = '';
let savedScore;
let leaderboard = [];
let paused = false;

let shipSprite;
let bulletSprite;
let asteroidSprites = [];
let saucerSprite;

let shootSFX;
let engineSFX;
let warpSFX;
let explosionSFX;
let bgmSFX;

function preload() {
  shipSprite = loadImage("assets/ship.png");
  bulletSprite = loadImage("assets/bullet.png");
  asteroidSprites = [
    loadImage("assets/asteroid-1.png"),
    loadImage("assets/asteroid-2.png")
  ];
  saucerSprite = loadImage("assets/saucer.png");
  shootSFX = loadSound("assets/shoot.wav");
  engineSFX = loadSound("assets/engine.wav");
  warpSFX = loadSound("assets/warp.wav");
  explosionSFX = loadSound("assets/explosion.wav");
  bgmSFX = loadSound("assets/bgm.mp3");
}

function setup() {
  createCanvas(800, 800);
  inputMap = new InputMappings(
    87,
    68,
    65,
    83,
    32
  );
  startBtn = createButton('Start');
  startBtn.position(width/2, height/2);
  startBtn.mousePressed(resetGame);
  leaderboard = getItem('leaderboard');
  if(leaderboard === null) {
    leaderboard = [];
  }
  leaderboard.sort((a, b) => b.score - a.score);
}

function draw() {
  background(0);
  fill(255);
  if(markForReset) {
    markForReset = false;
    gameManager = null;
  }
  // draw name save text
  else if(onLeaderboardScreen) {
    text(`ENTER NAME TO SAVE SCORE OF ${savedScore}: ${savedName}`, width/2, height/2);
  }
  // draw lives and score
  if(gameManager != null) {
    gameManager.update();
    text(`LIVES: ${gameManager.lives} SCORE: ${gameManager.score}`, 5, 15)
  }
  // draw title screen
  else if(!onLeaderboardScreen) {
    text(`ASTEROIDS`, width/2, height/3);
    // draw leaderboard
    let leaderboardString = 'LEADERBOARD:\n';
    if(leaderboard != null) {
      for(let entry of leaderboard) {
        leaderboardString += `${entry.name}: ${entry.score}\n`;
      }
    }
    text(leaderboardString, 50, 50);
  }
  // draw powerup message
  if(paused) {
    text(`PRESS KEYS 1-3 TO MAKE POWERUP SELECTION`, width/2 - 150, height/3);
  }
}

function resetGame() {
  // clean gamemanager
  gameManager = new GameManager();
  gameManager.spawnPlayer();
  gameManager.spawnLargeAsteroids(gameManager.levelDifficulty);
  startBtn.hide();
  bgmSFX.play();
  bgmSFX.loop();
}

function endGame(finalScore) {
  markForReset = true;
  onLeaderboardScreen = true;
  savedScore = finalScore;
  bgmSFX.stop();
}

function keyPressed() {
  // type saved name
  if(onLeaderboardScreen) {
    savedName += key;
  }
  // save score if name has 3 characters
  if(savedName.length === 3) {
    leaderboard.push(new LeaderboardSave(savedName, savedScore));
    leaderboard.sort((a, b) => b.score - a.score);
    storeItem('leaderboard', leaderboard);
    onLeaderboardScreen = false;
    startBtn.show();
    savedName = '';
  }
  if(paused) {
    
    if(key === "1" || key === "2" || key === "3") {
      paused = false;
      gameManager.powerups[parseInt(key) - 1].activate();
      gameManager.powerups = [];
    }
  }
}