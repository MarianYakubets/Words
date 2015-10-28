///<reference path='../util/Serializable' />
module Words {
    export class Level extends Serializable {
        words: Array<String>;
        getWords(): Array<String> { return this.words }
    }
}