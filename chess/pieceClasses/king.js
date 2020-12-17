class King extends Piece{

  constructor(x, y, color) {
    super(x,y, color)
    this.piece = "king";
    this.points = 0;
  }

  blit(){
    if (this.isSelected){
      rectMode(CENTER);
      fill(selection_color)
      rect(this.x*spacing-halfBoard+halfSpace, this.y*spacing-halfBoard+halfSpace, spacing, spacing);
      rectMode(CORNER)
    }
    fill(200, 230, 180);
    ellipse(this.x*spacing-halfBoard+halfSpace, this.y*spacing-halfBoard+halfSpace, 40, 40);
  }

}
