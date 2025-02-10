var x = 190;
var y = 230;
var z = 110;
var a = 120;
var b = 200;
let c = 150;
let goLeft = false;
let MyFont;

var img = 85;
var Bailey = 27;
var Sunset = 70;
function preload() {
  img = loadImage("Assets/Images/Glitched Artwork_Rosol.jpg");
  Bailey = loadImage("Assets/Images/Bailey2_Rosol.jpg");
  Sunset = loadImage("Assets/Images/sunset.jpg");
  myFont = loadFont("Assets/Oswald/Oswald.ttf");
}

function setup() {
  createCanvas(400, 400);
  setInterval(moveSunset, 900);
}

function draw() {
  background(220);
  image(img, 150,30);
  image(Bailey, 85,105);
  image(Sunset, 68,87);
  fill(219, 219, 101);
  triangle(30, 100, 300, 100, 160, 350);
  fill(255,0,0);
  circle(90,c,50);
  circle(160,c,50);
  circle(a,b,50);
  circle(180,b,50);
  circle(160,250,50);
  circle(230,c,50);
  fill(196, 143, 73);
  rect(27,85,275,20);
  fill(0,0,0);
  ellipse(70,118,15,20);
  ellipse(140,290,15,20);
  ellipse(y,b,15,20);
  ellipse(b,118,15,20);
  ellipse(a,250,15,20);
  fill(10, 143, 53);
  square(c,300,20);
  if(goLeft == false){
    c= c+3;
    
  }
  if(goLeft==true){
    c=c-3;
  }
  if(c>400)
  {
    goLeft= true;
  }
  if(c<0)
  {
    goLeft= false;
  }
  square(240,105,20);
  square(a,z,20);
  square(x,y,20);
  fill(0,0,0);
  textFont(myFont);
  textSize(20);
  text('Joseph Rosol',260,370);
  textSize(30);
  text('The Crazy Pizza',20,30);
}

function keyPressed() {
  if(key == 'a')
    {
      x-=10;
    }
  else if(key == 'd')
    {
      x+=10
    }
  else if(key == 'w')
    {
      y-=8
    }
  else if(key == 's')
    {
      y+=8
    }
  else if(key == 'f')
    {
      z-=10
    }
  else if(key == 'g')
    {
      z+=10
    }
  else if(key == 'q')
    {
      a+=6
    }
  else if(key == 'e')
    {
      a-=6
    }
  else if(key == 'r')
    {
      b+=5
    }
  else if(key == 'z')
    {
      b-=5
    }
}

function moveSunset()
{
  Sunset+=10;
  if(Sunset >= 75)
  {
    Sunset= 70;
  }
}