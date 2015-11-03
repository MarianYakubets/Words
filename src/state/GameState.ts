module Words {
    export class GameState extends Phaser.State {
        game: Phaser.Game;
        matrix: CharMatrix;
        //map: Phaser.Tilemap;
        //layer: Phaser.TilemapLayer;
        tilemap: Words.Tilemap;

        constructor() {
            super();
        }

        preload() {
        }

        create() {
            //background
            this.game.add.image(0, 0, 'green');
            //generate buttons
            var btn: Phaser.Button = this.game.add.button(this.game.world.width / 2 - 64, this.game.world.height - 64,
                'btn', this.createLevel, this, 2, 1, 0);
            var style: Phaser.PhaserTextStyle = { font: "20px Arial", fill: "#FFFFFF", align: "center" };
            var text: Phaser.Text = new Phaser.Text(this.game, btn.width / 2, btn.height / 2, "GENERATE", style);
            text.anchor.set(0.5);
            btn.addChild(text);
            //map for tiles
            this.tilemap = new Words.Tilemap(this.game);
            // this.map = this.game.add.tilemap();
            // this.map.addTilesetImage("letters", "letters", 64, 64);
            // this.layer = this.map.create('layer', 10, 10, 64, 64);

            var rect: Phaser.Rectangle = new Phaser.Rectangle(400, 400, 40, 40);
        }

        update() {

        }

        createTileMap() {
            // var step: number = 60;
            // var start: number = 150;
            // var elements: string[][] = this.matrix.getElements();
            // for (var i: number = 0; i < this.matrix.getWidth(); i++) {
            //     for (var j: number = 0; j < this.matrix.getHeight(); j++) {
            //         var index: number = Letter[elements[i][j].toUpperCase()];

            //         this.map.putTile(index, i, j, this.layer);

            //     }
            // }
            this.tilemap.draw(this.matrix);
        }

        createLevel() {
            var level: Level = new Level();
            var jObj = this.game.cache.getJSON('level');
            level.fillFromJSON(jObj);
            var done: boolean = false;
            
            //Create Matrix
            var size: number[] = Utils.getWidthAndHeight(level.getWords());
            this.matrix = new CharMatrix(size[0], size[1]);


            while (!done) {
                try {
                    Generator.generateMatrixForWords(level.getWords(), this.matrix);
                    done = true;
                } catch (error) {
                    alert("attemp fail");
                }
            }
            this.createTileMap()
        }
    }
}