var Food = function (height, width) {
    var position = new Coordinate(
        Math.floor(Math.random() * width),
        Math.floor(Math.random() * height)
    );

    this.color = "brown";

    this.getPosition = function () {
        return position;
    };
};