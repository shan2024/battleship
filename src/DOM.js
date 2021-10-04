//first create a frame that stays static throughout
import { checkWinner, getPlayer, getComputer, getTurn, start, getGameStarted, getGameEnded , reset } from "./Game.js";
//import flame from "./images/flame.png";
//import { player, computer, turn} from "./Game.js";
import clickImage from "./images/click.png";

let selectedShip;

function createMain() {


    let documentBody = document.querySelector("body");

  
    createInstructions();
    gameOverScreen();

    let header = document.createElement("header");
    header.innerHTML = "Battleship";
    header.id = "header";

    let secondary = document.createElement("h1");
    secondary.innerHTML = "Place Your Ships";
    secondary.id = "secondary";

    let startBtn = document.createElement("button");
    startBtn.innerHTML = "Start";
    startBtn.id = "start-button";

    let mainBody = document.createElement("div");
    mainBody.id = "main-body";

    let playerIndicator = createIndicator("player");
    let computerIndicator = createIndicator("computer");

    let playerBoard = createGameBoard();


    let computerBoard = createComputerBoard();

    // let divider = document.createElement("div");
    // divider.className = "divider";

    mainBody.appendChild(playerIndicator);
    mainBody.appendChild(playerBoard);
    //mainBody.appendChild(divider);

    mainBody.appendChild(computerBoard);
    mainBody.appendChild(computerIndicator);


    let helpBtn = document.createElement("button");
    helpBtn.innerHTML = "Help";
    helpBtn.id = "help-button";

    documentBody.appendChild(header);
    documentBody.appendChild(secondary);
    documentBody.appendChild(startBtn);
    documentBody.appendChild(mainBody);
    documentBody.appendChild(helpBtn);

    let footer = document.createElement("footer");
    footer.innerHTML = "Created By Seulchan Han";
    documentBody.appendChild(footer);


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

    let closeInstructionsBtn = document.createElement("span");
    closeInstructionsBtn.className = "close";
    closeInstructionsBtn.id = "close-instructions-button";
    closeInstructionsBtn.innerHTML = "&times;";

    let instructionsTitle = document.createElement("h3");
    instructionsTitle.innerHTML="Welcome to Battleship";
    instructionsTitle.id = "instructions-title";

    let gameObjective = document.createElement("h4");
    gameObjective.innerHTML = "Game Objective";
    gameObjective.className = "instructions-header";

    let gameObjectiveDescription = document.createElement("p");
    gameObjectiveDescription.className = "description";
    gameObjectiveDescription.innerHTML = "The objective of Battleship is to try and sink all of the opponent's\
    ships before they sink all of your ships. All of the opponent's ships are hidden somewhere\
    on their board. <br/><br/>Each round, you try and hit the opponent's ships by selecting a coordinate of one of the squares\
    on the board. The opponent also tries to hit your ships by selecting coordinates. Neither you nor\
    the opponent can see the other's board so you must guess where they are. Each board has two grids:\
    the left section for the player's ships and the right section for the opponent's ships."

    let startingNewGame = document.createElement("h4");
    startingNewGame.innerHTML = "Starting a New Game";
    startingNewGame.className = "instructions-header";

    let startingNewDescription = document.createElement("p");
    startingNewDescription.className = "description";
    startingNewDescription.innerHTML = "Each player places the 5 ships somwhere on their board. A ship may be selected\
    by clicking on the ship." 
    
    let startingNewDescription2 = document.createElement("p");
    startingNewDescription2.className = "description";
    startingNewDescription2.innerHTML =  "Then, use the arrow keys to move it up, down, right, or left, and use the space bar to \
    rotate the ship.<br/><br/> The ships can\
    only be placed vertically or horizontally. Diagonal placement is not allowed. No part of a ship may hang\
    off the edge of the board. Ships may not overlap each other. No ships may be placed on another ship. \
    Once the guessing begins, players may not move the ships. The 5 ships are:  Carrier (occupies 5 spaces),\
    Battleship (4), Cruiser (3), Destroyer (2), and Submarine (1). <br/><br/> When you are ready, click \"start\" to begin\
    the game."

    let clickHelpImage = new Image();
    clickHelpImage.src = clickImage;


    let playingGame = document.createElement("h4");
    playingGame.innerHTML = "Playing the Game";
    playingGame.className = "instructions-header";

    let playingGameDescription = document.createElement("p");
    playingGameDescription.className = "description";
    playingGameDescription.innerHTML = "Each round, a player makes a guess by selecting coordinates on the opponent's grid.\
    If the guessed coordinate hits an enemy ship, the grid will be marked with a red X. If the guess misses, the grid will be\
    marked with a white dot. For example, if you guess (1,6) and the opponent does not have any ship located at (1,6), the \
    opponent's grid would be marked with a white dot at (1,6).<br/><br/> When all of the squares that one of your ships occupies are hit\
    the ship will be sunk, and this will be indicated to both players. As soon as all of one player's ships have been sunk, the \
    game ends. <br/><br/>To start a new game, or to reset at any point within a game, click \"reset\".";

    instructionsContent.appendChild(closeInstructionsBtn);
    instructionsContent.appendChild(instructionsTitle);
    instructionsContent.appendChild(gameObjective);
    instructionsContent.appendChild(gameObjectiveDescription);
    instructionsContent.appendChild(startingNewGame);
    instructionsContent.appendChild(startingNewDescription);
    instructionsContent.appendChild(clickHelpImage);
    instructionsContent.appendChild(startingNewDescription2);

    instructionsContent.appendChild(playingGame);
    instructionsContent.appendChild(playingGameDescription);



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

    let gameOverTitle = document.createElement("h1");
    gameOverTitle.id = "game-over-title";
    gameOverTitle.innerHTML = "Game Over";

    let gameOverDescription = document.createElement("p");
    gameOverDescription.id = "game-over-description";


    let gameOverBtn = document.createElement("span");
    gameOverBtn.className = "close";
    gameOverBtn.id = "close-game-button";
    gameOverBtn.innerHTML = "&times;";

    gameOverContent.appendChild(gameOverBtn);
    gameOverContent.appendChild(gameOverTitle);
    gameOverContent.appendChild(gameOverDescription);

    gameOver.appendChild( gameOverContent);
    documentBody.appendChild(gameOver);
}

function createIndicator(name) {
    let indicator = document.createElement("div");
    indicator.className = "indicator";
    indicator.id = name + "-" + "indicator";

    let numArray = [1,2,3,4,5];

    numArray.forEach( num => {
        let row = document.createElement("div");
        row.className = "indicator-row";
        for( let i = 0; i < num; i++) {
            let unit = document.createElement("div");
            unit.className = "indicator-unit";
            unit.classList.add( num + "|"+ name );
            row.appendChild(unit);
        }
        indicator.appendChild(row);
    })

    return indicator;

}

function createGameBoard() {

    let playerBoard = document.createElement("div");
    playerBoard.className = "game-board";
    playerBoard.id = "player-board";

    let grid = createGrid("player");

    let boardName = document.createElement("p");
    boardName.innerHTML = "Player";
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
    boardName.innerHTML = "Computer";
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
            unit.classList.add(name);
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

    getPlayer().gameBoard.ships.forEach( ship=> {
        if (ship.isSunk()) {
            let length = ship.length;
            let indicatorClass = length + "|" + "player";
            Array.from( document.getElementsByClassName(indicatorClass) ).forEach( unit => {
                unit.style.opacity = ".5";
            })
        }
    })

    getComputer().gameBoard.ships.forEach( ship=> {
        if (ship.isSunk()) {
            let length = ship.length;
            let indicatorClass = length + "|" + "computer";
            Array.from( document.getElementsByClassName(indicatorClass) ).forEach( unit => {
                unit.style.opacity = ".5";
            })
        }
    })

}

function updateOpacity() {
    let playersBoard = document.getElementById("player-board");
    let computersBoard = document.getElementById("computer-board");

    if (getTurn() == "player") {
        computersBoard.style.opacity = "1";        
        playersBoard.style.opacity = ".5";        
    }
    else {
        computersBoard.style.opacity = ".5";        
        playersBoard.style.opacity = "1";   
    }
}

function updateShips() {
    
    let shipUnits = document.querySelectorAll(".ship");
    Array.from(shipUnits).forEach( unit => {
        unit.classList.remove("ship");
        unit.classList.remove("selected");
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
            if (ship.selected ) {
                unit.classList.add("selected");
            }
            
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

    // playerGrid.addEventListener("hover", (e) => {
    //     if ( !getGameStarted() && e.target.classList.contains("ship")&&e.target.classList.contains("player")){
    //         let position = e.target.id.split("|");
    //     }
    // } )


    window.addEventListener("click", (e) => {
        getPlayer().gameBoard.ships.forEach(ship => {
            ship.selected = false;
            updateShips();
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

    let description = document.getElementById("game-over-description");
    let title = document.getElementById("game-over-title");
    if( getComputer().gameBoard.allSunk()) {
        title.innerHTML = "You Won"
        description.innerHTML = "You sunk all the opponent's ships!<br/><br/>Click \"Reset\" to play again.";
    }
    else {
        title.innerHTML = "You Lost"
        description.innerHTML = "The opponent sunk all your ships!<br/><br/>Click \"Reset\" to play again.";
    }

    modal.style.display = "block";

    closeButton.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";

            let newModal = document.getElementById("instructions");
            window.onclick = function (event) {
                if (event.target == newModal) {
                    newModal.style.display = "none";
                }
            }

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
    //let selectedShip;
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
        updateShips();
        //console.log("selected" + selectedShip);
        e.stopPropagation();
    }

}

function errorHighlight( highlightShip) {
    let highlightArray = [];
    highlightShip.posArray.forEach( pos => {
        let selectId = pos[0] + "|"+pos[1]+"|"+"player";
        let unit = document.getElementById(selectId);
        highlightArray.push(unit);
    })
    highlightArray.forEach( pos => {
        pos.classList.add("highlighted");
    })
    highlightArray.forEach( pos => {
        setTimeout( () => {
            pos.classList.remove("highlighted");
        }, 100)
    })
}

function setSecondary(text) {
    document.getElementById("secondary").innerHTML = text;
}

function isArrayInArray(arr, item){
    var item_as_string = JSON.stringify(item);
  
    var contains = arr.some(function(ele){
      return JSON.stringify(ele) === item_as_string;
    });
    return contains;
}


export { createMain, update, gameOverScreen, gameOverHandler, errorHighlight, setSecondary, updateOpacity };