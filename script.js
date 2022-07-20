// logic for running the game
const game = (function() {
   const gameBoardArray = [];

   

   render();
    
   function render() {
      const gameBoard = document.querySelector('.game-board');

      for (let i = 0; i < 9; i++) {
         const gameBoardCell = document.createElement('button');
         gameBoardCell.classList.add('board-cell');
         gameBoardCell.classList.add = `cell-${i}`;
         gameBoard.append(gameBoardCell);
      }
   }
  
})();
 
// control displaying of elements
const displayController = (function() {
   
})();

