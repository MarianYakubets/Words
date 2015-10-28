module Words {
    export class GameState extends Phaser.State {
        game: Phaser.Game;

        constructor() {
            super();
        }

        preload() {
        }

        create() {
            alert("GameState");
        }
    }
}