<<<<<<< HEAD
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Level = (function (_super) {
    __extends(Level, _super);
    function Level() {
        _super.call(this);
    }
    Level.prototype.getElements = function () { return this.elements; };
    return Level;
})(Serializable);
var Words;
(function (Words) {
    var Game = (function () {
        function Game() {
=======
var Words;
(function (Words) {
    var App = (function () {
        function App() {
>>>>>>> d8c693b22f658f9f194e40a549f14bf068cf8200
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
                return;
            }
            var ns = [];
            this.addIfBelongs(x - 1, y, ns);
            this.addIfBelongs(x + 1, y, ns);
            this.addIfBelongs(x, y - 1, ns);
            this.addIfBelongs(x, y + 1, ns);
            return ns;
        };
        CharMatrix.prototype.addIfBelongs = function (x, y, neighbours) {
            if (this.belongTo(x, y)) {
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
            return null;
        };
        CharMatrix.prototype.belongTo = function (x, y) {
            return x >= 0 && x < this.width && y >= 0 && x < this.height;
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
<<<<<<< HEAD
var Serializable = (function () {
    function Serializable() {
    }
    Serializable.prototype.fillFromJSON = function (json) {
        var jsonObj = JSON.parse(json);
        for (var propName in jsonObj) {
            this[propName] = jsonObj[propName];
        }
    };
    return Serializable;
})();
=======
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
            alert("GameState");
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
>>>>>>> d8c693b22f658f9f194e40a549f14bf068cf8200
