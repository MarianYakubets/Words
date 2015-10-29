module Words {
	export class Generator {

		public static generateMatrixForWords(words: Array<String>): CharMatrix {
			Utils.sortBySize(words);
            var size: number[] = Utils.getWidthAndHeight(words);
			var matrix: CharMatrix = new CharMatrix(size[0], size[1]);
			var areas: number[][][];
			var word: String;
			areas = matrix.getEmptyAreas();
			Utils.sortBySize(areas);
			for (var i: number = 0; i < words.length; i++) {
				word = words[i];
				Generator.fillAreaWithWord(areas[0], word, matrix);

				areas = matrix.getEmptyAreas();
				Utils.sortBySize(areas);
				while (!this.areasAreEnoughForWords(areas[0], words[i + 1], words[words.length - 1])) {
					Generator.fillAreaWithWord(areas[0], word, matrix);
					areas = matrix.getEmptyAreas();
					Utils.sortBySize(areas);
				}
			}
			alert(matrix.getElements());
			return matrix;
		}

		private static fillAreaWithWord(area: number[][], word: String, matrix: CharMatrix) {
			var start: number[] = Utils.getRandArrayElement(area);
			for (var i: number = 0; i < word.length; i++) {
				matrix.setElement(start[0], start[1], word.charAt(i));
				area = matrix.getEmptyNeighboursCells(start[0], start[1]);
				if (area.length == 0) {
					i = word.length;
				}
				start = Utils.getRandArrayElement(area);
			}
		}

		private static areasAreEnoughForWords(biggestArea: number[][], biggestWord: String,
			smallestWord: String): boolean {
			if (biggestWord == undefined) {
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



	}
}