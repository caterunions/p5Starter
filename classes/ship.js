class Ship extends Actor {
    constructor(position, rotation, velocity, collider, sprite, size, input) {
        super(position, rotation, velocity, collider, sprite, size);
        this.input = input;
        this.thrustForce = 0.2;
        this.rotationForce = 0.05;
        this.velocityDecay = 0.97;
    }

    update() {
        this.checkInput();
        super.update();
        this.velocity.mult(this.velocityDecay)
    }

    checkInput() {
        if(keyIsDown(this.input.thrust)) {
            super.addForce(createVector(0, -this.thrustForce));
        }
        if(keyIsDown(this.input.right)) {
            super.addRotation(this.rotationForce);
        }
        if(keyIsDown(this.input.left)) {
            super.addRotation(-this.rotationForce);
        }
        if(keyIsDown(this.input.warp)) {

        }
    }
}