function Generator() {

}
Generator.generateLevel = function (words) {
	var cells = [[]];
	var summ = 0;
	for (var i = 0; i < words.length; i++) {
		summ = summ + words[i].length;
	}
	var width = Math.floor(Math.sqrt(summ));
	var heigth = summ / width;

	alert(Generator.getRandomNumber(11, 21));
};

Generator.getRandomNumber = function (min, max) {
	return (Math.round(Math.random() * (max - min)) + min);
};

Generator.getEmptyAreas = function (cells) {
};

Generator.getSortedArray = function (arr, appending) {
};

Generator.isSmallestAreaEnoughForSmallestWord = function (areas, words) {
};
