///<reference path='../util/Serializable' />
module Words {
    export class Level extends Serializable {
        words: Array<string>;
        getWords(): Array<string> { return this.words }
    }
}