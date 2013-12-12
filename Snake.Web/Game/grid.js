// Grid - class responsible for holding each game object
var Grid = function (gameBoard, height, width) {
    var grid = [],
        cells = [];

    this.getObjectsInCell = function (position) {
        if (!this.isValidPosition(position)) return [];
        return grid[position.x][position.y];
    };

    this.isValidPosition = function (position) {
        if (position.x < 0 || position.x >= width || position.y < 0 || position.y >= height)
            return false;

        return true;
    };

    this.add = function (position, obj) {
        var x = position.x;
        var y = position.y;

        if (!this.isValidPosition(position)) return;

        grid[x][y].push(obj);
        cells[x + width * (height - y - 1)].style.backgroundColor = obj.color || "black";
    };

    this.clear = function () {
        for (var x = 0; x < width; x++) {
            var row = [];
            for (var y = 0; y < height; y++) {
                cells[x + width * (height - y - 1)].style.backgroundColor = "inherit";
                row.push([]);
            }

            grid.push(row);
        }
    };

    this.init = function () {
        for (var y = 0; y < width; y++) {

            var row = $("<div>").addClass("game-row");
            gameBoard.append(row);

            for (var x = 0; x < height; x++) {
                row.append($("<div>").addClass("cell"));
            }
            
            gameBoard.addClass("clearfix");
        }

        cells = $('.cell');
        this.clear();
    };

    this.init();
};