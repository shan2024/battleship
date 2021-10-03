import { createShip } from "../Ship";

function isArrayInArray(arr, item){
    var item_as_string = JSON.stringify(item);
  
    var contains = arr.some(function(ele){
      return JSON.stringify(ele) === item_as_string;
    });
    return contains;
}

test( "create ship works", () => {
    let ship = createShip(4, [1,2], "horizontal");
    expect( ship.hit([0,1]) ).toBe( false);
    expect ( ship.length ).toBe(4);
    expect ( ship.orientation ).toBe("horizontal");
    expect ( ship.posArray ).toStrictEqual( [ [1,2], [2,2], [3,2] , [4,2]]);
    expect ( ship.isSunk()).toBe(false);

})

test("ship hits properly", ()=> {
    let ship = createShip(4, [1,2], "horizontal");
    expect( ship.hit( [2,2] ) ).toBe(true);
    expect( isArrayInArray( ship.hits, [2,2] ) ).toBe(true);
}) 