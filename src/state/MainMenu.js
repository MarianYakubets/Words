
Words.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

Words.MainMenu.prototype = {

	create: function () {
		this.startGame();
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function () {
		//	And start the actual game
		this.state.start('Game');

	}

};
