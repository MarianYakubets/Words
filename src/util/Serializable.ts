module Words {
    export class Serializable {
        fillFromJSON(jsonObj): void {
            for (var propName in jsonObj) {
                this[propName] = jsonObj[propName]
            }
        }
    }
}