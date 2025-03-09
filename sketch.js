let gameManager; 
let inputMap;

let shipSprite;
let bulletSprite;
let asteroidSprites = [];

function preload() {
  shipSprite = loadImage("assets/ship.png");
  bulletSprite = loadImage("assets/bullet.png");
  asteroidSprites = [
    loadImage("assets/asteroid-1.png"),
    loadImage("assets/asteroid-2.png")
  ];
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
  gameManager = new GameManager();
  gameManager.spawnPlayer();
  gameManager.spawnLargeAsteroids(7);
}

function draw() {
  background(0);
  gameManager.update();
  fill(255);
  text(`lives: ${gameManager.lives}`, 5, 15)
}
