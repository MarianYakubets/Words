module Words {
	export class Level {
		name: string;
		matrix: CharMatrix;
		constructor(name: string, matrix: CharMatrix) {
			this.name = name;
			this.matrix = matrix;
		}
	}
}