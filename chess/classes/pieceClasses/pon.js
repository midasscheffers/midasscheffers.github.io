class Pon extends Piece{

  constructor(x, y, color, side) {
    super(x,y, color)
    this.piece = "pon";
    this.image = '';
    this.points = 1;
    this.side = side;
    if (this.side == "top"){
      this.dir = 1;
    }
    else{
      this.dir = -1;
    }
    this.firstMove = true;
    this.enpassent_squere = '';
  }

  blit(spacing, halfBoard, halfSpace, selection_color){
    if (this.isSelected){
      this.blitSelected(spacing, halfBoard, halfSpace, selection_color)
    }
    fill(0);
    image(this.image, this.x*spacing-halfBoard, this.y*spacing-halfBoard, spacing, spacing);
  }

  CheckMoveSqueres(boardState){
    var moveSqueres = [];
    var sq_up = boardState[this.y+this.dir][this.x];
    if (sq_up == "-" && this.cordOnBoard(this.x, this.y+this.dir)){
      moveSqueres.push([this.x, this.y+this.dir])
      var t_sq_up = boardState[this.y+this.dir*2][this.x];
      if (this.firstMove && t_sq_up == "-"){
        moveSqueres.push([this.x, this.y+this.dir*2]);
      }
    }
    var sq_dig_left = boardState[this.y+this.dir][this.x-1]
    if (sq_dig_left != "-" && this.cordOnBoard(this.x-1, this.y+this.dir) && charIsOppColor(sq_dig_right)){
      moveSqueres.push([this.x-1, this.y+this.dir]);
    }
    var sq_dig_right = boardState[this.y+this.dir][this.x+1]
    if (sq_dig_right != "-" && this.cordOnBoard(this.x+1, this.y+this.dir) && charIsOppColor(sq_dig_right)){
      moveSqueres.push([this.x+1, this.y+this.dir]);
    }
    this.moveSqueres = moveSqueres;
    return moveSqueres
  }
}
