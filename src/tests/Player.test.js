import { createPlayer } from "../Player";
import {createGameBoard} from "../Gameboard"


function isArrayInArray(arr, item){
    var item_as_string = JSON.stringify(item);
  
    var contains = arr.some(function(ele){
      return JSON.stringify(ele) === item_as_string;
    });
    return contains;
}

test("create Player works", ()=> {
    let gameboard = createGameBoard();
    let enemyGameboard = createGameBoard();
    let player = createPlayer( gameboard, enemyGameboard, false );
    player.attackEnemy( [1,2] );
    console.log(enemyGameboard.misses);
    expect( isArrayInArray( enemyGameboard.misses, [1,2])).toBe( true);
})

test("create Computer works",() => {
    let gameboard = createGameBoard();
    let enemyGameboard = createGameBoard();
    let computer = createPlayer( gameboard, enemyGameboard, true );
    computer.attackEnemy();
    console.log(enemyGameboard.misses);
    expect( enemyGameboard.misses.length == 1 ).toBe( true); 
})

test("cannot target same position twice", () => {
    let gameboard = createGameBoard();
    let enemyGameboard = createGameBoard();
    let player = createPlayer( gameboard, enemyGameboard, false );
    player.attackEnemy( [1,2] );
    console.log(enemyGameboard.misses);
    expect( isArrayInArray( enemyGameboard.misses, [1,2])).toBe( true);

    player.attackEnemy([1,2]);
    console.log(enemyGameboard.misses);

    expect( enemyGameboard.misses.length == 1).toBe( true);

})