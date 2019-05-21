document.addEventListener("DOMContentLoaded", function() {
    var width = 0;
    var height = 0

    document.querySelector(".gameStart button").addEventListener("click", function(event) {
        event.preventDefault();
        width = document.querySelector("#width").value;
        height = document.querySelector("#height").value;
        console.log(width);
        console.log(height);
        var game = new GameOfLife(width, height);
        game.createBoard();

        document.querySelector("#play").addEventListener("click", function() {
            var self = this;
            var intervalGeneration = setInterval(function() {
                game.printNextGeneration()
            }, 1000);
            document.querySelector("#pause").addEventListener("click", function() {
                clearInterval(intervalGeneration);
            })


        })
        document.querySelector(".gameStart").classList.add("hidden");
    });

    function GameOfLife(boardWidth, boardHeight) {
        this.width = boardWidth;
        this.height = boardHeight;
        this.board = document.querySelector("#board");
        this.cells = [];
        this.createBoard = function() {
            this.board.style.width = this.width * 10 + "px";
            this.board.style.height = this.height * 10 + "px";
            this.numberDivs = this.width * this.height;
            for (var i = 0; i < this.numberDivs; i++) {
                var newDiv = document.createElement("div");
                this.board.appendChild(newDiv);
                this.cells.push(newDiv);
            }

            for (var i = 0; i < this.cells.length; i++) {
                this.cells[i].addEventListener("mouseover", function() {
                    this.classList.toggle("live");
                })
            }
        }
        this.indexNumber = function(x, y) {
            var index = x + y * this.width;
            return this.cells[index];
        }

        this.setCellState = function(x, y, state) {
            if (state === "live") {
                this.indexNumber(x, y).classList.add("live");
            } else {
                this.indexNumber(x, y).classList.remove("live");
            }
        }

        this.computeCellNextState = function(x, y) {
            var neighbors = [];
            var neighborsLast = [];
            var cellState = 0;
            var number = 0;
            if (x === 0) {
                neighbors.push((this.indexNumber(x, (y - 1))));
                neighbors.push((this.indexNumber((x + 1), (y - 1))));
                neighbors.push((this.indexNumber((x + 1), y)));
                neighbors.push((this.indexNumber(x, (y + 1))));
                neighbors.push((this.indexNumber((x + 1), (y + 1))));
            } else if (x === this.width - 1) {
                neighbors.push((this.indexNumber((x - 1), (y - 1))));
                neighbors.push((this.indexNumber(x, (y - 1))));
                neighbors.push((this.indexNumber((x - 1), y)));
                neighbors.push((this.indexNumber(x, (y + 1))));
                neighbors.push((this.indexNumber((x - 1), (y + 1))));
            } else {
                neighbors.push((this.indexNumber((x - 1), (y - 1))));
                neighbors.push((this.indexNumber(x, (y - 1))));
                neighbors.push((this.indexNumber((x + 1), (y - 1))));
                neighbors.push((this.indexNumber((x - 1), y)));
                neighbors.push((this.indexNumber((x + 1), y)));
                neighbors.push((this.indexNumber(x, (y + 1))));
                neighbors.push((this.indexNumber((x + 1), (y + 1))));
                neighbors.push((this.indexNumber((x - 1), (y + 1))));
            }

            for (var i = 0; i < neighbors.length; i++) {
                if (neighbors[i] !== undefined) {
                    neighborsLast.push(neighbors[i]);
                }
            }
            // console.log(neighborsLast);
            for (var i = 0; i < neighborsLast.length; i++) {
                if (neighborsLast[i].classList.contains("live")) {
                    number += 1;
                }
            }
            // console.log(number);
            if (this.indexNumber(x, y).classList.contains("live")) {
                if ((number === 3) || (number === 2)) {
                    cellState = 1;
                }
            } else {
                if (number === 3) {
                    cellState = 1;
                }
            }
            return cellState;

        }
        this.computeNextGeneration = function() {
            var nextGeneration = [];
            for (var i = 0; i < this.height; i++) {
                for (var j = 0; j < this.width; j++) {
                    nextGeneration.push(this.computeCellNextState(j, i));
                }
            }
            return nextGeneration;
        }
        this.printNextGeneration = function() {

            var nextGeneration = this.computeNextGeneration();
            for (var i = 0; i < nextGeneration.length; i++) {
                if (nextGeneration[i] === 0) {
                    this.cells[i].classList.remove("live");
                } else if (nextGeneration[i] === 1) {
                    this.cells[i].classList.add("live");
                }
            }

        }


    }
});