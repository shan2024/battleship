//first create a frame that stays static throughout
import { checkWinner, getPlayer, getComputer, getTurn } from "./Game.js";

//import { player, computer, turn} from "./Game.js";
let selectedShip;

function createMain() {


    let documentBody = document.querySelector("body");

    //let content = document.createElement("div");
    //content.id = "content";

    let header = document.createElement("header");
    header.innerHTML = "Battleship";
    header.id = "header";

    let secondary = document.createElement("h1");
    secondary.innerHTML = "Place your Ships!";
    secondary.id = "secondary";

    let startBtn = document.createElement("button");
    startBtn.innerHTML = "Start Game";
    startBtn.id = "start-button";

    let mainBody = document.createElement("div");
    mainBody.id = "main-body";

    let playerBoard = createGameBoard();

    let computerBoard = createComputerBoard();

    mainBody.appendChild(playerBoard);
    mainBody.appendChild(computerBoard);


    documentBody.appendChild(header);
    documentBody.appendChild(secondary);
    documentBody.appendChild(startBtn);
    documentBody.appendChild(mainBody);

    //documentBody.appendChild(content);
    update();

    createHandlers();


}

function createGameBoard() {

    let playerBoard = document.createElement("div");
    playerBoard.className = "game-board";
    playerBoard.id = "player-board";

    let grid = createGrid("player");

    let boardName = document.createElement("p");
    boardName.innerHTML = "Player board";
    boardName.className = "board-name";

    playerBoard.appendChild(grid);
    playerBoard.appendChild(boardName);

    return playerBoard;
}

function createComputerBoard() {
    let computerBoard = document.createElement("div");
    computerBoard.className = "game-board";
    computerBoard.id = "computer-board";

    let grid = createGrid("computer");

    let boardName = document.createElement("p");
    boardName.innerHTML = "Computer board";
    boardName.className = "board-name";

    computerBoard.appendChild(grid);
    computerBoard.appendChild(boardName);

    return computerBoard;
}

function createGrid(name) {
    let grid = document.createElement("div");
    grid.className = "grid";
    //for testing purposes
    grid.style.width = "522px";
    grid.style.height = "511px";
    //end

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let unit = document.createElement("div");

            //for testing purposes only
            unit.style.width = "50px";
            unit.style.height = "50px";
            unit.style.borderStyle = "solid";
            unit.style.borderWidth = "1px";
            unit.style.backgroundColor = "blue"

            //end
            unit.className = "unit";
            unit.id = j + "|" + i + "|" + name;
            grid.appendChild(unit);
        }
    }

    return grid;
}


//function should recieve gameboard and player and create something out of that, 


function update() {

    //place the ships
    let playerShips = getPlayer().gameBoard.ships;
    let computerShips = getComputer().gameBoard.ships;

    placeShips(playerShips, "player");
    placeShips(computerShips, "computer");

    //mark red the hit units
    markHit(getPlayer().gameBoard.hits, "player");
    markMisses(getPlayer().gameBoard.misses, "player");

    markHit(getComputer().gameBoard.hits, "computer");
    markMisses(getComputer().gameBoard.misses, "computer");

}

function updateShips() {
    
    let shipUnits = document.querySelectorAll(".ship");
    Array.from(shipUnits).forEach( unit => {
        unit.classList.remove("ship");
        unit.style.backgroundColor = "blue";
    })

    placeShips( getPlayer().gameBoard.ships, "player");
    placeShips( getComputer().gameBoard.ships, "computer");

}



function placeShips(ships, name) {
    ships.forEach(ship => [
        ship.posArray.forEach(pos => {
            let position = pos[0] + "|" + pos[1] + "|" + name;
            let unit = document.getElementById(position);
            unit.classList.add("ship");
            //Want to change color to blue if computer is playing
            unit.style.backgroundColor = "black";
        })
    ])
}

function markHit(hits, name) {
    hits.forEach(hit => {
        let position = hit[0] + "|" + hit[1] + "|" + name;
        let unit = document.getElementById(position);
        unit.style.backgroundColor = "red";
    })
}
function markMisses(misses, name) {
    misses.forEach(miss => {
        let position = miss[0] + "|" + miss[1] + "|" + name;
        let unit = document.getElementById(position);
        unit.style.backgroundColor = "grey";
    })
}

//EVENT HANDLERS

function createHandlers() {

    let grid = document.getElementById("computer-board");
    grid.addEventListener("click", (e) => {
        if (e.target.classList.contains("unit") && getTurn() == "player") {
            attack(e.target.id);
            update();
            checkWinner();
        }
    })

    let playerGrid = document.getElementById("player-board");
    playerGrid.addEventListener("click", (e) => {
        if (e.target.classList.contains("ship")) {
            shipClicked(e);
        }      
    })


    window.addEventListener("click", (e) => {
        getPlayer().gameBoard.ships.forEach(ship => {
            ship.selected = false;
        })

    })

    window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
          return; 
        }
        if (typeof(selectedShip) != "undefined" ) {
            switch (event.key) {
                case "ArrowDown":
                    getPlayer().gameBoard.move( selectedShip, "down");
                  break;
                case "ArrowUp":
                    getPlayer().gameBoard.move( selectedShip, "up");
                  break;
                case "ArrowLeft":
                    getPlayer().gameBoard.move( selectedShip, "left");
                  break;
                case "ArrowRight":
                    getPlayer().gameBoard.move( selectedShip, "right");
                  break;
                case " ":
                  break;
                default:
                  return; 
              }
        }
        updateShips();
        event.preventDefault();
      }, true);


}


function attack(unitId) {
    let position = unitId.split("|");
    console.log("attack clicked!")
    if (position[2] == "computer") {
        let pos = [parseInt(position[0]), parseInt(position[1])];
        getPlayer().attackEnemy(pos);
        //console.log( player.enemyGameboard.misses)
    }

}

function shipClicked(e) {
    let position = e.target.id.split("|");
    if (position[2] == "player") {

        let selectedPos = [parseInt(position[0]), parseInt(position[1])];
        getPlayer().gameBoard.ships.forEach(ship => {
            ship.selected = false;
            ship.posArray.forEach(pos => {
                if (JSON.stringify(selectedPos) == JSON.stringify(pos)) {
                    selectedShip = ship;
                }
            })
        })

        selectedShip.selected = true;
        console.log("selected" + selectedShip);
        e.stopPropagation();
    }

}


export { createMain, update };