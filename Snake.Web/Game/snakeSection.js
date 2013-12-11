// A per coordinate representation of an individual part of the snake
var SnakeSection = function (coordinate) {
    var position = coordinate;

    var ensureCoordinate = function (coord) {
        if (!coord || isNaN(coord.x) || isNaN(coord.y)) throw "Invalid position supplied for snake section";
    };

    this.id = new Date().valueOf();
    this.color = 'green';

    this.getPosition = function () {
        return position;
    };

    this.setPosition = function (coord) {
        ensureCoordinate(coord);
        position = coord;
    };

    ensureCoordinate(coordinate);
};