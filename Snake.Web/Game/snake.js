// The snake object, responsible for manipulating the collection of
// snake sections, the direction that the snake is moving in, and the
// actual movement of the snake
var Snake = function () {
    var sections = [new SnakeSection(new Coordinate(0, 0))],
        direction = Direction.RIGHT;

    this.color = "green";

    this.move = function () {
        var position = this.getNextPosition();
        var tail = this.getTail();
        tail.setPosition(position);
        sections.splice(sections.length - 1, 1);
        sections.unshift(tail);
    };

    this.getTail = function () {
        if (sections.length === 0) return null;
        return sections[sections.length - 1];
    };

    this.getHead = function () {
        if (sections.length === 0) return null;
        return sections[0];
    };

    this.getSnakeSections = function () {
        return sections;
    };

    this.getDirection = function () {
        return direction;
    };

    this.changeDirection = function (newDirection) {

        if (sections.length > 1) {
            var nextPosition = this.getNextPosition(newDirection);
            if (nextPosition.equals(sections[1].getPosition()))
                return false;
        }
        
        direction = newDirection;
        return true;
    };

    this.getNextPosition = function (suppliedDirection) {
        var position = this.getHead().getPosition();

        suppliedDirection = suppliedDirection || direction;

        if      (suppliedDirection == Direction.RIGHT) position = new Coordinate(position.x + 1, position.y);
        else if (suppliedDirection == Direction.LEFT)  position = new Coordinate(position.x - 1, position.y);
        else if (suppliedDirection == Direction.UP)    position = new Coordinate(position.x, position.y + 1);
        else if (suppliedDirection == Direction.DOWN)  position = new Coordinate(position.x, position.y - 1);

        return position;
    };

    this.getPosition = function () {
        return this.getHead().getPosition();
    };

    this.grow = function () {
        var position = this.getNextPosition();
        sections.unshift(new SnakeSection(position));
    };
};