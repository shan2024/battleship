import { createGameBoard } from "./Gameboard.js";
import { createPlayer } from "./Player.js";
import { createShip } from "./Ship.js";
import { createMain } from "./DOM";
import { update, gameOverScreen, gameOverHandler } from "./DOM";

let turn = "player";
let gameStarted = false;
let gameEnded = false;

let playerBoard = createGameBoard();
let computerBoard = createGameBoard();

let player;
let computer;

function startGame() {

    placePlayerShips();
    placeCompShips();
    player = createPlayer(playerBoard, computerBoard, false);
    computer = createPlayer(computerBoard, playerBoard, true);

    player.attackEnemy([0, 1]);
    player.attackEnemy([5, 5]);

    computer.attackEnemy();
    computer.attackEnemy();

    createMain(player, computer, turn);


}

function placePlayerShips() {
    playerBoard.placeShip( 5, [0,0], "vertical");
    playerBoard.placeShip( 4, [1,0], "vertical");
    playerBoard.placeShip( 3, [2,0], "vertical");
    playerBoard.placeShip( 3, [3,0], "vertical");
    playerBoard.placeShip( 2, [4,0], "vertical");

}

function placeCompShips(){

    //while( computerBoard.ships.length != 1) {
    computerBoard.placeShip(5, [Math.floor(Math.random() * 5), Math.floor(Math.random() * 5)], 
        Math.random() > .5 ? "horizontal" :"vertical");
    //}
    while( computerBoard.ships.length != 2) {

    computerBoard.placeShip(4, [Math.floor(Math.random() * 6), Math.floor(Math.random() * 6)], 
        Math.random() > .5 ? "horizontal" :"vertical");
    }
    while( computerBoard.ships.length != 3) {

    computerBoard.placeShip(3, [Math.floor(Math.random() * 7), Math.floor(Math.random() * 7)], 
        Math.random() > .5 ? "horizontal" :"vertical");
    }
    while( computerBoard.ships.length != 4) {

    computerBoard.placeShip(3, [Math.floor(Math.random() * 7), Math.floor(Math.random() * 7)], 
        Math.random() > .5 ? "horizontal" :"vertical");
    }
    while( computerBoard.ships.length != 5) {

    computerBoard.placeShip(2, [Math.floor(Math.random() * 8), Math.floor(Math.random() * 8)], 
        Math.random() > .5 ? "horizontal" :"vertical");
    }
}

async function checkWinner() {

    if (computerBoard.allSunk() || playerBoard.allSunk()) {
        turn = "computer";
        //end game
        endGame();
        //pop up  game ended screen;

    }
    else {
        turn = "computer";
        await sleep(0);
        computer.attackEnemy();
        update();
        turn = "player";
    }

}

function start() {
    gameStarted = true;
    console.log("Game started!!!!")
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

export { startGame, checkWinner, getTurn, getPlayer, getComputer, getGameStarted, start, getGameEnded };