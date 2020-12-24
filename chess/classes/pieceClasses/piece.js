class Piece {

  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.isSelected = false;
    this.color = color;
    this.moveSqueres = [];
  }

  cordOnBoard(x, y){
    if (x>-1 && x<8 && y>-1 && y<8){
      return true;
    }
    return false;
  }

  blitSelected(spacing, halfBoard, halfSpace, selection_color){
    rectMode(CENTER);
    fill(selection_color)
    rect(this.x*spacing-halfBoard+halfSpace, this.y*spacing-halfBoard+halfSpace, spacing, spacing);
    rectMode(CORNER)
    for(var i = 0; i < this.moveSqueres.length; i++){
      fill([0,0,0,50])
      ellipse(this.moveSqueres[i][0]*spacing-halfBoard+spacing, this.moveSqueres[i][1]*spacing-halfBoard+spacing, halfSpace, halfSpace);
    }
  }

  CheckMoveSqueres(boardState){
    return false;
  }

  charIsOppColor(char){
    if (this.color == "white"){
      if (this.isUpperCase(char)){
        return false
      }
      else{
        return true
      }
    }
    else{
      if (!this.isUpperCase(char)){
        return false
      }
      else{
        return true
      }
    }
  }

  isUpperCase(str) {
    upper = str.toUpperCase();
    return str === upper;
 }
}
