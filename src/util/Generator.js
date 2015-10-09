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
	alert(width);
	alert(heigth);
};