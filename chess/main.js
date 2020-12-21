
var gameBoard;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight-4);
  gameBoard = new Board();
  setUpBoard(gameBoard);
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


function setUpBoard(gameBoard){
  gameBoard.players.push(new Player("white", "bottom"));
  gameBoard.players.push(new Player("black", "top"));
  for (var i; i < 8; i ++){
    gameBoard.players[0].pieces.push(new Pon(i, 0, gameBoard.players[0].color))
  }
}
