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

		public static getWidthAndHeight(words: Array<String>): number[] {
			var size: number = 0;
			for (var i: number = 0; i < words.length; i++) {
				size = size + words[i].length;
			}
			var width: number = Math.floor(Math.sqrt(size));
			var heigth: number = size / width;
			return [width, heigth];
		}
	}
}