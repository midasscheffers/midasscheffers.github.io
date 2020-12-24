class Knight extends Piece{

  constructor(x, y, color) {
    super(x,y, color)
    this.piece = "knight";
    this.points = 3;
  }

  blit(spacing, halfBoard, halfSpace, selection_color){
    if (this.isSelected){
      this.blitSelected(spacing, halfBoard, halfSpace, selection_color)
    }
    fill(200, 230, 180);
    image(this.image, this.x*spacing-halfBoard, this.y*spacing-halfBoard, spacing, spacing);
  }

}
