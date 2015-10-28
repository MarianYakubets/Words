class Level extends Serializable{
    elements: Array<String>;
    constructor(){
        super();
    }
    getElements(): Array<String> { return this.elements }
}