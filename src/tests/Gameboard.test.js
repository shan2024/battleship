import { createGameBoard } from "../Gameboard";

function isArrayInArray(arr, item){
    var item_as_string = JSON.stringify(item);
  
    var contains = arr.some(function(ele){
      return JSON.stringify(ele) === item_as_string;
    });
    return contains;
}

test( "gameboard creates properly", () => {
    let gameboard = createGameBoard();
    expect( gameboard.ships ).toStrictEqual( []);
    expect( gameboard.hits ).toStrictEqual( []);
    expect( gameboard.misses ).toStrictEqual( []);
    //if ships are empty then will return true by default
    expect( gameboard.allSunk() ).toBe( true);
})

test("recieves attack properly", () => {
    let gameboard = createGameBoard();

    gameboard.placeShip( 4, [1,1], "vertical");
    //console.log( gameboard.ships);
    gameboard.receiveAttack( [1,2]);
    gameboard.receiveAttack( [5,6]);
    //console.log( gameboard.hits);
    //console.log( gameboard.misses);
    expect( isArrayInArray( gameboard.hits, [1,2])).toBe( true);
    expect(isArrayInArray( gameboard.misses, [5,6])).toBe( true);
})

