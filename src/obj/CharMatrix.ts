module Words {
    export class CharMatrix {
        private elements: String[][];
		private width: number;
		private height: number;

		getElements(): String[][] {
			return this.elements;
		}
		getElement(x: number, y: number): String {
			if (!this.belongTo(x, y)) { return; }
			return this.elements[x][y];
		}
		setElement(x: number, y: number, element: String) {
			if (!this.belongTo(x, y)) { return; }
			this.elements[x][y] = element;
		}
		isEmpty(x: number, y: number): boolean {
			if (!this.belongTo(x, y)) { return; }
			return this.elements[x][y] == null;
		}
		getNeighboursElements(x: number, y: number): String[] {
			if (!this.belongTo(x, y)) { return; }
			return null;
		}
		getNeighboursCells(x: number, y: number): number[][] {
			if (!this.belongTo(x, y)) { return; }
			return null;
		}
		getSizeofNeighbours(x: number, y: number): number {
			if (!this.belongTo(x, y)) { return; }
			return 1;
		}
		getSizeofEmptyNeighbours(x: number, y: number): number {
			if (!this.belongTo(x, y)) { return; }
			return 1;
		}
		getNumberOfEmptyAreas(): number {
			return 1;
		}
		getEmptyAreas(): number[][] {
			return null;
		}
		belongTo(x: number, y: number): boolean {
			return x >= 0 && x < this.width && y >= 0 && x < this.height;
		}
    }
}