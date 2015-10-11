Words.CellMap = function (w, h) {
	this.width = w;
	this.height = h;
	this.cells = this.createEmptyMap(w, h);
}

Words.CellMap.prototype = {
	createEmptyMap: function (w, h) {
		var columns = [];
		var row;
		for (var i = 0; i < w; i++) {
			row = [];
			for (var j = 0; j < h; j++) {
				row[j] = "";
			}
			columns[i] = row;
		}
		return columns;
	},

	getCell: function (x, y) {
		if (x < this.width && y < this.height && x >= 0 && y >= 0) {
			return this.cells[x][y];
		}
	},

	setCell: function (x, y, cell) {
		if (x < this.width && y < this.height && x >= 0 && y >= 0) {
			this.cells[x][y] = cell;
		}

	},

	isCellEmpty: function (x, y) {

	}
}