function Generator(){
 this.generateTiles =  function generateTiles(words) {
    return sortDescSize(words);
  }

  function getSize(words){
      var size = words.reduce(function(summ,current) {
        return summ + current.length;
      }, 0);
      var width = Math.floor(Math.sqrt(size));
      return {width:width, height: Math.floor(size/width)}
  }
  
  function sortDescSize(words) {
    return words.sort(function(a,b){
      if (a.length > b.length){
        return -1;
      }
      if (a.length === b.length){
        return 0;
      }
        return 1;
    });
  }
  
};

var generator = new Generator();
console.log(generator.generateTiles(["dow","bigge","bigger", "sm", "dog"]));
