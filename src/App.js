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
