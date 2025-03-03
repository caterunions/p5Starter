class Ship extends Actor {
    constructor(position, rotation, velocity, collider, sprite, size, input) {
        super(position, rotation, velocity, collider, sprite, size);
        this.input = input;

    }
}