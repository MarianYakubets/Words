module Words {
    export class MainMenuState extends Phaser.State {
        game: Phaser.Game;

        constructor() {
            super();
        }


        preload() {
        }

        create() {
            this.game.add.image(0, 0, 'green');
            //generate buttons
            var playBtn: Words.TextBtn = new Words.TextBtn(this.game, this.game.width / 2 - 64, this.game.height / 2 - 210, "PLAY", this.play, this);
            this.game.add.existing(playBtn);

            var editBtn: Words.TextBtn = new Words.TextBtn(this.game, this.game.width / 2 - 64, this.game.height / 2, "EDIT", this.play, this);
            this.game.add.existing(editBtn);
        }

        play() {
            this.game.state.start("GameState");
        }


        edit() {
            this.game.state.start("EditorState");
        }
    }
}