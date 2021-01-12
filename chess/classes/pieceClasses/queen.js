class Queen extends Piece{

  constructor(x, y, color) {
    super(x,y, color)
    this.piece = "queen";
    this.piece_char = "q"
    this.points = 9;
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
    for (let dir_y = -1; dir_y < 2; dir_y ++){
      for (let dir_x = -1; dir_x < 2; dir_x ++){
        if(dir_x != 0 || dir_y != 0){
          let inc = 1;
          if (this.cordOnBoard(this.x+inc*dir_x, this.y+inc*dir_y)){
            let pos_char = boardState[this.y+inc*dir_y][this.x+inc*dir_x];
            while ((this.cordOnBoard(this.x+inc*dir_x, this.y+inc*dir_y)) && (this.charIsOppColor(pos_char) || pos_char == "-")){
              moveSqueres.push([this.x+inc*dir_x, this.y+inc*dir_y]);
              if(this.charIsOppColor(pos_char) && pos_char != "-"){
                break;
              }
              inc ++;
              if (this.cordOnBoard(this.x+inc*dir_x, this.y+inc*dir_y)){
                pos_char = boardState[this.y+inc*dir_y][this.x+inc*dir_x];
              }
            }
          }
        }
      }
    }
    this.moveSqueres = moveSqueres;
    return moveSqueres;
  }
}
