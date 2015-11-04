module Words {
	export class TextBtn extends Phaser.Button {
		constructor(game: Phaser.Game, x: number, y: number, name: string, onClickCallback:any, context:any) {
			super(game, x, y, 'btn', onClickCallback, context, 2, 1, 0);
			 var style: Phaser.PhaserTextStyle = { font: "20px Arial", fill: "#FFFFFF", align: "center" };
            var text: Phaser.Text = new Phaser.Text(this.game, this.width / 2, this.height / 2, name, style);
            text.anchor.set(0.5);
            this.addChild(text);
		}
	}
}