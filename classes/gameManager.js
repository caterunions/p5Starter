class GameManager {
    constructor() {
        this.asteroids = [];
        this.lives = 5;
    }

    spawnPlayer() {
        this.ship = new Ship(
            createVector(width/2, height/2), 
            0, 
            createVector(0,0), 
            new Collider(10),
            shipSprite,
            30,
            inputMap,
        )
    }

    update() {
        this.ship.update();
        this.ship.draw();
        //this.ship.debugDrawCollider();

        for(let asteroid of this.asteroids) {
            asteroid.update();
            asteroid.draw();
            //asteroid.debugDrawCollider();

            if(this.ship.invincibilityTimer <= 0 && asteroid.checkCollision(this.ship)) {
                this.playerDie();
                asteroid.markDead = true;
            }

            for(let bullet of this.ship.bullets) {
                if(asteroid.checkCollision(bullet)) {
                    asteroid.markDead = true;
                    bullet.lifetime = 0;
                }
            }
        }

        this.asteroids = this.asteroids.filter((asteroid) => !asteroid.markDead);
    }

    playerDie() {
        this.lives --;
        this.spawnPlayer();
        this.ship.invincibilityTimer = 2;
    }

    spawnAsteroids(count) {
        for(let i = 0; i < count; i++) {
            let axis = floor(random(0,4))
            let spawnPos = createVector(0, 0);

            if(axis === 0) {
                spawnPos.set(random(0, width), 0);
            }
            else if(axis === 1) {
                spawnPos.set(random(0, width), height);
            }
            else if(axis === 2) {
                spawnPos.set(0, random(0, height));
            }
            else if (axis === 3) {
                spawnPos.set(width, random(0, height));
            }
            this.asteroids.push(new Asteroid(
                spawnPos,
                random(0,PI),
                createVector(0,0),
                new Collider(32),
                random(asteroidSprites),
                64,
                random(1,2)
            ))
        }
    }
}