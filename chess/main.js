
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
  gameBoard.blit();
}

// function CheckIfSelected(pon){
//   var mouseTransPosX = mouseX-(width/2 - halfBoard + halfSpace);
//   var mouseTransPosY = mouseY-(height/2-halfBoard + halfSpace);
//   if (mouseTransPosX > pon.x*spacing-halfSpace && mouseTransPosY > pon.y*spacing-halfSpace && mouseTransPosX < pon.x*spacing+halfSpace && mouseTransPosY < pon.y*spacing+halfSpace){
//     if (mouseIsPressed){
//       return true;
//     }
//   }
//   return false
// }


