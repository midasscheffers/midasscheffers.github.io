class Pon extends Piece{

  constructor(x, y, color) {
    super(x,y, color)
    this.piece = "pon";
    this.image = '';
    this.points = 1;
  }

  blit(){
    
    if (this.isSelected){
      rectMode(CENTER);
      fill(selection_color)
      rect(this.x*spacing-halfBoard+halfSpace, this.y*spacing-halfBoard+halfSpace, spacing, spacing);
      rectMode(CORNER)
    }
    fill(0);
    // image(this.image, this.x*spacing-halfBoard+halfSpace, this.y*spacing-halfBoard+halfSpace, 40, 40);
  }

}