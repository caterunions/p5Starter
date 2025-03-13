class GameManager {
    constructor() {
        this.asteroids = [];
        this.lives = 3;
        this.score = 0;
        this.screenShakeFrames = 0;
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

    addScore(score) {
        if((this.score % 10000) + score >= 10000) {
            this.lives++;
        }
        this.score += score;
    }

    update() {
        push();
        if(this.screenShakeFrames > 0) {
            translate(random(-3,3), random(-3,3));
            this.screenShakeFrames--;
        }
        this.ship.update();
        this.ship.draw();
        //this.ship.debugDrawCollider();

        for(let asteroid of this.asteroids) {
            asteroid.update();
            asteroid.draw();
            //asteroid.debugDrawCollider();

            if(this.ship.invincibilityTimer <= 0 && asteroid.checkCollision(this.ship)) {
                asteroid.markDead = true;
                this.playerDie();
            }

            for(let bullet of this.ship.bullets) {
                if(asteroid.checkCollision(bullet)) {
                    bullet.lifetime = 0;
                    asteroid.markDead = true;
                }
            }
        }

        for(let asteroid of this.asteroids) {
            if(asteroid.markDead) {
                asteroid.health--;
                if(asteroid.health > 0) {
                    this.spawnAsteroids(2, asteroid.health, asteroid.position.copy());
                }
                switch(asteroid.health) {
                    case 2:
                        this.addScore(20);
                        break;
                    case 1:
                        this.addScore(50);
                        break;
                    case 0:
                        this.addScore(100);
                        break;
                }
                this.screenShakeFrames = 5;
                explosionSFX.play();
            }
        }

        this.asteroids = this.asteroids.filter((asteroid) => !asteroid.markDead);

        if(this.asteroids.length === 0) {
            this.spawnLargeAsteroids(7);
        }

        pop();
    }

    playerDie() {
        this.lives --;
        this.spawnPlayer();
        this.ship.invincibilityTimer = 2;
        this.screenShakeFrames = 5;

        if(this.lives === 0) {
            resetGame();
        }
    }

    spawnLargeAsteroids(count) {
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
                1,
                3
            ))
        }
    }

    spawnAsteroids(count, health, position) {
        for(let i = 0; i < count; i++) {
            this.asteroids.push(new Asteroid(
                position.copy(),
                random(0,PI),
                createVector(0,0),
                new Collider(12 * health),
                random(asteroidSprites),
                24 * health,
                2.5 - health / 2,
                health
            ))
        }
    }
}