module Words {
    export class GameState extends Phaser.State {
        game: Phaser.Game;

        constructor() {
            super();
        }

        preload() {
        }

        create() {
            var level: Level = new Level();
            var jObj = this.game.cache.getJSON('level');
            level.fillFromJSON(jObj);
            var matrix: CharMatrix = Generator.generateMatrixForWords(level.getWords());
            alert(matrix);
        }
    }
}