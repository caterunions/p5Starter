class Asteroid extends Actor {
    constructor(position, rotation, velocity, collider, sprite, size, speed) {
        super(position, rotation, velocity, collider, sprite, size);
        this.speed = speed;
        this.addForce(createVector(0, -this.speed));
        this.markDead = false;
    }
}