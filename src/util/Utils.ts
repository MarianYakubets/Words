module Words {
	export class Utils {

		public static getRandomNumber(max: number, min: number): number {
			return (Math.round(Math.random() * (max - min)) + min);
		}

		public static getRandomDirection(x: number, y: number): number[] {
			var rand: number = Utils.getRandomNumber(1, 4);
			switch (rand) {
				case 1:
					return [++x, y];
				case 2:
					return [--x, y];
				case 3:
					return [x, ++y];
				case 4:
					return [x, --y];
			}
		}

		public static getWidthAndHeight(words: Array<string>): number[] {
			var size: number = 0;
			for (var i: number = 0; i < words.length; i++) {
				size = size + words[i].length;
			}
			var width: number = Math.floor(Math.sqrt(size));
			var heigth: number = size / width;
			return [width, heigth];
		}

		public static sortBySize(elements: Array<{ length: number }>) {
			return elements.sort((w1, w2) => w2.length - w1.length);
		}

		public static getRandArrayElement(elements: Array<any>): any {
			var rand: number = Utils.getRandomNumber(elements.length - 1, 0);
			return elements[rand];
		}

		public static isMatrixFilled(matrix: CharMatrix, words: Array<string>): boolean {
			var letters: number = Utils.getNumberOfLetters(words);
			return (matrix.getWidth() * matrix.getHeight() - matrix.getNumberOfEmptyCells()) == letters;
		}

		public static getNumberOfLetters(words: Array<string>): number {
			var nbr: number = 0;
			var word: string;
			for (var i: number = 0; i < words.length; i++) {
				word = words[i];
				nbr += word.length;
			}
			return nbr;
		}

	}
}