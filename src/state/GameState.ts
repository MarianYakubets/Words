module Words {
    export class GameState extends Phaser.State {
        game: Phaser.Game;
        tiles: Phaser.Group;
        matrix: CharMatrix;

        constructor() {
            super();
        }

        preload() {
        }

        create() {
            this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY - 100,
                'btn', this.createLevel, this, 2, 1, 0);
            this.tiles = this.game.add.group();
        }

        update() {

        }

        createTileMap() {
            this.tiles.removeAll();
            var style: any = { font: "bold 32px Arial", fill: "#ff0", boundsAlignH: "center", boundsAlignV: "middle" };
            var step: number = 50;
            var elements: string[][] = this.matrix.getElements();
            for (var i: number = 0; i < this.matrix.getWidth(); i++) {
                for (var j: number = 0; j < this.matrix.getHeight(); j++) {
                    var tile = this.game.add.text(i * step, j * step, elements[i][j], style, this.tiles);
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