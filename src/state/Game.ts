module Words {

	export class Game {
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
			//var obj:any = this.game.cache.getJSON('level');
			//var list:List = new List();
			//list.fillFromJSON(obj);
			//alert(list.getElements());
		}
	}
}


window.onload = () => {
    var game = new Words.Game();
};