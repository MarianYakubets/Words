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
            this.game = new Phaser.Game(640, 480, Phaser.AUTO, 'content', {
                create: this.create, preload: this.preload });
        }
        Game.prototype.preload = function () {
            this.game.load.json('level', 'res/data/level1.json');
        };
        Game.prototype.create = function () {
            var obj = this.game.cache.getJSON('level');
            var level = new Level();
            level.fillFromJSON(obj);
            alert(level.getElements());
        };
        return Game;
    })();
    Words.Game = Game;
})(Words || (Words = {}));
window.onload = function () {
    var game = new Words.Game();
};
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
