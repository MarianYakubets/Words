var Words;
(function (Words) {
    var App = (function () {
        function App() {
            this.game = new Phaser.Game(640, 480, Phaser.AUTO, 'content', {
                create: this.create, preload: this.preload });
        }
        App.prototype.preload = function () {
            this.game.load.json('level', 'res/data/level1.json');
        };
        App.prototype.create = function () {
            this.game.state.add("MainMenuState", Words.MainMenuState, false);
            this.game.state.add("GameState", Words.GameState, true);
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        };
        return App;
    })();
    Words.App = App;
})(Words || (Words = {}));
window.onload = function () {
    var game = new Words.App();
};
var Words;
(function (Words) {
    var CharMatrix = (function () {
        function CharMatrix(width, height) {
            this.TAKEN = "taken";
            this.width = width;
            this.height = height;
            this.elements = [];
            for (var i = 0; i < width; i++) {
                var col = [];
                for (var j = 0; j < height; j++) {
                    col.push(null);
                }
                this.elements.push(col);
            }
        }
        CharMatrix.prototype.getElement = function (x, y) {
            if (!this.belongTo(x, y)) {
                return;
            }
            return this.elements[x][y];
        };
        CharMatrix.prototype.setElement = function (x, y, element) {
            if (!this.belongTo(x, y)) {
                return;
            }
            this.elements[x][y] = element;
        };
        CharMatrix.prototype.isEmpty = function (x, y) {
            if (!this.belongTo(x, y)) {
                return;
            }
            return this.elements[x][y] == null;
        };
        CharMatrix.prototype.getNeighboursElements = function (x, y) {
            if (!this.belongTo(x, y)) {
                return;
            }
            var els = [];
            for (var cell in this.getNeighboursCells(x, y)) {
                els.push(this.getElement(cell[0], cell[1]));
            }
            return els;
        };
        CharMatrix.prototype.getNeighboursCells = function (x, y) {
            if (!this.belongTo(x, y)) {
                return [];
            }
            var ns = [];
            this.addIfBelongs(x - 1, y, ns);
            this.addIfBelongs(x + 1, y, ns);
            this.addIfBelongs(x, y - 1, ns);
            this.addIfBelongs(x, y + 1, ns);
            return ns;
        };
        CharMatrix.prototype.getEmptyNeighboursCells = function (x, y) {
            if (!this.belongTo(x, y)) {
                return [];
            }
            var ns = [];
            this.addIfBelongsAndEmpty(x - 1, y, ns);
            this.addIfBelongsAndEmpty(x + 1, y, ns);
            this.addIfBelongsAndEmpty(x, y - 1, ns);
            this.addIfBelongsAndEmpty(x, y + 1, ns);
            return ns;
        };
        CharMatrix.prototype.addIfBelongs = function (x, y, neighbours) {
            if (this.belongTo(x, y)) {
                neighbours.push([x, y]);
            }
        };
        CharMatrix.prototype.addIfBelongsAndEmpty = function (x, y, neighbours) {
            if (this.belongTo(x, y) && this.isEmpty(x, y)) {
                neighbours.push([x, y]);
            }
        };
        CharMatrix.prototype.getSizeofNeighbours = function (x, y) {
            if (!this.belongTo(x, y)) {
                return;
            }
            return this.getNeighboursCells(x, y).length;
        };
        CharMatrix.prototype.getSizeofEmptyNeighbours = function (x, y) {
            if (!this.belongTo(x, y)) {
                return;
            }
            return 1;
        };
        CharMatrix.prototype.getNumberOfEmptyAreas = function () {
            return 1;
        };
        CharMatrix.prototype.getEmptyAreas = function () {
            var areas = [];
            var emptyCell = this.findEmpty();
            while (emptyCell != null) {
                areas.push(this.fillArea(emptyCell[0], emptyCell[1], []));
                emptyCell = this.findEmpty();
            }
            this.сlearTaken();
            return areas;
        };
        CharMatrix.prototype.fillArea = function (x, y, area) {
            var _this = this;
            var neighbours = this.getEmptyNeighboursCells(x, y);
            neighbours.forEach(function (n) {
                if (_this.isEmpty(n[0], n[1])) {
                    area.push(n);
                    _this.setElement(n[0], n[1], _this.TAKEN);
                    _this.fillArea(n[0], n[1], area);
                }
            });
            return area;
        };
        CharMatrix.prototype.belongTo = function (x, y) {
            return x >= 0 && x < this.width && y >= 0 && y < this.height;
        };
        CharMatrix.prototype.сlearTaken = function () {
            for (var i = 0; i < this.width; i++) {
                for (var j = 0; j < this.height; j++) {
                    if (this.elements[i][j] == this.TAKEN) {
                        this.elements[i][j] = null;
                    }
                }
            }
        };
        CharMatrix.prototype.findEmpty = function () {
            for (var i = 0; i < this.width; i++) {
                for (var j = 0; j < this.height; j++) {
                    if (this.isEmpty(i, j)) {
                        return [i, j];
                    }
                }
            }
            return null;
        };
        CharMatrix.prototype.getElements = function () {
            return this.elements;
        };
        CharMatrix.prototype.setElements = function (elements) {
            this.elements = elements;
        };
        return CharMatrix;
    })();
    Words.CharMatrix = CharMatrix;
})(Words || (Words = {}));
var Words;
(function (Words) {
    var Serializable = (function () {
        function Serializable() {
        }
        Serializable.prototype.fillFromJSON = function (jsonObj) {
            for (var propName in jsonObj) {
                this[propName] = jsonObj[propName];
            }
        };
        return Serializable;
    })();
    Words.Serializable = Serializable;
})(Words || (Words = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path='../util/Serializable' />
var Words;
(function (Words) {
    var Level = (function (_super) {
        __extends(Level, _super);
        function Level() {
            _super.apply(this, arguments);
        }
        Level.prototype.getWords = function () { return this.words; };
        return Level;
    })(Words.Serializable);
    Words.Level = Level;
})(Words || (Words = {}));
var Words;
(function (Words) {
    var GameState = (function (_super) {
        __extends(GameState, _super);
        function GameState() {
            _super.call(this);
        }
        GameState.prototype.preload = function () {
        };
        GameState.prototype.create = function () {
            var level = new Words.Level();
            var jObj = this.game.cache.getJSON('level');
            level.fillFromJSON(jObj);
            var matrix = Words.Generator.generateMatrixForWords(level.getWords());
        };
        return GameState;
    })(Phaser.State);
    Words.GameState = GameState;
})(Words || (Words = {}));
var Words;
(function (Words) {
    var MainMenuState = (function (_super) {
        __extends(MainMenuState, _super);
        function MainMenuState() {
            _super.call(this);
        }
        MainMenuState.prototype.preload = function () {
        };
        MainMenuState.prototype.create = function () {
        };
        return MainMenuState;
    })(Phaser.State);
    Words.MainMenuState = MainMenuState;
})(Words || (Words = {}));
var Words;
(function (Words) {
    var Generator = (function () {
        function Generator() {
        }
        Generator.generateMatrixForWords = function (words) {
            Words.Utils.sortBySize(words);
            var size = Words.Utils.getWidthAndHeight(words);
            var matrix = new Words.CharMatrix(size[0], size[1]);
            var areas;
            var word;
            areas = matrix.getEmptyAreas();
            Words.Utils.sortBySize(areas);
            for (var i = 0; i < words.length; i++) {
                word = words[i];
                Generator.fillAreaWithWord(areas[0], word, matrix);
                areas = matrix.getEmptyAreas();
                Words.Utils.sortBySize(areas);
                while (!this.areasAreEnoughForWords(areas[0], words[i + 1], words[words.length - 1])) {
                    Generator.fillAreaWithWord(areas[0], word, matrix);
                    areas = matrix.getEmptyAreas();
                    Words.Utils.sortBySize(areas);
                }
            }
            alert(matrix.getElements());
            return matrix;
        };
        Generator.fillAreaWithWord = function (area, word, matrix) {
            var start = Words.Utils.getRandArrayElement(area);
            for (var i = 0; i < word.length; i++) {
                matrix.setElement(start[0], start[1], word.charAt(i));
                area = matrix.getEmptyNeighboursCells(start[0], start[1]);
                start = Words.Utils.getRandArrayElement(area);
            }
        };
        Generator.areasAreEnoughForWords = function (biggestArea, biggestWord, smallestWord) {
            if (biggestWord == undefined) {
                return true;
            }
            if (biggestArea.length < biggestWord.length) {
                return false;
            }
            if (biggestArea.length == biggestWord.length) {
                return true;
            }
            return biggestArea.length - biggestWord.length - smallestWord.length >= 0;
        };
        return Generator;
    })();
    Words.Generator = Generator;
})(Words || (Words = {}));
var Words;
(function (Words) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.getRandomNumber = function (max, min) {
            return (Math.round(Math.random() * (max - min)) + min);
        };
        Utils.getRandomDirection = function (x, y) {
            var rand = Utils.getRandomNumber(1, 4);
            switch (rand) {
                case 1:
                    return [++x, y];
                case 2:
                    return [--x, y];
                case 3:
                    return [x, ++y];
                case 4:
                    return [x, --y];
            }
        };
        Utils.getWidthAndHeight = function (words) {
            var size = 0;
            for (var i = 0; i < words.length; i++) {
                size = size + words[i].length;
            }
            var width = Math.floor(Math.sqrt(size));
            var heigth = size / width;
            return [width, heigth];
        };
        Utils.sortBySize = function (elements) {
            return elements.sort(function (w1, w2) { return w2.length - w1.length; });
        };
        Utils.getRandArrayElement = function (elements) {
            var rand = Utils.getRandomNumber(elements.length - 1, 0);
            return elements[rand];
        };
        return Utils;
    })();
    Words.Utils = Utils;
})(Words || (Words = {}));
