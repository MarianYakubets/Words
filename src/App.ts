module Words {
	export class App {

		game: Phaser.Game;

		constructor() {
			this.game = new Phaser.Game(720, 1280, Phaser.AUTO, 'content', {
				create: this.create, preload:
				this.preload });
		}
		preload() {
			this.game.load.json('level', 'res/data/level1.json');
			this.game.load.image('btn', 'res/img/yellow_btn.png');
			this.game.load.spritesheet('letter', 'res/img/letter_64.png',64,64);
			this.game.load.image('green', 'res/img/green.jpg');
		}

		create() {
		    this.game.state.add("MainMenuState", Words.MainMenuState, false);
            this.game.state.add("GameState",  Words.GameState, true);

            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		}
	}
}


window.onload = () => {
    var game = new Words.App();
};