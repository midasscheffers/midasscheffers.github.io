
var gameBoard;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight-4);
  gameBoard = new Board();
  gameBoard.setUpBoard();
  gameBoard.loadPieceImages();
}


function draw() {

  background(230, 230, 190);
  translate(width/2, height/2);
  gameBoard.CheckForSelected();
  gameBoard.CheckForMove();
  gameBoard.blit();
}

