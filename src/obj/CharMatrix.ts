module Words {
    export class CharMatrix {
        private elements: String[][];
		private width: number;
		private height: number;

		constructor(width: number, height: number) {
			this.width = width;
			this.height = height;
			this.elements = [];
			for (var i: number = 0; i < width; i++) {
				var col: Array<String> = [];
				for (var j: number = 0; j < height; j++) {
					col.push(null);
				}
				this.elements.push(col);
			}
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
			var els: String[] = [];
			for (var cell in this.getNeighboursCells(x, y)) {
				els.push(this.getElement(cell[0], cell[1]));
			}
			return els;
		}
		getNeighboursCells(x: number, y: number): number[][] {
			if (!this.belongTo(x, y)) { return; }
			var ns: number[][] = [];
			this.addIfBelongs(x - 1, y, ns);
			this.addIfBelongs(x + 1, y, ns);
			this.addIfBelongs(x, y - 1, ns);
			this.addIfBelongs(x, y + 1, ns);
			return ns;
		}
		addIfBelongs(x: number, y: number, neighbours: number[][]) {
			if (this.belongTo(x, y)) {
				neighbours.push([x, y]);
			}
		}
		getSizeofNeighbours(x: number, y: number): number {
			if (!this.belongTo(x, y)) { return; }
			return this.getNeighboursCells(x, y).length;
		}
		getSizeofEmptyNeighbours(x: number, y: number): number {
			if (!this.belongTo(x, y)) { return; }
			return 1;
		}
		getNumberOfEmptyAreas(): number {
			return 1;
		}
		getEmptyAreas(): number[][] {
			var elements: String[][] = this.elements.slice(0, elements.length);
			var area: number[][] = this.fillArea(0, 0, elements);
			return area;
		}

		fillArea(x: number, y: number, elements: String[][]): number[][] {
			if (elements[x][y] == null) {

			}
			return;
		}

		belongTo(x: number, y: number): boolean {
			return x >= 0 && x < this.width && y >= 0 && x < this.height;
		}
		getElements(): String[][] {
			return this.elements;
		}
		setElements(elements: String[][]) {
			this.elements = elements;
		}
    }
}