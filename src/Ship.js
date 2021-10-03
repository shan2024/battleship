function createShip( length , startPos, orientation ) {

    let posArray = [ startPos ];
    for ( let i = 1; i < length; i++) {
        if (orientation == "horizontal") {
            posArray.push( [ startPos[0]+ i, startPos[1]]);
        }
        else if ( orientation == "vertical") {
            posArray.push( [startPos[0], startPos[1] + i]);
        }
    }

    function isArrayInArray(arr, item){
        var item_as_string = JSON.stringify(item);
      
        var contains = arr.some(function(ele){
          return JSON.stringify(ele) === item_as_string;
        });
        return contains;
      }
      
    

    return {
        selected: false,
        startPos:startPos,
        posArray : posArray,
        hits: [],
        length: length,
        orientation: orientation,
        //position should be an array
        hit( position) {
             if (isArrayInArray( posArray, position ) ) {
                this.hits.push( position);
                return true;
            }
            else {
                return false;
            }
        },
        isSunk() {
            if ( this.hits.length == this.length) {
        
                return true;
            }
            else {
                return false;
            }
        },
        move(direction) {
            switch(direction) {
                case "right":
                    this.posArray = this.posArray.map( x => [x[0] + 1, x[1] ] );
                    break;
                case "left":
                    this.posArray = this.posArray.map( x => [x[0] - 1, x[1] ] );
                    break;
                case "down":
                    this.posArray = this.posArray.map( x => [x[0] , x[1] +1 ] );
                    console.log(this.posArray);
                    break;
                case "up" :
                    this.posArray = this.posArray.map( x => [x[0] , x[1] -1 ] );
                    break;
            }

        }
       

    }
}

export {createShip};