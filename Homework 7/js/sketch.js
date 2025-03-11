var animation = [];
var slideAnimation = [];
var i = 0;
var myCircle1;
var myTemple;
var circle1Array = [];
var x = 100;
var y = 100;
var runStrings = [];
var slideStrings = [];
//var loaded = false;
//var isSliding = false; // New flag for animation state
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
    //let runLoaded = false;  // Track if run.txt is loaded
    //let slideLoaded = false;// Track if slide.txt is loaded
    soundFormats("mp3");
    backgroundmusic = loadSound("sounds/background sound.mp3");
    powerUp = loadSound("sounds/powerup.mp3");
    powerDown = loadSound("sounds/powerdown.mp3");
runStrings = loadStrings('Data/run.txt');
slideStrings = loadStrings('Data/slide.txt');
}

// Setup function runs once after preload, initializes the game
function setup() {
    let myCanvas = createCanvas(1000, 1000); // Create a 1000x1000 pixel canvas
    setInterval(circleswap, 5000);
    setInterval (countdowntimer, 1000);
    // Load initial Templerun run animations directly (not from run.txt)
    for (var j = 0; j < 10; j++) {
        let path = "Assets/Images/templerun/Run__00" + j + ".png"; // Construct image path
        myTemple = new character(runStrings[j], x, y); // Create Templerun object with image
        animation.push(myTemple);
        myTemple = new character(slideStrings[j], x, y); // Create Templerun object with image
        animation.push(myTemple);     // Add to animation array
    }

    // Check if text files loaded successfully
    if (!loaded) {
        console.warn("Text files not fully loaded, using fallback"); // Warn if loading failed
        // Fallback: Load run animations directly if run.txt isn’t ready
        for (let j = 0; j < 10; j++) {
            let runChar = new Character("Assets/Images/templerun/Run__00" + j + ".png", x, y);
            animation.push(runChar); // Add to animation array
        }
        // Fallback: Load slide animations directly if slide.txt isn’t ready
        for (let j = 0; j < 10; j++) {
            let slideChar = new Character("Assets/Images/templerun/Slide__00" + j + ".png", x, y);
            slideAnimation.push(slideChar); // Add to slideAnimation array
        }
    } else {
        // Load run animations from run.txt with corrected path
        for (let j = 0; j < runStrings.length; j++) {
            let runChar = new Character("Assets/Images/templerun/" + runStrings[j], x, y);
            animation.push(runChar); // Add to animation array
        }
        // Load slide animations from slide.txt with corrected path
        for (let j = 0; j < slideStrings.length; j++) {
            let slideChar = new Character("Assets/Images/templerun/" + slideStrings[j], x, y);
            slideAnimation.push(slideChar); // Add to slideAnimation array
        }
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

// Draw function runs continuously, updates the game visuals
function draw() {
    background(220); // Clear canvas with light gray background
    loadcircle1();
    
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
                    if(collideRectCircle(animation[j].x, animation[j].y, animation[j].imageWidth, animation[j].imageHeight, cirlce1Array[k].x,cirlc1Array[k].y, 10, 10 ))
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
                //console.log("Collision detected!", circle1Array.length); // Log remaining circles
            }
        }
        else 
    {
        animation[j].draw();
    } 
    if ( timeLeft== 0 || score == 0){
        keyIsPressed = false;
    }
    if (score == 10){
        keyIsPressed = false;
    }
    
}
    fill(0);
    textFont("Arial");
  textSize(16);
  text("Score:"+ score, 10, 40);
  
  text("Time:"+gameTime, 250, 40);

  if (gameTime <= 0) {
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Game Over!", width / 2, height / 2);
    noLoop();
        displayAnimation();
  }

  function displayAmination() {
    noFill();
    stroke(0, 0, 100);
    strokeWeight(5);
  }

  function countdowntimer() {
    counter++;
        timeLeft--;
        if  (timeLeft== 0) {
            clearInterval(interval);
        }
  }

// Function to increment animation frame, called every 50ms by setInterval
function updateIndex() {
    i = (i + 1) % 10; // Increment i, loop back to 0 after 9 (10 frames)
}