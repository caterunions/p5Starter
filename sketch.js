let gameManager; 
let inputMap;

let shipSprite;
let bulletSprite;
let asteroidSprites = [];

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
  shootSFX = loadSound("assets/shoot.wav");
  engineSFX = loadSound("assets/engine.wav");
  warpSFX = loadSound("assets/warp.wav");
  explosionSFX = loadSound("assets/explosion.wav");
  bgmSFX = loadSound("assets/bgm.mp3");
}

function setup() {
  bgmSFX.play();
  bgmSFX.loop();
  createCanvas(800, 800);
  inputMap = new InputMappings(
    87,
    68,
    65,
    83,
    32
  );
  resetGame();
}

function draw() {
  background(0);
  gameManager.update();
  fill(255);
  text(`lives: ${gameManager.lives} score: ${gameManager.score}`, 5, 15)
}

function resetGame() {
  gameManager = new GameManager();
  gameManager.spawnPlayer();
  gameManager.spawnLargeAsteroids(7);
}