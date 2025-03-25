class Powerup {
    constructor(pos) {
        this.position = pos;
        this.powerupIndex = floor(random(0,5))
        switch(this.powerupIndex) {
            case 0:
                this.text = "+1 BULLETS";
                break;
            case 1:
                this.text = "+TRACTION";
                break;
            case 2:
                this.text = "+SPEED";
                break;
            case 3:
                this.text = "+BULLET LIFETIME";
                break;
            case 4:
                this.text = "+BULLET PIERCE";
                break;
        }
    }

    draw() {
        push();
        rectMode(CENTER);
        stroke(255);
        strokeWeight(5);
        fill(0);
        rect(this.position.x, this.position.y, 100, 150);
        stroke(0);
        fill(255);
        text(this.text, this.position.x, this.position.y, 80, 100);
        console.log(this.powerupIndex);
        pop();
    }

    activate() {
        switch(this.powerupIndex) {
            case 0:
                gameManager.ship.multishot++;
                break;
            case 1:
                gameManager.ship.velocityDecay = min(1, gameManager.ship.velocityDecay + 0.01);
                break;
            case 2:
                gameManager.ship.thrustForce *= 1.2;
                break;
            case 3:
                gameManager.ship.bulletLifetime *= 1.2;
                break;
            case 4:
                gameManager.ship.bulletPierce++;
                break;
        }
    }
}