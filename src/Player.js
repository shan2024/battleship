
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
            //make sure that computer cannot attack positions that are in misses or hits!!!!!!!
            attackEnemy() {
                let randomPosition = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
                while ( isArrayInArray( this.tries, randomPosition)){
                    randomPosition = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
                }
                this.tries.push( randomPosition);
                enemyGameboard.receiveAttack( randomPosition);
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