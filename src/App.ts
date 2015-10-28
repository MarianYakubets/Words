module Words {
	export class App {
		game: Phaser.Game;

		constructor() {
			this.game = new Phaser.Game(640, 480, Phaser.AUTO, 'content', {
				create: this.create, preload:
				this.preload });
		}
		preload() {
			this.game.load.json('level', 'res/data/level1.json');
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