let gameManager; 
let shipSprite;
let inputMap;

function preload() {
  shipSprite = loadImage("assets/ship.png");
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
