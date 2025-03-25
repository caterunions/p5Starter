class Ship extends Actor {
    constructor(position, rotation, velocity, collider, sprite, size, input) {
        super(position, rotation, velocity, collider, sprite, size);
        // input mappings
        this.input = input;
        // move speed
        this.thrustForce = 0.2;
        // rotation
        this.rotationForce = 0.05;
        // deceleration
        this.velocityDecay = 0.97;
        // saving input
        this.warpPressed = true;
        this.shootPressed = false;
        this.bullets = [];
        this.bulletForce = 15;
        // i frames
        this.invincibilityTimer = 0;
        this.flickerFrame = false;
        // powerup variables
        this.multishot = 1;
        this.bulletPierce = 1;
        this.bulletLifetime = 1;
    }

    update() {
        if(paused) {
            return;
        }
        this.checkInput();
        super.update();
        this.velocity.mult(this.velocityDecay)

        for(let bullet of this.bullets) {
            bullet.update();
            bullet.draw();
        }
        this.bullets = this.bullets.filter((bullet) => bullet.lifetime > 0);

        if(this.invincibilityTimer > 0) {
            this.invincibilityTimer -= deltaTime / 1000;
        }
    }

    draw() {
        if(this.flickerFrame) {
            this.flickerFrame = false;
            return;
        }
        if(this.invincibilityTimer > 0) this.flickerFrame = true;
        super.draw();
    }

    checkInput() {
        if(keyIsDown(this.input.thrust)) {
            this.addForce(createVector(0, -this.thrustForce));
            gameManager.spawnParticle(1,this.position, this.rotation + PI + 0.1, this.rotation + PI - 0.1, 2, 4, 1, 2, 0.5, 1);
            if(!engineSFX.isPlaying()) {
                engineSFX.play();
            }
        }
        else {
            engineSFX.stop();
        }
        if(keyIsDown(this.input.right)) {
            this.addRotation(this.rotationForce);
        }
        if(keyIsDown(this.input.left)) {
            this.addRotation(-this.rotationForce);
        }
        if(keyIsDown(this.input.warp) && !this.warpPressed) {
            this.position = createVector(random(0,width), random(0,height));
            this.warpPressed = true;
            warpSFX.play();
        }
        else if(!keyIsDown(this.input.warp)) {
            this.warpPressed = false;
        }
        if(keyIsDown(this.input.shoot) && !this.shootPressed) {
            this.shoot();
            this.shootPressed = true;
            shootSFX.play();
        }
        else if(!keyIsDown(this.input.shoot)) {
            this.shootPressed = false;
        }
    }

    shoot() {
        let angleOffset = (this.multishot / 2) * (PI / 16) * -1;
        for(let i = 0; i < this.multishot; i++) {
            this.bullets.push(new Bullet (
                this.position.copy(),
                this.rotation + angleOffset,
                createVector(0, 0),
                new Collider(3),
                bulletSprite,
                6,
                this.bulletForce,
                true,
                this.bulletLifetime,
                this.bulletPierce
            ));
            angleOffset += (PI / 16);
        }
        this.addForce(createVector(0,0.5));
    }
}