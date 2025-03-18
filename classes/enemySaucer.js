class EnemySaucer extends Actor {
    constructor(position, rotation, velocity, collider, sprite, size, directionVec, aimVariance) {
        super(position, rotation, velocity, collider, sprite, size);
        this.addForce(directionVec);
        this.markDead = false;
        this.aimVariance = radians(aimVariance);
        this.bullets = [];
        this.shootOffset = floor(random(0,160));
    }

    update() {
        super.update();
        if((frameCount + this.shootOffset) % 160 === 0) {
            this.shoot();
        }

        for(let bullet of this.bullets) {
            bullet.update();
            bullet.draw();
        }
        this.bullets = this.bullets.filter((bullet) => bullet.lifetime > 0);
    }

    shoot() {
        let aimVec;
        if(gameManager.score > 10000 && this.size === 32) {
            aimVec = p5.Vector.sub(this.position, p5.Vector.add(gameManager.ship.position, p5.Vector.mult(gameManager.ship.velocity, 10)));
        }
        else {
            aimVec = p5.Vector.sub(this.position, gameManager.ship.position)
        }
        
        let aimAngle = atan2(aimVec.y, aimVec.x) - HALF_PI;
        aimAngle += random(-this.aimVariance, this.aimVariance); 
        this.bullets.push(new Bullet (
            this.position.copy(),
            aimAngle,
            createVector(0, 0),
            new Collider(3),
            bulletSprite,
            6,
            10,
            false,
            1.5
        ))
    }
}