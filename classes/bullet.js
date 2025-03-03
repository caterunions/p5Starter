class Bullet extends Actor {
    constructor(position, rotation, velocity, collider, sprite, size, speed, friendly, lifetime) {
        super(position, rotation, velocity, collider, sprite, size);
        this.friendly = friendly;
        this.lifetime = lifetime;
        this.speed = speed;
        this.addForce(createVector(0, -speed));
    }

    update() {
        super.update();
        this.lifetime -= deltaTime / 1000;
        console.log(this.lifetime);
    }
}