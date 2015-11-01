module Words {
    export class GenerateState extends Phaser.State {
        game: Phaser.Game;
        matrix:CharMatrix;
        tiles:Phaser.Group;

        constructor() {
            super();
        }

        preload() {
        }

        create() {
            this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY - 100,
                'btn', this.createLevel, this, 2, 1, 0);
            this.tiles = this.game.add.group();
            this.tiles = this.game.add.group();
            this.tiles = this.game.add.group();
        }
        
        update(){
                
        }

        createLevel() {
            var level: Level = new Level();
            var jObj = this.game.cache.getJSON('level');
            level.fillFromJSON(jObj);
            var matrix: CharMatrix;
            var done: boolean = false;
            while (!done) {
                try {
                    matrix = Generator.generateMatrixForWords(level.getWords());
                    done = true;
                } catch (error) {
                    alert("attemp fail");
                }
            }
        }
    }
}