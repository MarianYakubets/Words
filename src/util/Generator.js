function Generator() {

}
Generator.generateLevel = function (words) {

	var summ = 0;
	for (var i = 0; i < words.length; i++) {
		summ = summ + words[i].length;
	}
	var width = Math.floor(Math.sqrt(summ));
	var heigth = summ / width;

	var map = new Words.CellMap(width, heigth);

	alert(Generator.getEmptyArea(0, 0, map));
};

Generator.getRandomNumber = function (min, max) {
	return (Math.round(Math.random() * (max - min)) + min);
};

Generator.getEmptyAreas = function (map) {
};

Generator.getEmptyArea = function (x, y, map) {
	if (map.getCell(x, y) == "") {
		var area = [];
		area.push([x, y]);
		area.push(Generator.getCellWithNeightbors(x, y, map));
		return area;
	}
};

Generator.getCellWithNeightbors = function (x, y, map) {
	if (map.getCell(x, y) == "") {
		map.setCell(x, y, "0")
		var cells = [];
		cells.push([x, y]);
		cells.push(Generator.getCellWithNeightbors(x + 1, y, map));
		cells.push(Generator.getCellWithNeightbors(x - 1, y, map));
		cells.push(Generator.getCellWithNeightbors(x, y + 1, map));
		cells.push(Generator.getCellWithNeightbors(x, y - 1, map));

		return cells;
	}
}

Generator.getSortedArray = function (arr, appending) {
};

Generator.isSmallestAreaEnoughForSmallestWord = function (areas, words) {
};
