const header = document.getElementById("header");
const gameBoard = document.getElementById("app");
const resetButton = document.getElementById("btn");
const playerO = "O";
const playerX = "X";
let currPlayer = "X";
let gameOver = false;
let board = new Array(10).fill(null);



function checkCombination (index1, index2, index3){

    let tile;

    if (board[index1]== board[index2] && board[index2] == board[index3] && board[index3] !== " "){
        tile = document.getElementById("tile"+index1);
        tile.classList.add("winner");
        tile = document.getElementById("tile"+index2);
        tile.classList.add("winner");
        tile = document.getElementById("tile"+index3);
        tile.classList.add("winner");
        gameOver = true;
    }
}

function checkTie(){

    let index = 1;

    // If someone won the game already, it is not a tie game.
    if(gameOver){
        return false;
    }

    // Otherwise, check if the board has an empty spot in it.
    while (board[index]!== " "){
        console.log(index);
        // If all 9 spaces on the board are not equal to null, then the game is over and it is a tie game.
        if(index >=9){
            gameOver = true;
            return true;
        }
        // Otherwise, increment index and continue loop.
        index+=1;
    }

    // If there is an empty space represented by a null in the Board array, then the game is not over yet.
    return false;
}

function checkWinner(){
    // if there is a winning combination on the board, the game is over.
    // If the game is over, update the header on who won.

    let winner = currPlayer;
    let tie = false;

    // Check rows for winning combination. 
    // Check row 1 for winning combination.   
    checkCombination(1,2,3);
    
    // Check row 2 for winning combination.
    checkCombination(4,5,6);

    // check row 3 for winning combination.
    checkCombination(7,8,9);

    // Check columns for winning combination.
    // Check column 1.
    checkCombination(1,4,7);

    // Check column 2.
    checkCombination(2,5,8);

    // Check column 3.
    checkCombination(3,6,9);

    // Check diagonals.
    checkCombination(1,5,9);
    checkCombination(3,5,7);

    // Check for cat's game.  No winners in this situation.
    tie = checkTie();

    // If the game is over, indicate on the header how the game ended.  Otherwise, 
    // If there is no winner yet, change current player to the opposite player.
    if(gameOver && tie){
        header.innerText = `It's a tie game.`
    } else if (gameOver && !tie){
        header.innerText = `${currPlayer} won the game!`
    } else {
        if (currPlayer == playerX){
            currPlayer = playerO;
        } else {
            currPlayer = playerX;
        }
        // And update the header text.
        header.innerText = `${currPlayer}'s turn!`
    }    
}

function setTile(e){

    // Don't allow changing tiles if the game has completed.
    if(gameOver){
        return;
    }

    // If the tile already has a value, then don't allow changes.
    if(this.innerText != ""){
        return;
    }

    // Capture the tile id to be updated.
    let tile = this.id;
    tileNum = tile[4];
        
    // For testing purposes.
    console.log("Tile is ", tile);
    console.log("TileNum is ", tileNum);
    
    // Mark the board on the screen and in the board tracker.
    this.innerText = currPlayer;
    board[tileNum] = currPlayer;

    // Check for a winner.
    checkWinner();

}


function setUpGame(){

    // reset current player
    currPlayer = "X";

    header.innerText = `${currPlayer}'s turn`


    // reset game over flag
    gameOver = false;
    
    // reset board tracker.
    for(let i = 1; i < 10; i++){
        board[i] = " ";        
    }
    
    // reset game board on screen.
    while(gameBoard.firstChild){
        gameBoard.removeChild(gameBoard.firstChild);
    }
    
    // Add gameboard tiles to the screen with event listeners.
    for (let i = 1; i<10; i++){
        let tileNum = "tile" + i;
        let tile = document.createElement("div");
        tile.classList.add("tile");
        tile.id = tileNum;
        tile.innerText = "";
        tile.addEventListener("click", setTile);
        gameBoard.appendChild(tile);
    }
}

resetButton.addEventListener('click', setUpGame);
setUpGame();