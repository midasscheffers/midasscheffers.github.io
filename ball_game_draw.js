var begin_xy = 60;
var xSize = innerWidth - 20;
var ySize = innerHeight - 20;
var bal;
var ballen = []; //Array waar de ballen in komen te staan
var aantalBallen = 15;
var speed_force = 50;
var ball_radius = 5;
var ball_color;
var player_size = 50;
var life = 250;
var stage = 0;
var change_speed = 0.125;
var timeStart;
var lose_life = false;
var highscore;
var button_audio = new Audio('button.mp3');
var lose_life_audio = new Audio('life.mp3');
var eerder = localStorage.getItem("eerder");
if (eerder != "ja"){
  localStorage.setItem("eerder", "ja");
  localStorage.setItem("highscore", 0);
}
highscore = localStorage.getItem("highscore");

$(document).keydown(function(event) {
if (event.ctrlKey==true && (event.which == '61' || event.which == '107' || event.which == '173' || event.which == '109'  || event.which == '187'  || event.which == '189'  ) ) {
        event.preventDefault();
     }
    // 107 Num Key  +
    // 109 Num Key  -
    // 173 Min Key  hyphen/underscor Hey
    // 61 Plus key  +/= key
});

$(window).bind('mousewheel DOMMouseScroll', function (event) {
       if (event.ctrlKey == true) {
       event.preventDefault();
       }
});

function setup(){
  createCanvas(xSize, ySize);
  noCursor();
  ballen = [];
  life = 250;
  for (var i = 0; i< aantalBallen; i++){
    bal = new Bal(random(begin_xy,innerWidth - begin_xy), random(begin_xy, innerHeight - begin_xy), ball_radius + random(0,25), random(1, 3), random(1, 3),[random(255), random(255), random(255)]);
    ballen.push(bal);
  }
}

function draw(){
  strokeWeight(3);
  if(stage == 0){
    background(200);
    fill(170);
    noStroke();
    rect((innerWidth/2)-70, (innerHeight/2)-75, 140, 70);
    textSize(50);
    fill(140);
    text("Start", (innerWidth/2)-55, (innerHeight/2)-25);
    stroke(50);
    ellipse(mouseX,mouseY,10)
  }
  else if(stage > 0){
    if(life <= 0){
      stage = 2;
      background(255,0,0);
      textSize(50);
      fill(150,0,0);
      noStroke();
      text("You died", (innerWidth/2)-100, (innerHeight/2)-25);
      fill(255, 70, 70);
      rect((innerWidth/2)-60, (innerHeight/2), 120, 55);
      fill(150, 0, 0)
      text("retry", (innerWidth/2)-50, (innerHeight/2)+40);
      fill(170);
      stroke(50);
      ellipse(mouseX,mouseY,10);
      noStroke();
      textSize(32);
      fill(50,255,50);
      text("score: " + score.toString(), 150, 30);
      if (score > highscore){
        localStorage.setItem("highscore", score);
        highscore = score;
      }
      text("highscore: " + highscore.toString(), 500, 30);
    }
    else if(stage == 1){
      // time logic
      score = floor(millis() - timeStart);
      if (lose_life == false){
        background(255,255,255,speed_force);
      }else if(lose_life == true){
        background(255,0,0,speed_force);
      }
      // print life
      textSize(32);
      if (lose_life == false){
        fill(255,0,0);
      }else if(lose_life == true){
        fill(0);
      }
      text("life: " + life, 0, 30);
      fill(50,255,50);
      text("score: " + score.toString(), 150, 30);
      fill(50);
      if (lose_life == false){
        noStroke();
      }else if(lose_life == true){
        strokeWeight(3);
        stroke(255,0,0);
      }
      lose_life = false;
      ellipse(mouseX, mouseY, player_size);
      //ball logic
      for (var i = 0; i < ballen.length; i++){
        bal = ballen[i];
        bal.teken();
        bal.check_hit();
        bal.beweeg();
      }
    }
  }
}

function mouseClicked(){
  if(stage == 0){
    if(mouseX > (innerWidth/2)-70 && mouseX < (innerWidth/2)+70 && mouseY > (innerHeight/2)-75 && mouseY < (innerHeight/2)-5){
      audio.play(button_audio);
      stage = 1;
      timeStart = millis();
    }
  }if(stage >= 2){
    if(mouseX > (innerWidth/2)-60 && mouseX < (innerWidth/2)+60 && mouseY > (innerHeight/2) && mouseY < (innerHeight/2)+55){
      audio.play(button_audio);
      setup();
      stage = 0;
    }
  }
}

function Bal(x, y, radius, xspd, yspd, ball_col){
  this.ball_color = ball_col;
  this.xPos = x;
  this.yPos = y;
  this.radius = radius;
  this.xSpeed = xspd;
  this.ySpeed = yspd;

  this.teken = function(){
    noStroke();
    fill(ball_col);
    ellipse(this.xPos, this.yPos, 2*this.radius, 2*this.radius);
  }

  this.check_hit = function(){
    dx = mouseX - this.xPos;
    dy = mouseY - this.yPos;
    if (sqrt(dx*dx + dy*dy) <= player_size + this.radius){
      lose_life = true;
      life -= floor(this.radius/10) + 1;
      audio.play(lose_life_audio);
    }
  }

  this.beweeg = function(){
    if (this.xPos > width - this.radius || this.xPos < this.radius){
      if (this.xSpeed < 0){
        this.xSpeed -=change_speed;
        if (this.ySpeed < 0){
          this.ySpeed -=change_speed;
        }
        else{
          this.ySpeed +=change_speed;
        }
      }
      else{
        this.xSpeed +=change_speed;
        if (this.ySpeed < 0){
          this.ySpeed -=change_speed;
        }
        else{
          this.ySpeed +=change_speed;
        }
      }
      this.xSpeed = -this.xSpeed;
    }
    if (this.yPos > height - this.radius || this.yPos < this.radius){
      if (this.ySpeed < 0){
        this.ySpeed -=change_speed;
        if (this.xSpeed < 0){
          this.xSpeed -=change_speed;
        }
        else{
          this.xSpeed +=change_speed;
        }
      }
      else{
        this.ySpeed +=change_speed;
        if (this.xSpeed < 0){
          this.xSpeed -=change_speed;
        }
        else{
          this.xSpeed +=change_speed;
        }
      }
      this.ySpeed = -this.ySpeed;
    }
    this.xPos += this.xSpeed;
    this.yPos += this.ySpeed;
  }
}
