module Words {
	export class Generator {
		private static MAX_ATTEMPS: number = 10;

		public static generateMatrixForWords(words: Array<string>, matrix: CharMatrix): CharMatrix {			
			//Sort words
			Utils.sortBySize(words);

			var attemp = 0;
			while (!Generator.generateAll(matrix, words) && attemp < Generator.MAX_ATTEMPS) {
				attemp++;
			}

			alert(matrix.getElements());
			return matrix;
		}

		private static generateAll(matrix: CharMatrix, words: Array<string>): boolean {
			matrix.clear();
			//Create Functions
			var fill = this.fill(matrix, new Dictionary([]));
			var revert = this.revert(matrix, new Dictionary([]));
			var attemp: number = 0;
			var word: string;
			for (var i: number = 0; i < words.length; i++) {
				word = words[i];
				while (!fill(word) && attemp < Generator.MAX_ATTEMPS) {
					revert(word);
					attemp++;
				}
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
					start = Utils.getRandArrayElement(area);
					if (start == undefined) {
						return false;
					}
					matrix.setElement(start[0], start[1], word.charAt(i));
					coordinates.push(start);
					area = matrix.getEmptyNeighboursCells(start[0], start[1]);
				}
				map.add(word, coordinates);
				return true;
			}
		}

		private static revert(matrix: CharMatrix, map: IDictionary) {
			var matrix: CharMatrix = matrix;
			var map: IDictionary = map;
			return function(word: string) {
				for (var el in map.get(word)) {
					matrix.setElement(el[0], el[1], null);
				}
				map.remove(word);
			}
		}

		private static areasAreEnoughForWords(matrix: CharMatrix, biggestWord: string,
			smallestWord: string): boolean {
			var biggestArea: number[][] = Generator.getBiggestEmptyArea(matrix);
			if (biggestWord == undefined) {
				return true;
			}
			if (biggestArea.length < biggestWord.length) {
				return false;
			}
			if (biggestArea.length == biggestWord.length) {
				return true;
			}
			alert("some shit");
			return biggestArea.length - biggestWord.length - smallestWord.length >= 0;
		}

		private static getBiggestEmptyArea(matrix: CharMatrix): number[][] {
			var areas: number[][][] = matrix.getEmptyAreas();
			Utils.sortBySize(areas);
			return areas[0];
		}
	}
}