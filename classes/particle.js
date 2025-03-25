class Particle extends Actor {
    constructor(position, rotation, velocity, collider, sprite, size, speed, lifetime) {
        super(position, rotation, velocity, collider, sprite, size);
        this.lifetime = lifetime;
        this.speed = speed;
        this.addForce(createVector(0, -speed));
    }

    update() {
        super.update();
        if(paused) {
            return;
        }
        this.lifetime -= deltaTime / 1000;
    }
}