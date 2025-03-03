class Ship extends Actor {
    constructor(position, rotation, velocity, collider, sprite, size, input) {
        super(position, rotation, velocity, collider, sprite, size);
        this.input = input;
        this.thrustForce = 0.2;
        this.rotationForce = 0.05;
        this.velocityDecay = 0.97;
        this.warpPressed = false;
        this.shootPressed = false;
        this.bullets = [];
        this.bulletForce = 15;
    }

    update() {
        this.checkInput();
        super.update();
        this.velocity.mult(this.velocityDecay)

        for(let bullet of this.bullets) {
            bullet.update();
            bullet.draw();
        }
        this.bullets = this.bullets.filter((bullet) => bullet.lifetime > 0);
    }

    checkInput() {
        if(keyIsDown(this.input.thrust)) {
            this.addForce(createVector(0, -this.thrustForce));
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
        }
        else if(!keyIsDown(this.input.warp)) {
            this.warpPressed = false;
        }
        if(keyIsDown(this.input.shoot) && !this.shootPressed) {
            this.shoot();
            this.shootPressed = true;
        }
        else if(!keyIsDown(this.input.shoot)) {
            this.shootPressed = false;
        }
    }

    shoot() {
        this.bullets.push(new Bullet (
            this.position.copy(),
            this.rotation,
            createVector(0, 0),
            new Collider(3),
            bulletSprite,
            6,
            this.bulletForce,
            true,
            1
        ))
    }
}