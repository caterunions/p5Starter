class Bullet extends Actor {
    constructor(position, rotation, velocity, collider, sprite, size, speed, friendly, lifetime, pierce) {
        super(position, rotation, velocity, collider, sprite, size);
        this.friendly = friendly;
        this.lifetime = lifetime;
        this.speed = speed;
        this.addForce(createVector(0, -speed));
        this.pierce = pierce;
    }

    update() { 
        super.update();
        if(paused) {
            return;
        }
        this.lifetime -= deltaTime / 1000;
    }
}