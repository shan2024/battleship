//first create a frame that stays static throughout
import { checkWinner, getPlayer, getComputer, getTurn, start, getGameStarted, getGameEnded , reset } from "./Game.js";
//import flame from "./images/flame.png";
//import { player, computer, turn} from "./Game.js";
let selectedShip;

function createMain() {


    let documentBody = document.querySelector("body");

    //let content = document.createElement("div");
    //content.id = "content";

    //instruction screen
    createInstructions();
    gameOverScreen();


    // <div id="myModal" class="modal">

    //     <div class="modal-content">
    //         <span class="close">&times;</span>
    //         <div class="form">
    //             <p>Add New Book</p>
    //             <input type="text" placeholder=" Title" name="title" id="myTitle" required>
    //             <input type="text" placeholder=" Author" name="author" id="myAuthor" required>
    //             <input type="number" placeholder=" Pages" name="pages" id="myPages" required>
    //             <div class="read-container">
    //                 <label for="read">Read/Unread</label>
    //                 <input type="checkbox" name="readOrNot" value="read" id="myRead">

    //             </div>
    //             <button class="form-submit" type="button">Submit</button>
    //         </div>
    //     </div>

    // </div>

    let header = document.createElement("header");
    header.innerHTML = "Battleship";
    header.id = "header";

    let secondary = document.createElement("h1");
    secondary.innerHTML = "Place your Ships!";
    secondary.id = "secondary";

    let startBtn = document.createElement("button");
    startBtn.innerHTML = "Start";
    startBtn.id = "start-button";

    let mainBody = document.createElement("div");
    mainBody.id = "main-body";

    let playerBoard = createGameBoard();

    let computerBoard = createComputerBoard();

    mainBody.appendChild(playerBoard);
    mainBody.appendChild(computerBoard);


    let helpBtn = document.createElement("button");
    helpBtn.innerHTML = "Help";
    helpBtn.id = "help-button";

    documentBody.appendChild(header);
    documentBody.appendChild(secondary);
    documentBody.appendChild(startBtn);
    documentBody.appendChild(mainBody);
    documentBody.appendChild(helpBtn);

    //documentBody.appendChild(content);
    update();

    createHandlers();


}

function createInstructions() {
    let documentBody = document.querySelector("body");

    //let content = document.createElement("div");
    //content.id = "content";

    //instruction screen
    let instructions = document.createElement("div");
    instructions.id = "instructions";
    instructions.className = "modal";

    let instructionsContent = document.createElement("div");
    instructionsContent.className = "modal-content";
    instructionsContent.innerHTML = "Instructions";

    let closeInstructionsBtn = document.createElement("span");
    closeInstructionsBtn.className = "close";
    closeInstructionsBtn.id = "close-instructions-button";
    closeInstructionsBtn.innerHTML = "&times;";

    instructionsContent.appendChild(closeInstructionsBtn);
    instructions.appendChild( instructionsContent);
    documentBody.appendChild(instructions);
}

function gameOverScreen() {
    let documentBody = document.querySelector("body");

    //let content = document.createElement("div");
    //content.id = "content";

    //instruction screen
    let gameOver = document.createElement("div");
    gameOver.id = "gameOver";
    gameOver.className = "modal";
    gameOver.style.display = "none";

    let gameOverContent = document.createElement("div");
    gameOverContent.className = "modal-content";
    gameOverContent.innerHTML = "Game Over";

    let gameOverBtn = document.createElement("span");
    gameOverBtn.className = "close";
    gameOverBtn.id = "close-game-button";
    gameOverBtn.innerHTML = "&times;";

    gameOverContent.appendChild(gameOverBtn);
    gameOver.appendChild( gameOverContent);
    documentBody.appendChild(gameOver);
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
    // grid.style.width = "522px";
    // grid.style.height = "511px";
    //end

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let unit = document.createElement("div");

            //for testing purposes only
            // unit.style.width = "50px";
            // unit.style.height = "50px";
            // unit.style.borderStyle = "solid";
            // unit.style.borderWidth = "1px";
            // unit.style.backgroundColor = "blue"

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

    placeShips(getPlayer().gameBoard.ships, "player");
    placeShips(getComputer().gameBoard.ships, "computer");

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
        //unit.style.backgroundColor = "blue";
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
            //unit.style.backgroundColor = "black";
        })
    ])
}

function markHit(hits, name) {
    hits.forEach(hit => {
        //console.log("hit: + " + hit);

        let position = hit[0] + "|" + hit[1] + "|" + name;
        let unit = document.getElementById(position);
        unit.classList.add("hit");
        while(unit.firstChild) {
            unit.removeChild( unit.firstChild);
        }
        let sign = document.createElement("p");
        sign.innerHTML = "&#10005;";

        unit.appendChild(sign);
        //let fire = new Image();
        //fire.src = flame;
        //unit.appendChild(fire);
        //unit.style.backgroundColor = "red";
    })
}
function markMisses(misses, name) {
    misses.forEach(miss => {
        //console.log("miss: + " + miss);
        let position = miss[0] + "|" + miss[1] + "|" + name;
        let unit = document.getElementById(position);
        unit.classList.add("miss");
        while(unit.firstChild) {
            unit.removeChild( unit.firstChild);
        }
        let sign = document.createElement("p");
        //sign.innerHTML = "&#183;";

        unit.appendChild(sign);
        //unit.style.backgroundColor = "grey";
    })
}

//EVENT HANDLERS

function createHandlers() {

    let startBtn = document.getElementById("start-button");
    startBtn.addEventListener("click", ()=> {
        //multiple functions
        if ( startBtn.innerHTML == "Start") {
            start();
            startBtn.innerHTML = "Reset";

        }
        else if ( startBtn.innerHTML == "Reset") {
            startBtn.innerHTML = "Start";
            let documentBody = document.querySelector("body");
            while(documentBody.firstChild) {
                documentBody.removeChild(documentBody.firstChild);
            }
            reset();
            let instructions = document.getElementById("instructions");
            instructions.style.display = "none";
        }
    });

    let grid = document.getElementById("computer-board");
    grid.addEventListener("click", (e) => {
        if ( !getGameEnded() && getGameStarted() && e.target.classList.contains("unit") && getTurn() == "player") {
            attack(e.target.id);
            // update();
            // checkWinner();
        }
    })

    let playerGrid = document.getElementById("player-board");
    playerGrid.addEventListener("click", (e) => {
        if (!getGameEnded() && !getGameStarted() && e.target.classList.contains("ship")) {
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
        if (typeof(selectedShip) != "undefined" && !getGameStarted()) {
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
                    getPlayer().gameBoard.rotate( selectedShip);
                  break;
                default:
                  return; 
            }
            updateShips();
        }
        event.preventDefault();
      }, true);



      instructionHandlers();

}

function instructionHandlers() {
    let modal = document.getElementById("instructions");
    let closeButton = document.getElementById("close-instructions-button");
    let openButton = document.getElementById("help-button");

    openButton.onclick = function () {
        modal.style.display = "block";

    }
    closeButton.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}

function gameOverHandler() {
    let modal = document.getElementById("gameOver");
    let closeButton = document.getElementById("close-game-button");

    modal.style.display = "block";

    closeButton.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}


function attack(unitId) {
    let position = unitId.split("|");
    console.log("attack clicked!")
    let pos = [parseInt(position[0]), parseInt(position[1])];
    if (position[2] == "computer" && !isArrayInArray( getPlayer().tries, pos ) ) {
        getPlayer().attackEnemy(pos);
        update();
        checkWinner();
        //console.log( player.enemyGameboard.misses)
    }

    // update();
    // checkWinner();

}

function shipClicked(e) {
    let position = e.target.id.split("|");
    if (position[2] == "player" ) {

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

function isArrayInArray(arr, item){
    var item_as_string = JSON.stringify(item);
  
    var contains = arr.some(function(ele){
      return JSON.stringify(ele) === item_as_string;
    });
    return contains;
}


export { createMain, update, gameOverScreen, gameOverHandler };