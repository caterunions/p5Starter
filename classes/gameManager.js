class GameManager {
    constructor() {
        
    }

    spawnPlayer() {
        this.ship = new Ship(
            createVector(width/2, height/2), 
            0, 
            createVector(0,0), 
            new Collider(15),
            shipSprite,
            30,
            inputMap,
        )
        console.log("bweh")
    }

    update() {
        this.ship.update();
        this.ship.draw();
    }
}