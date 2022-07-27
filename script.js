 const Player = (symbol, name) => {
   const getSymbol = () => symbol;
   const getName = () => name;
   return {
      getSymbol,
      getName,
   }
}
// logic for running the game
const game = (function() {
   
   render();

   controlGame();

   function render() {
      const gameBoard = document.querySelector('.game-board');
      
      for (let i = 0; i < 9; i++) {
         const gameBoardCell = document.createElement('button');
         gameBoardCell.classList.add('game-cell');
         gameBoardCell.dataset.cellNumber = `${i}`;
         gameBoard.append(gameBoardCell);
      }
      const refreshButton = document.querySelector('.refresh-button');
      refreshButton.addEventListener('click', () => {
         const cellList = document.querySelectorAll('.game-cell');
         cellList.forEach(cell => {
            cell.textContent = '';
         });
         const announcementBoard = document.querySelector('.announcement-board');
         announcementBoard.textContent = '';
         controlGame();
      });
   }
   

   function controlGame() {
      const gameBoardArray = [null, null, null, null, null, null, null, null, null];
      const player1 = Player('X', 'player 1');
      const player2 = Player('O', 'player 2');
      let currentPlayer = player1;
      addMarks();

      // cache dom elements
      const announcementBoard = document.querySelector('.announcement-board'); 
      
      function addMarks() {
         const gameBoard = document.querySelector(".game-board");

         let boardDisabled = false;

         gameBoard.addEventListener("click", (e) => {
            const gameBoardCell = e.target.closest(".game-cell");
            if (!gameBoardCell || boardDisabled) return; // if click didn't land on a cell or if the gameboard is disabled, just bail

            const cellNumber = gameBoardCell.dataset.cellNumber;

            if (gameBoardArray[cellNumber] === null) {
               gameBoardArray[cellNumber] = currentPlayer.getSymbol();
               gameBoardCell.textContent = currentPlayer.getSymbol();
               if (checkForWin(gameBoardArray) === undefined) {
                  toggleTurn();
               }
               console.log(checkForWin(gameBoardArray));
            }

            if (checkForWin(gameBoardArray) === true) {
               announcementBoard.textContent = `${currentPlayer.getName()} won!`;
               boardDisabled = true;
            }

            if (checkForWin(gameBoardArray) === false) {
               announcementBoard.textContent = "tie!";
            }
         });
      }



      function toggleTurn() {
         if (currentPlayer === player1) {
          currentPlayer = player2;
         }
         else if (currentPlayer === player2) {
          currentPlayer = player1;
         }
       }
   
      function checkForWin(gameBoardArray) {
         // check columns
         for (let i = 0; i < 3; i++) {
            if (gameBoardArray[i] === gameBoardArray[i + 3] && gameBoardArray[i] === gameBoardArray[i + 6]) {
               if (gameBoardArray[i] !== null) {
                  return true;  
               } 
            }
         }
   
         // check rows 
         for (let i = 0; i <= 6; i += 3 ) {
            if (gameBoardArray[i] === gameBoardArray[i + 1] && gameBoardArray[i] === gameBoardArray[i + 2]) {
               if (gameBoardArray[i] !== null) {
                  return true;  
               }
            }
         }
   
         // check diagonals 
         if (gameBoardArray[0] === gameBoardArray[4] && gameBoardArray[0] === gameBoardArray[8]) {
            if (gameBoardArray[0] !== null) {
               return true;  
            }
         }
   
         if (gameBoardArray[2] === gameBoardArray[4] && gameBoardArray[2] === gameBoardArray[6]) {
            if (gameBoardArray[2] !== null) {
               return true;  
            }
         }
         if(!(gameBoardArray.includes(null))) {
            return false;
         }
      }
   }
})();


