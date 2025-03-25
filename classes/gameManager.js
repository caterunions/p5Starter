class GameManager {
    constructor() {
        this.asteroids = [];
        this.saucers = [];
        this.particles = [];
        this.powerups = [];
        this.lives = 3;
        this.score = 0;
        this.screenShakeFrames = 0;
        this.levelDifficulty = 5;
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
        if((this.score % 1000) + score >= 1000) {
            this.spawnSaucer();
        }
        this.score += score;
    }

    update() {
        push();
        if(this.screenShakeFrames > 0) {
            translate(random(-3,3), random(-3,3));
            this.screenShakeFrames--;
        }

        for(let particle of this.particles) {
            particle.update();
            particle.draw();
        }

        for(let powerup of this.powerups) {
            powerup.draw();
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
                    bullet.pierce--;
                    if(bullet.pierce <= 0) {
                        bullet.lifetime = 0;
                    }
                    asteroid.markDead = true;
                }
            }
        }

        for(let saucer of this.saucers) {
            saucer.update();
            saucer.draw();
            //saucer.debugDrawCollider();

            for(let asteroid of this.asteroids) {
                if(asteroid.checkCollision(saucer)) {
                    asteroid.markDead = true;
                    saucer.markDead = true;
                }
                for(let bullet of saucer.bullets) {
                    if(asteroid.checkCollision(bullet)) {
                        bullet.lifetime = 0;
                        asteroid.markDead = true;
                    }
                }
            }

            for(let bullet of this.ship.bullets) {
                if(saucer.checkCollision(bullet)) {
                    bullet.pierce--;
                    if(bullet.pierce <= 0) {
                        bullet.lifetime = 0;
                    }
                    saucer.markDead = true;
                }
            }

            for(let bullet of saucer.bullets) {
                if(this.ship.invincibilityTimer <= 0 && bullet.checkCollision(this.ship)) {
                    bullet.lifetime = 0;
                    this.playerDie();
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
                this.spawnParticle(15,asteroid.position,0,TWO_PI,1,3,1,3,0.2,0.5);
            }
        }

        for(let saucer of this.saucers) {
            if(saucer.markDead) {
                if(saucer.size === 64) {
                    this.addScore(200);
                }
                else {
                    this.addScore(1000);
                }
                this.screenShakeFrames = 5;
                explosionSFX.play();
            }
        }

        this.asteroids = this.asteroids.filter((asteroid) => !asteroid.markDead);
        this.saucers = this.saucers.filter((saucer) => !saucer.markDead);
        this.particles = this.particles.filter((particle) => particle.lifetime > 0);

        if(this.asteroids.length === 0) {
            this.incrementLevel();
        }

        pop();
    }

    incrementLevel() {
        paused = true;
        this.levelDifficulty++;
        this.spawnLargeAsteroids(this.levelDifficulty);
        this.powerups.push(new Powerup(createVector(width/2 - 100,height/2)));
        this.powerups.push(new Powerup(createVector(width/2,height/2)));
        this.powerups.push(new Powerup(createVector(width/2 + 100,height/2)));
    }

    playerDie() {
        this.spawnParticle(30,this.ship.position,0,TWO_PI,3,5,1,3,0.7,1.5);
        this.lives --;
        this.spawnPlayer();
        this.ship.invincibilityTimer = 2;
        this.screenShakeFrames = 5;
  
        if(this.lives === 0) {
            endGame(this.score);
        }
    }

    spawnLargeAsteroids(count) {
        for(let i = 0; i < count; i++) {
            this.asteroids.push(new Asteroid(
                this.pickScreenEdge(),
                random(0,PI),
                createVector(0,0),
                new Collider(32),
                random(asteroidSprites),
                64,
                1,
                3
            ));
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
            ));
        }
    }

    spawnSaucer() {
        if(random() > 0.7) {
            // small saucer
            this.saucers.push(new EnemySaucer(
                this.pickScreenEdge(),
                0,
                createVector(0,0),
                new Collider(14),
                saucerSprite,
                32,
                createVector(random(-1.5,1.5), random(-1.5,1.5)),
                min(10, 10 / (this.score / 1000))
            ));
        }
        else {
            // large saucer
            this.saucers.push(new EnemySaucer(
                this.pickScreenEdge(),
                0,
                createVector(0,0),
                new Collider(28),
                saucerSprite,
                64,
                createVector(random(-1,1), random(-1,1)),
                30
            ));
        }
    }

    pickScreenEdge() {
        let axis = floor(random(0,4))

        if(axis === 0) {
            return createVector(random(0, width), 0);
        }
        else if(axis === 1) {
            return createVector(random(0, width), height);
        }
        else if(axis === 2) {
            return createVector(0, random(0, height));
        }
        else if (axis === 3) {
            return createVector(width, random(0, height));
        }
    }

    spawnParticle(count, pos, minRot, maxRot, minSize, maxSize, minSpeed, maxSpeed, minLife, maxLife) {
        for(let i = 0; i < count; i++) {
            this.particles.push(new Particle(
                pos.copy(),
                random(minRot, maxRot),
                createVector(0,0),
                new Collider(0),
                bulletSprite,
                random(minSize, maxSize),
                random(minSpeed, maxSpeed),
                random(minLife, maxLife)
            ));
        }
    }
}