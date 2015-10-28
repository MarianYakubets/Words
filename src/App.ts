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
		
		}
	}
}


window.onload = () => {
    var game = new Words.App();
};