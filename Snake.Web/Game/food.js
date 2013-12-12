var Food = function (position) {
    //var position = new Coordinate(
    //    Math.floor(Math.random() * width),
    //    Math.floor(Math.random() * height)
    //);

    this.color = "blue";

    this.getPosition = function () {
        return position;
    };

    if (!position) throw "Food must be created with a position";
};