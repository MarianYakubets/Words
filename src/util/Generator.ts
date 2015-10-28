module Words {
	export class Generator {

		public static generateMatrixForWords(words: Array<String>): CharMatrix {
            var size: number[] = Utils.getWidthAndHeight(words);
			var matrix: CharMatrix = new CharMatrix(size[0], size[1]);
			

			return matrix;
		}

	
	}
}