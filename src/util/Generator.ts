module Words {
	export class Generator {
		private static MAX_ATTEMPS: number = 100;

		public static generateMatrixForWords(words: Array<string>, matrix: CharMatrix): CharMatrix {			
			//Sort words
			Utils.sortBySize(words);

			var attemp: number = 0;
			while ((!Generator.generateAll(matrix, words)
				|| !Utils.isMatrixFilled(matrix, words))
				&& attemp < Generator.MAX_ATTEMPS) {
				attemp++;
			}

			return matrix;
		}

		private static generateAll(matrix: CharMatrix, words: Array<string>): boolean {
			matrix.clear();
			//Create Functions
			var map: IDictionary = new Dictionary([]);
			var fill = this.fill(matrix, map);
			var revert = this.revert(matrix, map);
			var attemp: number = 0;
			var word: string;
			for (var i: number = 0; i < words.length; i++) {
				attemp = 0;
				word = words[i];
				while (!fill(word) && attemp < Generator.MAX_ATTEMPS) {
					revert(word);
					attemp++;
				}
			}
			if (attemp == Generator.MAX_ATTEMPS) {
				return false;
			}

			return true;
		}

		private static fill(matrix: CharMatrix, map: IDictionary): any {
			var matrix: CharMatrix = matrix;
			var map: IDictionary = map;
			return function(word: string): boolean {
				var area: number[][] = Generator.getBiggestEmptyArea(matrix);
				var start: number[] = Utils.getRandArrayElement(area);
				var coordinates: number[][] = [];
				for (var i: number = 0; i < word.length; i++) {
					if (area.length == 0) {
						map.add(word, coordinates);
						return false;
					}
					matrix.setElement(start[0], start[1], word.charAt(i));
					coordinates.push(start);
					area = matrix.getEmptyNeighboursCells(start[0], start[1]);
					start = Utils.getRandArrayElement(area);
				}
				map.add(word, coordinates);
				return true;
			}
		}

		private static revert(matrix: CharMatrix, map: IDictionary): any {
			var matrix: CharMatrix = matrix;
			var map: IDictionary = map;
			return function(word: string) {
				var elements = map.get(word);
				for (var i: number = 0; i < elements.length; i++) {
					matrix.setElement(elements[i][0], elements[i][1], null);
				}
				map.remove(word);
			}
		}

		private static areasAreEnoughForWords(matrix: CharMatrix, biggestWord: string,
			smallestWord: string): boolean {
			var biggestArea: number[][] = Generator.getBiggestEmptyArea(matrix);
			if (typeof biggestWord === "undefined") {
				return true;
			}
			if (biggestArea.length < biggestWord.length) {
				return false;
			}
			if (biggestArea.length == biggestWord.length) {
				return true;
			}
			return biggestArea.length - biggestWord.length - smallestWord.length >= 0;
		}

		private static getBiggestEmptyArea(matrix: CharMatrix): number[][] {
			var areas: number[][][] = matrix.getEmptyAreas();
			Utils.sortBySize(areas);
			return areas[0];
		}
	}
}