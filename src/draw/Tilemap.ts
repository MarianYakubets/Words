module Words {
	export class Tilemap {
		game: Phaser.Game;
		letters: CharMatrix;
		x: number;
		y: number;
		group: Phaser.Group;

		constructor(game: Phaser.Game) {
			this.game = game;
			this.group = this.game.add.group();
		}


		draw(letters: CharMatrix) {
			var step: number = 64;
			this.letters = letters;
			var elements: string[][] = letters.getElements();
            for (var i: number = 0; i < letters.getWidth(); i++) {
                for (var j: number = 0; j < letters.getHeight(); j++) {
                    var index: number = Letter[elements[i][j].toUpperCase()];
					this.group.create(i * step, j * step, 'letter', index);
                }
			}
			this.group.scale.set(3, 3);
			this.group.x = this.game.width / 2 - this.group.width / 2;
			this.group.y = this.game.height / 2 - this.group.height / 2;


		}

		clear() {

		}





	}
}