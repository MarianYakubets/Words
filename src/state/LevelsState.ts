module Words {
    export class LevelState extends Phaser.State {
        game: Phaser.Game;
        matrix: CharMatrix;
        tilemap: Words.Tilemap;

        constructor() {
            super();
        }

        preload() {
        }

        create() {
            //background
            this.game.add.image(0, 0, 'green');
            
        }

        update() {

        }
    }
}