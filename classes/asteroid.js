class Asteroid extends Actor {
    constructor(position, rotation, velocity, collider, sprite, size, speed, health) {
        super(position, rotation, velocity, collider, sprite, size);
        this.speed = speed;
        this.health = health;
        this.addForce(createVector(0, -this.speed));
        this.markDead = false;
    }
}