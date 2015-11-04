module Words {
    export class EditorState extends Phaser.State {
        game: Phaser.Game;
        matrix: CharMatrix;
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
            var btn: Words.TextBtn = new Words.TextBtn(this.game, this.game.width / 2 - 64, this.game.height - 110, "GENERATE", this.createLevel, this);
            this.game.add.existing(btn); 
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