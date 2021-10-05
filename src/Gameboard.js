import { createShip } from "./Ship";
import {errorHighlight} from "./DOM.js";

function createGameBoard() {

    function isArrayInArray(arr, item){
        var item_as_string = JSON.stringify(item);
      
        var contains = arr.some(function(ele){
          return JSON.stringify(ele) === item_as_string;
        });
        return contains;
    }

    return  {
        ships : [],
        hits : [],
        misses : [],
        placeShip( length, startPos, orientation, name ) {
            let blocking = false;
            let ship = createShip( length, startPos, orientation, name );
            this.ships.forEach( otherShip => {
                otherShip.posArray.forEach( pos => {
                    if ( isArrayInArray(ship.posArray, pos) ) {
                        blocking = true;
                    }
                })
            })

            if (!blocking) {
                this.ships.push( ship);
            }

        },
        receiveAttack( position) {
            
            let isHit = false;
            this.ships.forEach( ship => {
                if (ship.hit( position)) {
                    this.hits.push( position);
                    isHit = true;
                }
            })
            
            if ( !isHit) {
                this.misses.push(position);

            }

            return isHit;
            
            //position has now been hit
        }, 
        allSunk() {
            let sunk = true;
            this.ships.forEach( ship => {
                if ( !ship.isSunk()) {
                    sunk = false;
                }
            });
            return sunk;
        },
        //BIG PROBLEM: START HERE, MOVE DOESNT WORK!!!!!!!!!!!!!!!!
        move( ship, direction) {
            let canMove = true;
            let newShip;
            //console.log(" y coord: " + ship.posArray[0][1]);
            //console.log( ship)
            switch(direction) {
                case "right":
                    newShip = createShip( ship.length, [ship.posArray[0][0] +1, ship.posArray[0][1]], ship.orientation, ship.name);
                    break;
                case "left":
                    newShip = createShip( ship.length, [ship.posArray[0][0] -1, ship.posArray[0][1] ], ship.orientation, ship.name);
                    break;
                case "down":
                    newShip = createShip( ship.length,[ship.posArray[0][0], ship.posArray[0][1] + 1], ship.orientation, ship.name);
                    break;
                case "up" :
                    newShip = createShip( ship.length, [ship.posArray[0][0], ship.posArray[0][1] - 1] , ship.orientation, ship.name);
                    //console.log( newShip.posArray);
                    break;
            }
            //console.log(newShip);
            //console.log(" y coord: " + newShip.posArray[0][1]);
            this.ships.forEach( otherShip => {
                if (otherShip != ship) {
                    otherShip.posArray.forEach(pos => {
                        if (isArrayInArray(newShip.posArray, pos)) {
                            console.log("anothership in the way!!!")
                            canMove = false;
                        }
                    })
                }

                newShip.posArray.forEach( pos => {
                    if ( pos[0] > 9 || pos[1] > 9 || pos[0] < 0 || pos[1] < 0) {
                        console.log("reached the border!!");
                        canMove = false;
                    }
                })

            })
            console.log("can move:" + canMove + " in " +direction);
            if (canMove) {
                ship.move(direction);
                console.log(this.ships);
            }
            else {
                errorHighlight(ship);
            }
        },
        rotate( ship ) {
            let canRotate = true;
            let newShip;
            if ( ship.orientation == "1") {
                //want to rotate to vertical
                newShip = createShip( ship.length, ship.posArray[0], "2" , ship.name);
            }
            else if ( ship.orientation == "2") {
                newShip = createShip( ship.length, ship.posArray[0], "3", ship.name);
            }
            else if ( ship.orientation == "3") {
                newShip = createShip( ship.length, ship.posArray[0], "4", ship.name);
            }
            else if ( ship.orientation == "4") {
                newShip = createShip( ship.length, ship.posArray[0], "5", ship.name);
            }
            else if ( ship.orientation == "5") {
                newShip = createShip( ship.length, ship.posArray[0], "6", ship.name);
            }
            else if ( ship.orientation == "6") {
                newShip = createShip( ship.length, ship.posArray[0], "7", ship.name);
            }
            else if ( ship.orientation == "7") {
                newShip = createShip( ship.length, ship.posArray[0], "8", ship.name);
            }
            else if ( ship.orientation == "8") {
                newShip = createShip( ship.length, ship.posArray[0], "1", ship.name);
            }
    
            console.log( newShip);


            this.ships.forEach( otherShip => {
                if (otherShip != ship) {
                    otherShip.posArray.forEach(pos => {
                        if (isArrayInArray(newShip.posArray, pos)) {
                            console.log("anothership in the way!!!")
                            canRotate = false;
                        }
                    })
                }

                newShip.posArray.forEach( pos => {
                    if ( pos[0] > 9 || pos[1] > 9 || pos[0] < 0 || pos[1] < 0) {
                        console.log("reached the border!!");
                        canRotate = false;
                    }
                })
            })

            console.log( "can rotate: " + canRotate );
            if (canRotate) {
                ship.rotate();
                console.log(this.ships);
            }
            else {
                errorHighlight(ship);
            }
        }
    }
}

export {createGameBoard};