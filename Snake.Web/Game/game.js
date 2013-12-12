/*
    Game: class responsible for 
        1) holding game state
        2) reading input
        3) executing game logic
*/
var Game = function (height, width) {
    var game = this,
        gameBoard = $("#game-board"),
        running = false,
        intervalId = null,
        grid = new Grid(gameBoard, height, width),
        snake = new Snake(),
        food = null;

    game.processInput = function () {
        var ev = event;

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
        addEventListener('keyup', game.processInput);
        game.createFood();
        game.unpause();
    };

    game.end = function () {
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

var console = console || {
    log: function() { }
};