/*
    Game: class responsible for 
        1) holding game state
        2) reading input
        3) executing game logic
*/
var Game = function (height, width) {
    var element = $("#game-board"),
        game = this,
        running = false,
        intervalId = null,
        grid = new Grid(element, height, width),
        snake = new Snake(),
        food = null;

    game.processInput = function (ev) {
        var keyCommands = {
            /* ESC   */ 27: function () { running ? game.pause() : game.unpause(); },
            /* LEFT  */ 37: function () { snake.changeDirection(Direction.LEFT); },
            /* UP    */ 38: function () { snake.changeDirection(Direction.UP); },
            /* RIGHT */ 39: function () { snake.changeDirection(Direction.RIGHT); },
            /* DOWN  */ 40: function () { snake.changeDirection(Direction.DOWN); },
        };

        var command = keyCommands[ev.which];
        if (command) command();
    };

    game.feedSnake = function () {
        snake.grow();
        game.createFood();
    };

    game.loop = function () {

        //update loop
        var foodPosition = food ? food.getPosition() : null,
            newPosition = snake.getNextPosition();

        if (foodPosition && foodPosition.equals(newPosition))
            game.feedSnake();
        else
            snake.move();

        var gameEnded = game.checkEndingConditions();

        if (gameEnded) {
            game.end();
            return;
        }

        game.draw();
    };

    game.draw = function () {
        var foodPosition = food ? food.getPosition() : null;

        grid.clear();

        if (foodPosition)
            grid.add(foodPosition, food);

        var snakeSections = snake.getSnakeSections();

        for (var i = 0; i < snakeSections.length; i++) {
            var snakeSection = snakeSections[i];
            grid.add(snakeSection.getPosition(), snakeSection);
        }
    };

    game.checkEndingConditions = function () {
        var snakeSections = snake.getSnakeSections(),
            head = snakeSections[0],
            pos = head.getPosition();

        // snake ran into itself
        for (var i = 1; i < snakeSections.length; i++) {
            if (head.getPosition().equals(snakeSections[i].getPosition()))
                return true;
        }

        // check if snake ran into wall
        return !grid.isValidPosition(pos);
    };

    game.createFood = function () {
        food = new Food(height, width);
        grid.add(food.getPosition(), food);
    };

    game.unpause = function () {
        running = true;
        console.log('started / unpaused');
        intervalId = setInterval(game.loop, 250);
    };

    game.start = function () {
        $("body").keydown(game.processInput);
        game.createFood();
        game.unpause();
    };

    game.end = function () {
        element.unbind('keydown', game.processInput);
        console.log('game ended');
        clearInterval(intervalId);
        alert('game over');
    };

    game.pause = function () {
        running = false;
        console.log('paused');
        clearInterval(intervalId);
    };
};

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

// Coordinate: A pair of x, y and any convienence functions related to position
var Coordinate = function (x, y) {
    this.x = x;
    this.y = y;

    this.equals = function (that) {
        if (that == null) return false;
        return this.x === that.x && this.y === that.y;
    };
};

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

// Grid - class responsible for holding each game object
var Grid = function (gameBoard, height, width) {
    var grid = [],
        cells = document.querySelectorAll('.cell');

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
        gameBoard.addClass('clearfix');

        for (var y = 0; y < width; y++) {
            
            var row = $("<div>").addClass('row');
            gameBoard.append(row);
            
            for (var x = 0; x < height; x++) {
                row.append($("<div>").addClass('cell'));
            }
        }

        cells = document.querySelectorAll('.cell');
        this.clear();
    };

    this.init();
};

// struct for determining direction of the snake
var Direction = {
    RIGHT: 0,
    LEFT: 1,
    UP: 2,
    DOWN: 3
};

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
        if (direction == Direction.RIGHT && newDirection == Direction.LEFT) return;
        if (direction == Direction.LEFT && newDirection == Direction.RIGHT) return;
        if (direction == Direction.UP && newDirection == Direction.DOWN) return;
        if (direction == Direction.DOWN && newDirection == Direction.UP) return;
        direction = newDirection;
    };

    this.getNextPosition = function () {
        var position = this.getHead().getPosition();

        if (direction == Direction.RIGHT) position = new Coordinate(position.x + 1, position.y);
        else if (direction == Direction.LEFT) position = new Coordinate(position.x - 1, position.y);
        else if (direction == Direction.UP) position = new Coordinate(position.x, position.y + 1);
        else if (direction == Direction.DOWN) position = new Coordinate(position.x, position.y - 1);

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

var console = console || {
    log: function() { }
};