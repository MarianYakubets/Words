module Words {
    export class CharMatrix {
        private elements: string[][];
		private width: number;
		private height: number;
		private TAKEN: string = "taken";

		constructor(width: number, height: number) {
			this.width = width;
			this.height = height;
			this.elements = [];
			for (var i: number = 0; i < width; i++) {
				var col: Array<string> = [];
				for (var j: number = 0; j < height; j++) {
					col.push(null);
				}
				this.elements.push(col);
			}
		}

		getElement(x: number, y: number): string {
			if (!this.belongTo(x, y)) { return; }
			return this.elements[x][y];
		}

		setElement(x: number, y: number, element: string) {
			if (!this.belongTo(x, y)) { return; }
			this.elements[x][y] = element;
		}

		isEmpty(x: number, y: number): boolean {
			if (!this.belongTo(x, y)) { return; }
			return this.elements[x][y] == null;
		}

		getNeighboursElements(x: number, y: number): string[] {
			if (!this.belongTo(x, y)) { return; }
			var els: string[] = [];
			for (var cell in this.getNeighboursCells(x, y)) {
				els.push(this.getElement(cell[0], cell[1]));
			}
			return els;
		}

		getNeighboursCells(x: number, y: number): number[][] {
			if (!this.belongTo(x, y)) { return []; }
			var ns: number[][] = [];
			this.addIfBelongs(x - 1, y, ns);
			this.addIfBelongs(x + 1, y, ns);
			this.addIfBelongs(x, y - 1, ns);
			this.addIfBelongs(x, y + 1, ns);
			return ns;
		}

		getEmptyNeighboursCells(x: number, y: number): number[][] {
			if (!this.belongTo(x, y)) { return []; }
			var ns: number[][] = [];
			this.addIfBelongsAndEmpty(x - 1, y, ns);
			this.addIfBelongsAndEmpty(x + 1, y, ns);
			this.addIfBelongsAndEmpty(x, y - 1, ns);
			this.addIfBelongsAndEmpty(x, y + 1, ns);
			return ns;
		}

		addIfBelongs(x: number, y: number, neighbours: number[][]) {
			if (this.belongTo(x, y)) {
				neighbours.push([x, y]);
			}
		}

		addIfBelongsAndEmpty(x: number, y: number, neighbours: number[][]) {
			if (this.belongTo(x, y) && this.isEmpty(x, y)) {
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

		getEmptyAreas(): number[][][] {
			var areas: number[][][] = [];
			var emptyCell: number[] = this.findEmpty();
			while (emptyCell != null) {
				areas.push(this.fillArea(emptyCell[0], emptyCell[1], []))
				emptyCell = this.findEmpty();
			}
			this.сlearTaken();
			return areas;
		}

		fillArea(x: number, y: number, area: number[][]): number[][] {
			var neighbours: number[][] = this.getEmptyNeighboursCells(x, y);
			neighbours.forEach(n => {
				if (this.isEmpty(n[0], n[1])) {
					area.push(n);
					this.setElement(n[0], n[1], this.TAKEN);
					this.fillArea(n[0], n[1], area);
				}
			});
			return area;
		}

		belongTo(x: number, y: number): boolean {
			return x >= 0 && x < this.width && y >= 0 && y < this.height;
		}

		сlearTaken() {
			for (var i: number = 0; i < this.width; i++) {
				for (var j: number = 0; j < this.height; j++) {
					if (this.elements[i][j] == this.TAKEN) {
						this.elements[i][j] = null;
					}
				}
			}
		}

		findEmpty(): number[] {
			for (var i: number = 0; i < this.width; i++) {
				for (var j: number = 0; j < this.height; j++) {
					if (this.isEmpty(i, j)) {
						return [i, j];
					}
				}
			}
			return null;
		}

		clear() {
			for (var i: number = 0; i < this.width; i++) {
				for (var j: number = 0; j < this.height; j++) {
					this.elements[i][j] = null;
				}
			}
		}

		getElements(): string[][] {
			return this.elements;
		}

		setElements(elements: string[][]) {
			this.elements = elements;
		}
		
		getWidth(){
			return this.width;
		}
		
		getHeight(){
			return this.height;
		}
    }
}