var animation = [];
var i = 0;
var temple;
var circle1Found = false;
var circle1Array = [];
var mycircle1;
var x = 100;
var y = 100;

function preload(){

  for(var i = 0; i< 10; i++)
  {
    temple = new templerun("Assets/Images/templerun/Run__00" + i + ".png");
    animation.push(temple);
  }
  
}

function setup() {
    createCanvas(1000, 1000);
    setInterval(updateIndex, 50);
    for (let i = 0; i < 6; i++) {
      mycircle1 = new circle1(random(90, 250), random(90, 250), 50);
      circle1Array.push(mycircle1);
    }

  }
  
  function draw() {
    background(220);
    Pizza();
    animation[i].draw();
    for (let i = 0; i < circle1Array.length; i++) {
      circle1Array[i].draw();
    }

    if (keyIsPressed) {
      if (key == "a") {
        x--;
      }
      if (key == "d") {
        x++;
      }
      if (key == "w") {
        y--;
      }
      if (key == "s") {
        y++;
      }
      for (let i = 0; i < 10; i++) {
        animation[i].x = x;
        animation[i].y = y;
      }

      for (let k = 0; k < circle1Array.length; k++) {
        if (animation[i].hasCollided(circle1Array[k].x, circle1Array[k].y, 25, 25))
            circle1Array.splice(k, 1);
        console.log(k);
      }
    }
  }
  function updateIndex()
  {
    i++;
    if(i > 8)
    {
      i = 0;
    }
  }

  function Pizza()
  {
    fill(219, 219, 101);
    triangle(30, 100, 300, 100, 160, 350);
    fill(255,0,0);
    circle(90,150,50);
    circle(160,150,50);
    circle(120,200,50);
    circle(180,200,50);
    circle(160,250,50);
    circle(230,150,50);
    fill(196, 143, 73);
    rect(27,85,275,20);
    fill(0,0,0);
    ellipse(70,118,15,20);
    ellipse(140,290,15,20);
    ellipse(230,200,15,20);
    ellipse(200,118,15,20);
    ellipse(120,250,15,20);
    fill(10, 143, 53);
    square(150,300,20);
    square(240,105,20);
    square(120,110,20);
    square(190,230,20);
    fill(0,0,0);
    }