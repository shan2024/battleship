import { createGameBoard } from "./Gameboard.js";
import { createPlayer } from "./Player.js";
import { createShip } from "./Ship.js";
import { createMain } from "./DOM";
import { update, gameOverScreen, gameOverHandler, setSecondary, updateOpacity } from "./DOM";

let turn = "player";
let gameStarted = false;
let gameEnded = false;

let playerBoard;
let computerBoard;

let player;
let computer;

let playerShots;
let computerShots;
let currentPlayerShot;
let currentComputerShot;

let shotIndex;

function startGame() {
    playerBoard = createGameBoard();
    computerBoard = createGameBoard();
    placePlayerShips();
    placeCompShips();
    player = createPlayer(playerBoard, computerBoard, false);
    computer = createPlayer(computerBoard, playerBoard, true);

    playerShots = [12,9,6,3];
    computerShots = [12,9,6,3];
    currentPlayerShot = playerShots[0];
    currentComputerShot = computerShots[0];
    shotIndex = 0;

    createMain(player, computer, turn);


}

function placePlayerShips() {
    playerBoard.placeShip( 4, [9,0], "5", "carrier");
    playerBoard.placeShip( 3, [8,0], "5", "cruiser");
    playerBoard.placeShip( 3, [7,0], "5", "destroyer");
    playerBoard.placeShip( 3, [6,0], "5", "submarine");
    //playerBoard.placeShip( 1, [4,0], "5");

}

function placeCompShips(){

    while( computerBoard.ships.length != 1) {
    computerBoard.placeShip(4, [ Math.floor(Math.random() * 7), 3+Math.floor(Math.random() * 4)], 
        Math.floor(Math.random() * 3)+ 2, "carrier");
    }
    while( computerBoard.ships.length != 2) {

    computerBoard.placeShip(3, [ 2 + Math.floor(Math.random() * 8), 2+Math.floor(Math.random() * 5)], 
        Math.floor(Math.random() * 3)+ 6, "cruiser");
    }
    while( computerBoard.ships.length != 3) {

    computerBoard.placeShip(3, [ Math.floor(Math.random() * 8), 2+Math.floor(Math.random() * 5)], 
        Math.floor(Math.random() * 3)+ 2, "destroyer");
    }
    while( computerBoard.ships.length != 4) {

    computerBoard.placeShip(3, [ 2+Math.floor(Math.random() * 5), Math.floor(Math.random() * 8)], 
        Math.floor(Math.random() * 3)+ 4, "submarine");
    }
    // while( computerBoard.ships.length != 5) {

    // computerBoard.placeShip(1, [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)], 
    //     Math.floor(Math.random() * 7)+ 1);
    // }
}

function changeShots( shipName) {
    
    //if turn ==  player versus if turn == computer
    if ( turn == "player") {
        //computer's shots must be changed
        if ( shipName == "carrier") {
            computerShots[0] = computerShots[0] - 3;
        }
        else if (shipName == "cruiser"){
            computerShots[1] = computerShots[1] - 3;

        }
        else if (shipName == "destroyer"){
            computerShots[2] = computerShots[2] - 2;

        }
        else if (shipName == "submarine"){
            computerShots[3] = computerShots[3] - 1;
        }
    }
    else if ( turn == "computer") {
        //player's shots must be changed
        if ( shipName == "carrier") {
            playerShots[0] = playerShots[0] - 3;
        }
        else if (shipName == "cruiser"){
            playerShots[1] = playerShots[1] - 3;
        }
        else if (shipName == "destroyer"){
            playerShots[2] = playerShots[2] - 2;
        }
        else if (shipName == "submarine"){
            playerShots[3] = playerShots[3] - 1;
        }
    }
}

function getPlayerShots() {
    return currentPlayerShot;
}

function getComputerShots() {
    return currentComputerShot;
}

async function checkWinner() {

    if (computerBoard.allSunk() || playerBoard.allSunk()) {
        setSecondary("Game Over");
        turn = "computer";
        //end game
        endGame();
        //pop up  game ended screen;

    }
    else {
        currentPlayerShot = currentPlayerShot - 1;
        if (currentPlayerShot < 0) {
            currentPlayerShot = 0;
        }
        currentComputerShot = computerShots[shotIndex];
        update();

        if (currentPlayerShot <= 0) {
            turn = "computer";
            updateOpacity();
            setSecondary("Opponent Turn");
            await sleep(1500);


            //await sleep(0);
            // shotIndex++;
            // if (shotIndex == 4) {
            //     shotIndex = 0;
            // }
            // while( playerShots[shotIndex] == 0) {
            //     currentComputerShot = currentComputerShot + computerShots[shotIndex];
            //     shotIndex++;
            //     if (shotIndex == 4) {
            //         shotIndex = 0;
            //     }
            // }
            let savedComputerShot = currentComputerShot;
            for ( let i = 0 ; i < savedComputerShot; i++) {
                currentComputerShot--;
                computer.attackEnemy();
                await sleep(200);
                update();
                if ( playerBoard.allSunk()){
                    savedComputerShot = 0;
                }
            }

            shotIndex++;
            if (shotIndex == 4) {
                shotIndex = 0;
             }

            while( !playerBoard.allSunk() && playerShots[shotIndex] == 0) {
                savedComputerShot =  computerShots[shotIndex];
                currentComputerShot = computerShots[shotIndex];

                setSecondary("Your Turn");
                updateOpacity();
                await sleep(1500);
                updateOpacity();
                setSecondary("Opponent Turn");
                await sleep(1500);

                for ( let i = 0 ; i < savedComputerShot; i++) {
                    currentComputerShot--;
                    computer.attackEnemy();
                    await sleep(200);
                    update();
                    if ( playerBoard.allSunk()){
                        savedComputerShot = 0;
                    }
                }
                shotIndex++;
                if (shotIndex == 4) {
                    shotIndex = 0;
                }
            }

            currentComputerShot = computerShots[shotIndex];
            update();
            console.log("current computer shot" + savedComputerShot);
            

            if (computerBoard.allSunk() || playerBoard.allSunk()) {
                setSecondary("Game Over");
                turn = "computer";
                //end game
                update();
                endGame();
                //pop up  game ended screen;

            }
            else {
                currentPlayerShot = playerShots[shotIndex];

                update();
                turn = "player";
                setSecondary("Your Turn");
                updateOpacity();
                console.log("current player shot" + currentPlayerShot);
            }
        }

        // turn = "computer";
        // updateOpacity();
        // setSecondary("Opponent Turn");

        // await sleep(0);
        // computer.attackEnemy();

        // if (computerBoard.allSunk() || playerBoard.allSunk()) {
        //     setSecondary("Game Over");
        //     turn = "computer";
        //     //end game
        //     update();
        //     endGame();
        //     //pop up  game ended screen;
    
        // }
        // else {
        //     update();
        //     turn = "player";
        //     setSecondary("Your Turn");
        //     updateOpacity();
        // }
        // update();
        // turn = "player";
        // setSecondary("Your Turn");

    }

}

function start() {
    gameStarted = true;
    setSecondary("Your Turn");
    console.log("Game started!!!!")
}

function reset() {
    gameStarted = false;
    gameEnded = false;
    turn = "player";
    startGame();
}

function endGame() {
    gameEnded = true;
    console.log("Game Ended");
    gameOverHandler();
}

function getTurn() {
    return turn;
}

function getPlayer() {
    return player;
}

function getComputer() {
    return computer;
}

function getGameStarted() {
    return gameStarted;
}

function getGameEnded() {
    return gameEnded;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export { getPlayerShots, getComputerShots, changeShots, startGame, checkWinner, getTurn, getPlayer, getComputer, getGameStarted, start, getGameEnded, reset };