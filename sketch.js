let gameManager; 
let inputMap;

let shipSprite;
let bulletSprite;

function preload() {
  shipSprite = loadImage("assets/ship.png");
  bulletSprite = loadImage("assets/bullet.png");
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
}

function draw() {
  background(0);
  gameManager.update();
}
