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
        this.acceleration.rotate(this.rotation);
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.set(0, 0);

        //screen wrapping
        if(this.position.x < -this.size / 2) {
            this.position.x = width + this.size / 2;
        }
        else if(this.position.x > width + this.size / 2) {
            this.position.x = -this.size / 2;
        }
        if(this.position.y < -this.size / 2) {
            this.position.y = height + this.size / 2;
        }
        else if(this.position.y > height + this.size / 2) {
            this.position.y = -this.size / 2;
        }
    }

    draw() {
        push();
        imageMode(CENTER);
        translate(this.position.x, this.position.y);
        rotate(this.rotation);
        image(this.sprite, 0, 0, this.size, this.size)
        pop();
    }

    debugDrawCollider() {
        push();
        translate(this.position.x, this.position.y);
        stroke(0, 255, 0);
        fill(0, 0);
        circle(0, 0, this.collider.radius * 2);
        pop();
    }

    addForce(force) {
        this.acceleration.add(force);
    }

    addRotation(rotation) {
        this.rotation += rotation;
    }

    checkCollision(other) {
        if(this.position.dist(other.position) <= this.collider.radius + other.collider.radius) {
            return true;
        }
        return false;
    }
}