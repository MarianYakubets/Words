var Words;
(function (Words) {
    var App = (function () {
        function App() {
            this.game = new Phaser.Game(640, 480, Phaser.AUTO, 'content', {
                create: this.create, preload: this.preload });
        }
        App.prototype.preload = function () {
            this.game.load.json('level', 'res/data/level1.json');
            this.game.load.image('btn', 'res/img/blank-orange-button-md.png');
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
        CharMatrix.prototype.getNumberOfEmptyCells = function () {
            var number = 0;
            for (var i = 0; i < this.width; i++) {
                for (var j = 0; j < this.height; j++) {
                    if (this.isEmpty(i, j)) {
                        number++;
                    }
                }
            }
            return number;
        };
        CharMatrix.prototype.getEmptyAreas = function () {
            var max = this.height * this.width;
            var attempts = 0;
            var areas = [];
            var emptyCell = this.findEmpty();
            while ((attempts < max) && emptyCell != null) {
                console.log("getEmptyAreas: ");
                areas.push(this.fillArea(emptyCell[0], emptyCell[1], []));
                emptyCell = this.findEmpty();
                attempts++;
            }
            this.сlearTaken();
            return areas;
        };
        CharMatrix.prototype.fillArea = function (x, y, area) {
            var _this = this;
            var neighbours = this.getEmptyNeighboursCells(x, y);
            neighbours.unshift([x, y]);
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
        CharMatrix.prototype.clear = function () {
            for (var i = 0; i < this.width; i++) {
                for (var j = 0; j < this.height; j++) {
                    this.elements[i][j] = null;
                }
            }
        };
        CharMatrix.prototype.getElements = function () {
            return this.elements;
        };
        CharMatrix.prototype.setElements = function (elements) {
            this.elements = elements;
        };
        CharMatrix.prototype.getWidth = function () {
            return this.width;
        };
        CharMatrix.prototype.getHeight = function () {
            return this.height;
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
            this.game.add.button(this.game.world.centerX + 200, this.game.world.centerY - 100, 'btn', this.createLevel, this, 2, 1, 0);
            this.tiles = this.game.add.group();
        };
        GameState.prototype.update = function () {
        };
        GameState.prototype.createTileMap = function () {
            this.tiles.removeAll();
            var style = { font: "bold 32px Arial", fill: "#ff0", boundsAlignH: "center", boundsAlignV: "middle" };
            var step = 50;
            var elements = this.matrix.getElements();
            for (var i = 0; i < this.matrix.getWidth(); i++) {
                for (var j = 0; j < this.matrix.getHeight(); j++) {
                    var tile = this.game.add.text(i * step, j * step, elements[i][j], style, this.tiles);
                }
            }
        };
        GameState.prototype.createLevel = function () {
            var level = new Words.Level();
            var jObj = this.game.cache.getJSON('level');
            level.fillFromJSON(jObj);
            var done = false;
            //Create Matrix
            var size = Words.Utils.getWidthAndHeight(level.getWords());
            this.matrix = new Words.CharMatrix(size[0], size[1]);
            while (!done) {
                try {
                    Words.Generator.generateMatrixForWords(level.getWords(), this.matrix);
                    done = true;
                }
                catch (error) {
                    alert("attemp fail");
                }
            }
            this.createTileMap();
        };
        return GameState;
    })(Phaser.State);
    Words.GameState = GameState;
})(Words || (Words = {}));
var Words;
(function (Words) {
    var GenerateState = (function (_super) {
        __extends(GenerateState, _super);
        function GenerateState() {
            _super.call(this);
        }
        GenerateState.prototype.preload = function () {
        };
        GenerateState.prototype.create = function () {
            this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY - 100, 'btn', this.createLevel, this, 2, 1, 0);
            this.tiles = this.game.add.group();
        };
        GenerateState.prototype.update = function () {
        };
        GenerateState.prototype.createLevel = function () {
            var level = new Words.Level();
            var jObj = this.game.cache.getJSON('level');
            level.fillFromJSON(jObj);
            var matrix;
            var done = false;
            while (!done) {
                try {
                    matrix = Words.Generator.generateMatrixForWords(level.getWords(), matrix);
                    done = true;
                }
                catch (error) {
                    alert("attemp fail");
                }
            }
        };
        return GenerateState;
    })(Phaser.State);
    Words.GenerateState = GenerateState;
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
    var Dictionary = (function () {
        function Dictionary(init) {
            this._keys = [];
            this._values = [];
            for (var x = 0; x < init.length; x++) {
                this[init[x].key] = init[x].value;
                this._keys.push(init[x].key);
                this._values.push(init[x].value);
            }
        }
        Dictionary.prototype.add = function (key, value) {
            this[key] = value;
            this._keys.push(key);
            this._values.push(value);
        };
        Dictionary.prototype.remove = function (key) {
            var index = this._keys.indexOf(key, 0);
            this._keys.splice(index, 1);
            this._values.splice(index, 1);
            delete this[key];
        };
        Dictionary.prototype.get = function (key) {
            return this[key];
        };
        Dictionary.prototype.keys = function () {
            return this._keys;
        };
        Dictionary.prototype.values = function () {
            return this._values;
        };
        Dictionary.prototype.containsKey = function (key) {
            if (typeof this[key] === "undefined") {
                return false;
            }
            return true;
        };
        Dictionary.prototype.toLookup = function () {
            return this;
        };
        return Dictionary;
    })();
    Words.Dictionary = Dictionary;
})(Words || (Words = {}));
var Words;
(function (Words) {
    var Generator = (function () {
        function Generator() {
        }
        Generator.generateMatrixForWords = function (words, matrix) {
            //Sort words
            Words.Utils.sortBySize(words);
            var attemp = 0;
            while ((!Generator.generateAll(matrix, words)
                || !Words.Utils.isMatrixFilled(matrix, words))
                && attemp < Generator.MAX_ATTEMPS) {
                attemp++;
            }
            return matrix;
        };
        Generator.generateAll = function (matrix, words) {
            matrix.clear();
            //Create Functions
            var map = new Words.Dictionary([]);
            var fill = this.fill(matrix, map);
            var revert = this.revert(matrix, map);
            var attemp = 0;
            var word;
            for (var i = 0; i < words.length; i++) {
                attemp = 0;
                word = words[i];
                while (!fill(word) && attemp < Generator.MAX_ATTEMPS) {
                    revert(word);
                    attemp++;
                }
            }
            if (attemp == Generator.MAX_ATTEMPS) {
                return false;
            }
            return true;
        };
        Generator.fill = function (matrix, map) {
            var matrix = matrix;
            var map = map;
            return function (word) {
                var area = Generator.getBiggestEmptyArea(matrix);
                var start = Words.Utils.getRandArrayElement(area);
                var coordinates = [];
                for (var i = 0; i < word.length; i++) {
                    if (area.length == 0) {
                        map.add(word, coordinates);
                        return false;
                    }
                    matrix.setElement(start[0], start[1], word.charAt(i));
                    coordinates.push(start);
                    area = matrix.getEmptyNeighboursCells(start[0], start[1]);
                    start = Words.Utils.getRandArrayElement(area);
                }
                map.add(word, coordinates);
                return true;
            };
        };
        Generator.revert = function (matrix, map) {
            var matrix = matrix;
            var map = map;
            return function (word) {
                var elements = map.get(word);
                for (var i = 0; i < elements.length; i++) {
                    matrix.setElement(elements[i][0], elements[i][1], null);
                }
                map.remove(word);
            };
        };
        Generator.areasAreEnoughForWords = function (matrix, biggestWord, smallestWord) {
            var biggestArea = Generator.getBiggestEmptyArea(matrix);
            if (typeof biggestWord === "undefined") {
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
        Generator.getBiggestEmptyArea = function (matrix) {
            var areas = matrix.getEmptyAreas();
            Words.Utils.sortBySize(areas);
            return areas[0];
        };
        Generator.MAX_ATTEMPS = 100;
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
        Utils.isMatrixFilled = function (matrix, words) {
            var letters = Utils.getNumberOfLetters(words);
            return (matrix.getWidth() * matrix.getHeight() - matrix.getNumberOfEmptyCells()) == letters;
        };
        Utils.getNumberOfLetters = function (words) {
            var nbr = 0;
            var word;
            for (var i = 0; i < words.length; i++) {
                word = words[i];
                nbr += word.length;
            }
            return nbr;
        };
        return Utils;
    })();
    Words.Utils = Utils;
})(Words || (Words = {}));
