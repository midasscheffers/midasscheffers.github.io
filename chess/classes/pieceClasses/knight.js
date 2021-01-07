class Knight extends Piece{

  constructor(x, y, color) {
    super(x,y, color)
    this.piece = "knight";
    this.piece_char = "n"
    this.points = 3;
  }

  blit(spacing, halfBoard, halfSpace, selection_color){
    if (this.isSelected){
      this.blitSelected(spacing, halfBoard, halfSpace, selection_color)
    }
    fill(200, 230, 180);
    image(this.image, this.x*spacing-halfBoard, this.y*spacing-halfBoard, spacing, spacing);
  }

  CheckMoveSqueres(boardState){
    var moveSqueres = [];
    for (var y = -2; y < 3; y ++){
      if(y != 0){
        var x = 3-Math.abs(y);
        if(this.cordOnBoard(this.x+x, this.y+y)){
          var right_sq = boardState[this.y+y][this.x+x];
          if (right_sq == "-" || this.charIsOppColor(right_sq)){
            moveSqueres.push([this.x+x, this.y+y]);
          }
        }
        if(this.cordOnBoard(this.x-x, this.y+y)){
          var left_sq = boardState[this.y+y][this.x-x];
          if (left_sq == "-" || this.charIsOppColor(left_sq)){
            moveSqueres.push([this.x-x, this.y+y]);
          }
        }
      }
    }
    this.moveSqueres = moveSqueres;
    return moveSqueres
  }
}
