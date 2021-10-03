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
             if (isArrayInArray( this.posArray, position ) ) {
                console.log("got hit")
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
                    this.startPos = [ this.startPos[0] +1, this.startPos[1] ];
                    this.posArray = this.posArray.map( x => [x[0] + 1, x[1] ] );
                    break;
                case "left":
                    this.startPos = [ this.startPos[0]-1, this.startPos[1] ];
                    this.posArray = this.posArray.map( x => [x[0] - 1, x[1] ] );
                    break;
                case "down":
                    //console.log(this.startPos);
                    this.startPos = [ this.startPos[0], this.startPos[1]  + 1];
                    this.posArray = this.posArray.map( x => [x[0] , x[1] +1 ] );
                    //console.log(this.posArray);
                    break;
                case "up" :
                    this.startPos = [ this.startPos[0], this.startPos[1]  - 1];
                    this.posArray = this.posArray.map( x => [x[0] , x[1] -1 ] );
                    break;
            }

        },
        rotate() {
            this.posArray.length = 0;
            this.posArray = [ this.startPos ];
            if ( this.orientation == "horizontal") {
                this.orientation = "vertical";
                
            }
            else {
                this.orientation = "horizontal";
            }

            for ( let i = 1; i < this.length; i++) {
                if (this.orientation == "horizontal") {
                    this.posArray.push( [ this.startPos[0]+ i, this.startPos[1]]);
                }
                else if ( this.orientation == "vertical") {
                    this.posArray.push( [this.startPos[0], this.startPos[1] + i]);
                }
            }
        }
       

    }
}

export {createShip};