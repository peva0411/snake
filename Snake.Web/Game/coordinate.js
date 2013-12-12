// Coordinate: A pair of x, y and any convienence functions related to position
var Coordinate = function (x, y) {
    this.x = x;
    this.y = y;

    this.equals = function (that) {
        if (that == null) return false;
        return this.x === that.x && this.y === that.y;
    };

    this.toString = function() {
        return '(' + this.x + ', ' + this.y + ')';
    };
};