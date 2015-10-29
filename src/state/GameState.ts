module Words {
    export class GameState extends Phaser.State {
        game: Phaser.Game;

        constructor() {
            super();
        }

        preload() {
        }

        create() {
            this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY - 100,
                'btn', this.createLevel, this, 2, 1, 0);
        }

        createLevel() {
            var level: Level = new Level();
            var jObj = this.game.cache.getJSON('level');
            level.fillFromJSON(jObj);
            var matrix: CharMatrix = Generator.generateMatrixForWords(level.getWords());
        }
    }
}