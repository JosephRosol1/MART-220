var animation = [];
var slideAnimation = [];
var j = 0;
var character;
var myCharacter;
var myCircle1;
//var myTemple;
var circle1Array = [];
var x = 100;
var y = 100;
var runStrings = [];
var slideStrings = [];

var score = 0;
var timeLeft = 60;       // Game time in milliseconds (30 seconds)
var counter = 0;
var startTime;              // Timestamp when game starts
var backgroundmusic;
var PowerUp;
var PowerDown;
var countdowntimer;
var flipX = false;


// Preload function runs before setup, used to load external assets
function preload() {
    
    soundFormats("mp3");
    backgroundmusic = loadSound("sounds/backgroundsound.mp3");
    powerUp = loadSound("sounds/powerup.mp3");
    powerDown = loadSound("sounds/powerdown.mp3");
runStrings = loadStrings('Data/run.txt');
slideStrings = loadStrings('Data/slide.txt');
}

// Setup function runs once after preload, initializes the game
function setup() {
     createCanvas(1000, 1000); // Create a 1000x1000 pixel canvas

    setInterval(circleswap, 5000);

    var interval = setInterval (countdowntimer, 1000);

    function countdowntimer() {
        counter++;
            timeLeft--;
            if  (timeLeft== 0) {
                clearInterval(interval);
            }
      }
    
    for (var j = 0; j < runStrings.length; j++) {
        
        myCharacter = new character(runStrings[j], x, y); // Create  character animation with run image
        animation.push(myCharacter);
        myCharacter = new character(slideStrings[j], x, y); // Create character animation with slide image
        animation.push(myCharacter);     // Add to animation array
    }

   

    // Set animation frame to update every 50ms (20 frames per second)
    setInterval(updateIndex, 50);

    // Create 6 Circle1 objects (obstacles) at random positions
 {
        for (let j = 0; j < 6; j++) {
            myCircle1 = new circle1(random(90, 950), random(90, 950), 223, 26, 16, 50); // Random x, y between 90 and 250
            circle1Array.push(myCircle1); // Add to circle array
        }

        for (let j = 0; j < 6; j++) {
            myCircle1 = new circle1(random(90, 950), random(90, 950), 31, 245, 28, 50); // Random x, y between 90 and 250
            circle1Array.push(myCircle1); // Add to circle array
        }
    bgSound();
}

function loadcircle1()
{
for (let j = 0; j < circle1Array.length; j++) 
    {
    circle1Array[j].draw();
    }
}
function circleswap(){
    for (let j = 0; j < circle1Array.length; j++) 
        {
        circle1Array[j].x = random(90, 950);
        circle1Array[j].y= random(90, 950);
        }
        function bgSound() {
            backgroundmusic.play();
            backgroundmusic.loop();
            backgroundmusic.setVolume(0.3);
            userStartAudio();
        }
}
}

// Draw function runs continuously, updates the game visuals
function draw() {
    background(220); // Clear canvas with light gray background
    loadcircle1();

    fill();
    textFont("Arial");
  textSize(16);
  text("Score:"+ score, 10, 40);
  
  text("Time:"+gameTime, 250, 40);

  if (gameTime <= 0) {
    fill();
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Game Over!", width / 2, height / 2);
    noLoop();

    //animation
    if (keyIsPressed) {
        if (key === "a") {
            x = x--;
            flipX = true;
                }        // Move left
        if (key === "d") {
            x = x++;
            flipX = false;
                }        // Move right
        if (key === "w") {
            y--;  
              }      // Move up
        if (key === "s") {
            y++;        // Move down
        }

        // Update position of all run animation frames
        for (let j = 0; j < animation.length; j++) {
            animation[j].flipX = flipX;
            animation[j].x = x;
            animation[j].y = y;
        }
        // Update position of all slide animation frames
        for (let j = 0; j < slideAnimation.length; j++) {
            slideAnimation[j].flipX = flipX;
            slideAnimation[j].x = x;
            slideAnimation[j].y = y;
        }

        // Check for collisions with circles, remove them if hit
                for (let k = 0; k < circle1Array.length; k++) 
                    {
                    //if (animation[i].hasCollided(foodArray[k].x, foodArray[k].y, 10, 10)) 
                    if(collideRectCircle(animation[j].x, animation[j].y, animation[j].imageWidth, animation[j].imageHeight, cirlce1Array[k].x,circle1Array[k].y, 10, 10 ))
                {
                    if (circle1Array[k].r==223){
                        powerUp.play();
                        score = score + 1;
                    }
                    else{
                        powerDown.play();
                        score= score - 1;
    
                    }
    
                circle1Array.splice(k, 1);               
                
                }
            }
                
            }
        
        
        else 
    {
        animation[j].draw();
    } 
    /*if ( timeLeft== 0 || score == 0){
        keyIsPressed = false;
    }
    if (score == 10){
        keyIsPressed = false;
    }*/
    
}
}
   
    
// Function to increment animation frame, called every 50ms by setInterval
function updateIndex()
 {
    j =+ 1;
    if (j > runStrings.length - 1 )
    {j = 0;}
}