import { changeShots } from "./Game";
function createShip( length , startPos, orientation, name ) {

    let posArray = [ startPos ];
    let shotsPerUnit = 0;

    if (name == "carrier") {
        shotsPerUnit = 3;
    }
    else if (name == "cruiser") {
        shotsPerUnit = 3;
    }
    else if (name == "destroyer") {
        shotsPerUnit = 2;
    }
    else if (name == "submarine") {
        shotsPerUnit = 1;
    }


    for ( let i = 1; i < length; i++) {
        if (orientation == "1") {
            posArray.push( [ startPos[0], startPos[1] - i ]);
        }
        else if ( orientation == "2") {
            posArray.push( [startPos[0] + i , startPos[1] - i]);
        }
        else if (orientation == "3") {
            posArray.push([startPos[0] + i, startPos[1] ]);
        }
        else if (orientation == "4") {
            posArray.push([startPos[0] + i, startPos[1] + i]);
        }
        else if (orientation == "5") {
            posArray.push([startPos[0] , startPos[1] + i]);
        }
        else if (orientation == "6") {
            posArray.push([startPos[0] - i, startPos[1] + i]);
        }
        else if (orientation == "7") {
            posArray.push([startPos[0] -i , startPos[1] ]);
        }
        else if (orientation == "8") {
            posArray.push([startPos[0] - i, startPos[1] - i]);
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
        shotsPerUnit: shotsPerUnit,
        name:name,
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
                changeShots( this.name);
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
            if ( this.orientation == "1") {
                this.orientation = "2";
                
            }
            else if ( this.orientation == "2"){
                this.orientation = "3";
            }
            else if ( this.orientation == "3"){
                this.orientation = "4";
            }
            else if ( this.orientation == "4") {
                this.orientation = "5";         
            }
            else if ( this.orientation == "5"){
                this.orientation = "6";
            }
            else if ( this.orientation == "6"){
                this.orientation = "7";
            }
            else if ( this.orientation == "7"){
                this.orientation = "8";
            }
            else if ( this.orientation == "8"){
                this.orientation = "1";
            }

            for ( let i = 1; i < this.length; i++) {
                if (this.orientation == "1") {
                    this.posArray.push( [ this.startPos[0], this.startPos[1] - i ]);
                }
                else if ( this.orientation == "2") {
                    this.posArray.push( [this.startPos[0] + i , this.startPos[1] - i]);
                }
                else if (this.orientation == "3") {
                    this.posArray.push([this.startPos[0] + i, this.startPos[1] ]);
                }
                else if (this.orientation == "4") {
                    this.posArray.push([this.startPos[0] + i, this.startPos[1] + i]);
                }
                else if (this.orientation == "5") {
                    this.posArray.push([this.startPos[0] , this.startPos[1] + i]);
                }
                else if (this.orientation == "6") {
                    this.posArray.push([this.startPos[0] - i, this.startPos[1] + i]);
                }
                else if (this.orientation == "7") {
                    this.posArray.push([this.startPos[0] -i , this.startPos[1] ]);
                }
                else if (this.orientation == "8") {
                    this.posArray.push([this.startPos[0] - i, this.startPos[1] - i]);
                }
            }
        },
        getShots() {
            return (this.length - this.hits.length) * shotsPerUnit;
        }
       

    }
}

export {createShip};