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
        }

        update() {

        }

        createTileMap() {
            this.tilemap.draw(this.matrix);
        }

        createLevel() {
            var level: WordsSet = new WordsSet();
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

            var result: string = LevelIO.charMatrixToString(this.matrix);
            console.log(result);
            this.matrix = LevelIO.stringToCharMatrix(result);
            this.createTileMap();
        }
    }
}