import { createShip } from "./Ship";

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
        placeShip( length, startPos, orientation ) {
            let blocking = false;
            let ship = createShip( length, startPos, orientation );
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
                    newShip = createShip( ship.length, [ship.posArray[0][0] +1, ship.posArray[0][1]], ship.orientation);
                    break;
                case "left":
                    newShip = createShip( ship.length, [ship.posArray[0][0] -1, ship.posArray[0][1] ], ship.orientation);
                    break;
                case "down":
                    newShip = createShip( ship.length,[ship.posArray[0][0], ship.posArray[0][1] + 1], ship.orientation);
                    break;
                case "up" :
                    newShip = createShip( ship.length, [ship.posArray[0][0], ship.posArray[0][1] - 1] , ship.orientation);
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
        },
        rotate( ship ) {
            let canRotate = true;
            let newShip;
            if ( ship.orientation == "horizontal") {
                //want to rotate to vertical
                newShip = createShip( ship.length, ship.posArray[0], "vertical");
            }
            else {
                newShip = createShip( ship.length, ship.posArray[0], "horizontal");
            }

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
        }
    }
}

export {createGameBoard};