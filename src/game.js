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
            var obj = this.game.cache.getJSON('level');
            alert("obj");
            var level = new Words.Level();
            level.fillFromJSON(obj);
            alert(level.getWords());
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
