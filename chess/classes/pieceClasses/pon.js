class Pon extends Piece{

  constructor(x, y, color, side) {
    super(x,y, color)
    this.piece = "pon";
    this.image = '';
    this.points = 1;
    this.side = side;
    this.firstMove = true;
    this.enpassent_squere = '';
  }

  blit(spacing, halfBoard, halfSpace, selection_color){
    if (this.isSelected){
      rectMode(CENTER);
      fill(selection_color)
      rect(this.x*spacing-halfBoard+halfSpace, this.y*spacing-halfBoard+halfSpace, spacing, spacing);
      rectMode(CORNER)
    }
    fill(0);
    image(this.image, this.x*spacing-halfBoard, this.y*spacing-halfBoard, spacing, spacing);
  }

}
