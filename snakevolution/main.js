var Snakes = [];

void setup(){
  createCanvas(innerWidth, innerHeight);
  for(var i; i < 5; i++){
    s = new Snake(random(50, 300), random(50, 300));
    Snakes.push(s);
  }
}

void draw(){
  background(150)
  for(var i; i < Snakes.length; i++){
    snake = Snakes[i];
    snake.draw();
  }
}
