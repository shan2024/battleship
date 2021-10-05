
function createPlayer(gameBoard , enemyGameboard, isComputer ) {
    
    
    function isArrayInArray(arr, item){
        var item_as_string = JSON.stringify(item);
      
        var contains = arr.some(function(ele){
          return JSON.stringify(ele) === item_as_string;
        });
        return contains;
    }

    if ( isComputer) {
        return {
            gameBoard:gameBoard,
            enemyGameboard: enemyGameboard,
            tries: [],
            mode: "random",
            huntArray:[],
            //make sure that computer cannot attack positions that are in misses or hits!!!!!!!
            attackEnemy() {
                if (this.mode == "random"){
                    let randomPosition = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
                    while (isArrayInArray(this.tries, randomPosition)) {
                        randomPosition = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
                    }
                    this.tries.push(randomPosition);
                    let isHit = enemyGameboard.receiveAttack(randomPosition);
                    //console.log("Enemy hit" + isHit);
                    if(isHit) {
                        this.huntArray.push( [randomPosition[0] + 1, randomPosition[1] ]);
                        this.huntArray.push( [randomPosition[0] - 1, randomPosition[1] ]);
                        this.huntArray.push( [randomPosition[0], randomPosition[1] +1]);
                        this.huntArray.push( [randomPosition[0], randomPosition[1] -1]);
                        this.huntArray.push( [randomPosition[0] + 1, randomPosition[1] - 1 ]);
                        this.huntArray.push( [randomPosition[0] - 1, randomPosition[1] + 1 ]);
                        this.huntArray.push( [randomPosition[0] +1, randomPosition[1] +1]);
                        this.huntArray.push( [randomPosition[0] - 1, randomPosition[1] -1 ]);

                        this.mode = "target";
                        //console.log("WE ARE NOW IN TARGET MODE");
                    }

                }
                else if ( this.mode =="target") {
                    //console.log("WE ARE STILL IN TARGET MODE");

                    let targetAttempt = this.huntArray.pop();

                    while ( !(typeof(targetAttempt) === 'undefined')  && (isArrayInArray( this.tries, targetAttempt) || (targetAttempt[0] < 0) || (targetAttempt[0] > 9) || (targetAttempt[1] < 0) || (targetAttempt[1] > 9))){
                        targetAttempt = this.huntArray.pop();
                        //console.log(targetAttempt);
                        //onsole.log( typeof(targetAttempt) === 'undefined');
                    }
                    //console.log(targetAttempt);

                    if ( typeof(targetAttempt) === 'undefined') {
                        targetAttempt = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
                        while (isArrayInArray(this.tries, targetAttempt)) {
                            targetAttempt = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
                        }
                    }
                    this.tries.push(targetAttempt);
                    let isHit = enemyGameboard.receiveAttack(targetAttempt);
                    //console.log("target enemy hit: "+ isHit);
                    if (isHit) {
                        this.huntArray.push( [targetAttempt[0] + 1, targetAttempt[1] ]);
                        this.huntArray.push( [targetAttempt[0] - 1, targetAttempt[1] ]);
                        this.huntArray.push( [targetAttempt[0], targetAttempt[1] +1]);
                        this.huntArray.push( [targetAttempt[0], targetAttempt[1] -1]);
                        this.huntArray.push( [targetAttempt[0] + 1, targetAttempt[1] - 1 ]);
                        this.huntArray.push( [targetAttempt[0] - 1, targetAttempt[1] + 1 ]);
                        this.huntArray.push( [targetAttempt[0] +1, targetAttempt[1] +1]);
                        this.huntArray.push( [targetAttempt[0] - 1, targetAttempt[1] -1 ]);
                    }
                    console.log("array length: " + this.huntArray.length);
                    if( this.huntArray.length == 0) {
                        console.log("WE SWITCHED BACK TO RANDOM");
                        this.mode = "random";
                    }
                }

                // let randomPosition = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
                // while ( isArrayInArray( this.tries, randomPosition)){
                //     randomPosition = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
                // }
                // this.tries.push( randomPosition);
                // enemyGameboard.receiveAttack( randomPosition);
            }
        }
    }
    return  {
        gameBoard:gameBoard,
        enemyGameboard:enemyGameboard,
        tries:[],
        attackEnemy(  position ) {
            if ( !isArrayInArray( this.tries, position)) {
                enemyGameboard.receiveAttack( position);
                this.tries.push( position);
            }
        }
    }
}


export {createPlayer};