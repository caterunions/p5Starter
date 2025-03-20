let gameManager = null; 
let inputMap;
let startBtn;
let markForReset = false;
let onLeaderboardScreen = false;
let savedName = '';
let savedScore;
let leaderboard = [];

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
  leaderboard.sort((a, b) => b.score - a.score);
  if(leaderboard === null) {
    leaderboard = [];
  }
}

function draw() {
  background(0);
  fill(255);
  if(markForReset) {
    markForReset = false;
    gameManager = null;
  }
  else if(onLeaderboardScreen) {
    text(`ENTER NAME TO SAVE SCORE OF ${savedScore}: ${savedName}`, width/2, height/2);
  }
  if(gameManager != null) {
    gameManager.update();
    text(`lives: ${gameManager.lives} score: ${gameManager.score}`, 5, 15)
  }
  else if(!onLeaderboardScreen) {
    text(`ASTEROIDS`, width/2, height/3);
    let leaderboardString = 'LEADERBOARD:\n';
    if(leaderboard != null) {
      for(let entry of leaderboard) {
        leaderboardString += `${entry.name}: ${entry.score}\n`;
      }
    }
    text(leaderboardString, 50, 50);
  }
}

function resetGame() {
  gameManager = new GameManager();
  gameManager.spawnPlayer();
  gameManager.spawnLargeAsteroids(7);
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
  if(onLeaderboardScreen) {
    savedName += key;
  }
  if(savedName.length === 3) {
    leaderboard.push(new LeaderboardSave(savedName, savedScore));
    leaderboard.sort((a, b) => b.score - a.score);
    storeItem('leaderboard', leaderboard);
    onLeaderboardScreen = false;
    startBtn.show();
    savedName = '';
  }
}