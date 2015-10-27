declare class Serializable {
    fillFromJSON(json: string) : void{
        var jsonObj = JSON.parse(json);
        for (var propName in jsonObj) {
            this[propName] = jsonObj[propName]
        }
    }
}