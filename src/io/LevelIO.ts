module Words {
	export class LevelIO {
		private static DIVIDER: string = ",";
		private static LEVEL_NAMES: string = "levels";

		public static charMatrixToString(matrix: CharMatrix): string {
			var s: string = "" + matrix.getWidth() + LevelIO.DIVIDER + matrix.getHeight();
			for (var i: number = 0; i < matrix.getWidth(); i++) {
				for (var j: number = 0; j < matrix.getHeight(); j++) {
					s += LevelIO.DIVIDER + matrix.getElement(i, j);
				}
			}
			return s;
		}

		public static stringToCharMatrix(s: string): CharMatrix {
			var elements: string[] = s.split(LevelIO.DIVIDER);
			var matrix: CharMatrix = new CharMatrix(+elements[0], +elements[1]);
			var elNumber: number = 2;
			for (var i: number = 0; i < matrix.getWidth(); i++) {
				for (var j: number = 0; j < matrix.getHeight(); j++) {
					matrix.setElement(i, j, elements[elNumber]);
					elNumber++;
				}
			}
			return matrix;
		}

		public static readLevelNames(): string[] {
			var names: string = localStorage.getItem(LevelIO.LEVEL_NAMES);
			return names.split(LevelIO.DIVIDER);
		}

		public static readLevel(levelName: string): Level {
			var data: string = localStorage.getItem(levelName);
			if (data == null) {
				return;
			}
			var matrix: CharMatrix = LevelIO.stringToCharMatrix(data);
			return new Words.Level(levelName, matrix);
		}

		public static writeLevel(levelName: string) {
			localStorage.setItem(levelName,LevelIO.charMatrixToString)
		}
	}
}
