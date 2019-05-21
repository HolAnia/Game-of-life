/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("document.addEventListener(\"DOMContentLoaded\", function () {\n  var width = 0;\n  var height = 0;\n  document.querySelector(\".gameStart button\").addEventListener(\"click\", function (event) {\n    event.preventDefault();\n    width = document.querySelector(\"#width\").value;\n    height = document.querySelector(\"#height\").value;\n    console.log(width);\n    console.log(height);\n    var game = new GameOfLife(width, height);\n    game.createBoard();\n    document.querySelector(\"#play\").addEventListener(\"click\", function () {\n      var self = this;\n      var intervalGeneration = setInterval(function () {\n        game.printNextGeneration();\n      }, 1000);\n      document.querySelector(\"#pause\").addEventListener(\"click\", function () {\n        clearInterval(intervalGeneration);\n      });\n    });\n    document.querySelector(\".gameStart\").classList.add(\"hidden\");\n  });\n\n  function GameOfLife(boardWidth, boardHeight) {\n    this.width = boardWidth;\n    this.height = boardHeight;\n    this.board = document.querySelector(\"#board\");\n    this.cells = [];\n\n    this.createBoard = function () {\n      this.board.style.width = this.width * 10 + \"px\";\n      this.board.style.height = this.height * 10 + \"px\";\n      this.numberDivs = this.width * this.height;\n\n      for (var i = 0; i < this.numberDivs; i++) {\n        var newDiv = document.createElement(\"div\");\n        this.board.appendChild(newDiv);\n        this.cells.push(newDiv);\n      }\n\n      for (var i = 0; i < this.cells.length; i++) {\n        this.cells[i].addEventListener(\"mouseover\", function () {\n          this.classList.toggle(\"live\");\n        });\n      }\n    };\n\n    this.indexNumber = function (x, y) {\n      var index = x + y * this.width;\n      return this.cells[index];\n    };\n\n    this.setCellState = function (x, y, state) {\n      if (state === \"live\") {\n        this.indexNumber(x, y).classList.add(\"live\");\n      } else {\n        this.indexNumber(x, y).classList.remove(\"live\");\n      }\n    };\n\n    this.computeCellNextState = function (x, y) {\n      var neighbors = [];\n      var neighborsLast = [];\n      var cellState = 0;\n      var number = 0;\n\n      if (x === 0) {\n        neighbors.push(this.indexNumber(x, y - 1));\n        neighbors.push(this.indexNumber(x + 1, y - 1));\n        neighbors.push(this.indexNumber(x + 1, y));\n        neighbors.push(this.indexNumber(x, y + 1));\n        neighbors.push(this.indexNumber(x + 1, y + 1));\n      } else if (x === this.width - 1) {\n        neighbors.push(this.indexNumber(x - 1, y - 1));\n        neighbors.push(this.indexNumber(x, y - 1));\n        neighbors.push(this.indexNumber(x - 1, y));\n        neighbors.push(this.indexNumber(x, y + 1));\n        neighbors.push(this.indexNumber(x - 1, y + 1));\n      } else {\n        neighbors.push(this.indexNumber(x - 1, y - 1));\n        neighbors.push(this.indexNumber(x, y - 1));\n        neighbors.push(this.indexNumber(x + 1, y - 1));\n        neighbors.push(this.indexNumber(x - 1, y));\n        neighbors.push(this.indexNumber(x + 1, y));\n        neighbors.push(this.indexNumber(x, y + 1));\n        neighbors.push(this.indexNumber(x + 1, y + 1));\n        neighbors.push(this.indexNumber(x - 1, y + 1));\n      }\n\n      for (var i = 0; i < neighbors.length; i++) {\n        if (neighbors[i] !== undefined) {\n          neighborsLast.push(neighbors[i]);\n        }\n      } // console.log(neighborsLast);\n\n\n      for (var i = 0; i < neighborsLast.length; i++) {\n        if (neighborsLast[i].classList.contains(\"live\")) {\n          number += 1;\n        }\n      } // console.log(number);\n\n\n      if (this.indexNumber(x, y).classList.contains(\"live\")) {\n        if (number === 3 || number === 2) {\n          cellState = 1;\n        }\n      } else {\n        if (number === 3) {\n          cellState = 1;\n        }\n      }\n\n      return cellState;\n    };\n\n    this.computeNextGeneration = function () {\n      var nextGeneration = [];\n\n      for (var i = 0; i < this.height; i++) {\n        for (var j = 0; j < this.width; j++) {\n          nextGeneration.push(this.computeCellNextState(j, i));\n        }\n      }\n\n      return nextGeneration;\n    };\n\n    this.printNextGeneration = function () {\n      var nextGeneration = this.computeNextGeneration();\n\n      for (var i = 0; i < nextGeneration.length; i++) {\n        if (nextGeneration[i] === 0) {\n          this.cells[i].classList.remove(\"live\");\n        } else if (nextGeneration[i] === 1) {\n          this.cells[i].classList.add(\"live\");\n        }\n      }\n    };\n  }\n});\n\n//# sourceURL=webpack:///./js/app.js?");

/***/ })

/******/ });