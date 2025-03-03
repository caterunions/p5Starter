class Actor {
    constructor(position, rotation, velocity, collider, sprite, size) {
        this.position = position;
        this.rotation = rotation;
        this.velocity = velocity;
        this.acceleration = createVector(0, 0);
        this.collider = collider;
        this.sprite = sprite;
        this.size = size;
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.set(0, 0);
    }

    draw() {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.rotation);
        image(this.sprite, 0, 0, this.size, this.size)
        pop();
    }

    addForce(force) {
        this.acceleration.add(force);
    }

    addRotation(rotation) {
        this.rotation += rotation;
    }
}