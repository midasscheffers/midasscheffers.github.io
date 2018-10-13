class Snake {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(){
    ellipse(this.x, this.y, 50, 50, 2);
  }

  move(){
    return;
  }

}
