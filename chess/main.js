var boardSize = 0;
var spacing;
var halfBoard;
var halfSpace;
var brown = [109,60,52];
var light = [205,158,116];
var selection_color = [240, 229, 144, 130];

var strokeSize = 3;

var WhitePieces = [];
var BrownPieces = [];

var brownTurn = true;

pon = new Pon(0,0, "black");
// pon.image = black_pon_img;
pon1 = new Pon(1,0, "black");
// pon1.image =black_pon_img;

var pieces = [];
pieces.push(pon);
pieces.push(pon1);

// function preload(){
//   black_pon_img = loadImage("Images/black_pon.png");
// }


function setup() {
  createCanvas(window.innerWidth, window.innerHeight-4);
  
  boardSize = height/1.5;
  spacing = boardSize/8;
  halfSpace = spacing/2;
  halfBoard = boardSize/2


  loadPieceImages(pieces)
}


function draw() {

  background(230, 230, 190);
  translate(width/2, height/2);
  drawBoard();

  pieces.forEach(p => {
    p.blit();
    if (CheckIfSelected(p)){
      pieces.forEach(j => {
        j.isSelected = false
      })
      p.isSelected = CheckIfSelected(p);
    }
  });

}


function drawBoard(){
  fill(light);
  noStroke();
  rect(-halfBoard, -halfBoard, boardSize, boardSize);
  for (var y = 0; y < 8; y++){
    for (var x = 0; x < 8; x++){
      if (y % 2 == 0){
        if (x%2 == 1){
          fill(brown)
          rect(x*spacing-halfBoard, y*spacing-halfBoard, spacing, spacing)
        }
      }
      else{
        if(x%2 != 1){
          fill(brown)
          rect(x*spacing-halfBoard, y*spacing-halfBoard, spacing, spacing)
        }
      }
    }
  }
}

function CheckIfSelected(pon){
  var mouseTransPosX = mouseX-(width/2 - halfBoard + halfSpace);
  var mouseTransPosY = mouseY-(height/2-halfBoard + halfSpace);
  if (mouseTransPosX > pon.x*spacing-halfSpace && mouseTransPosY > pon.y*spacing-halfSpace && mouseTransPosX < pon.x*spacing+halfSpace && mouseTransPosY < pon.y*spacing+halfSpace){
    if (mouseIsPressed){
      return true;
    }
  }
  return false
}

function loadPieceImages(pieces){
  pieces.forEach(p => {
    p.image = loadImage("Images/" + p.color + "_" + p.piece + ".png");
  })
}
