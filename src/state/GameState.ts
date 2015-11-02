module Words {
    export class GameState extends Phaser.State {
        game: Phaser.Game;
        tiles: Phaser.Group;
        matrix: CharMatrix;
        map: Phaser.Tilemap;
        layer: Phaser.TilemapLayer

        constructor() {
            super();
        }

        preload() {
        }

        create() {
            this.game.add.image(0, 0, 'green');
            this.game.add.button(this.game.world.width - 50, this.game.world.height - 50,
                'btn', this.createLevel, this, 2, 1, 0);
            this.tiles = this.game.add.group();

            this.map = this.game.add.tilemap();
            this.map.addTilesetImage("letters", "letters", 64, 64);

            this.layer = this.map.create('layer', 10, 10, 64, 64);

        }

        update() {

        }

        createTileMap() {
            this.tiles.removeAll();
            var style: any = { font: "bold 40px Arial", fill: "#ff0", boundsAlignH: "center", boundsAlignV: "middle" };
            var step: number = 60;
            var start: number = 150;
            var elements: string[][] = this.matrix.getElements();
            for (var i: number = 0; i < this.matrix.getWidth(); i++) {
                for (var j: number = 0; j < this.matrix.getHeight(); j++) {
                    var index: number = Letter[elements[i][j].toUpperCase()];

                    this.map.putTile(index, i, j, this.layer);

                }
            }
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