var animation = [];
var slideAnimation = [];
var i = 0;
var myTemple;
var circle1Array = [];
var x = 100;
var y = 100;
var runStrings = [];
var slideStrings = [];
var loaded = false;
var isSliding = false; // New flag for animation state
var score = 0;
var gameTime = 60;       // Game time in milliseconds (30 seconds)
var startTime;              // Timestamp when game starts
var loadSound;
var backgroundmusic;
var PowerUp;
var PowerDown;
var countdowntimer;
var foodArray;
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

    // Helper function to set loaded flag when both text files are ready
    function checkLoaded() {
        if (runLoaded && slideLoaded) {
            loaded = true; // Set flag true only when both files are loaded
        }
    }
}

// Setup function runs once after preload, initializes the game
function setup() {
    let myCanvas = createCanvas(1000, 1000); // Create a 1000x1000 pixel canvas
    setInterval (countdowntimer, 1000)
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
    try {
        for (let j = 0; j < 6; j++) {
            let myCircle1 = new Circle1(random(90, 250), random(90, 250), 50, 223, 26, 16); // Random x, y between 90 and 250
            circle1Array.push(myCircle1); // Add to circle array
        }

        for (let j = 0; j < 6; j++) {
            let myCircle1 = new Circle1(random(90, 250), random(90, 250), 50, 31, 245, 28); // Random x, y between 90 and 250
            circle1Array.push(myCircle1); // Add to circle array
        }
    } catch (e) {
        //console.error("Error creating Circle1:", e); // Log if Circle1 class isn’t defined
    }
    //bgSound();
}

function bgSound() {
    backgroundmusic.play();
    backgroundmusic.loop();
    backgroundmusic.setVolume(0.3);
    userStartAudio();
}
// Draw function runs continuously, updates the game visuals
function draw() {
    background(220); // Clear canvas with light gray background
    Pizza();

    let currentFrame = i % animation.length; // Get current animation frame, loop if i exceeds length

    // Draw either slide or run animation based on isSliding flag
    if (isSliding && slideAnimation.length > 0) {
        slideAnimation[currentFrame].draw(); // Draw slide animation if Shift is pressed
    } else if (animation.length > 0) {
        animation[currentFrame].draw(x, y); // Draw run animation by default
    }

    // Draw all circles (obstacles)
    for (let k = 0; k < circle1Array.length; k++) {
        circle1Array[k].draw(); // Draw each Circle1 object
    }

    // Handle keyboard input for movement and sliding
    if (keyIsPressed) {
        if (key === "a") x--;        // Move left
        if (key === "d") x++;        // Move right
        if (key === "w") y--;        // Move up
        if (key === "s") y++;        // Move down
        if (keyCode === SHIFT) isSliding = true; // Switch to slide animation with Shift

        // Update position of all run animation frames
        for (let j = 0; j < animation.length; j++) {
            animation[j].x = x;
            animation[j].y = y;
            animation[j].flipX = flipX;
        }
        // Update position of all slide animation frames
        for (let j = 0; j < slideAnimation.length; j++) {
            slideAnimation[j].x = x;
            slideAnimation[j].y = y;
            slideAnimation[j].flipX = flipX;
        }

        // Check for collisions with circles, remove them if hit
                for (let k = 0; k < foodArray.length; k++) 
                    {
                    //if (animation[i].hasCollided(foodArray[k].x, foodArray[k].y, 10, 10)) 
                    if(collideRectCircle(animation[i].x, animation[i].y, animation[i].imageWidth, animation[i].imageHeight, foodArray[k].x,foodArray[k].y, 10, 10 ))
                {
                    if (foodArray[k].r==34){
                        powerUp.play();
                        score = score + 1;
                    }
                    else{
                        powerDown.play();
                        score= score - 1;
    
                    }
    
                foodArray.splice(k, 1);               
                
                }
            }
                //console.log("Collision detected!", circle1Array.length); // Log remaining circles
            }
        }
{
        isSliding = false; // Revert to run animation when no keys are pressed
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
    gameTime--
  }

// Function to increment animation frame, called every 50ms by setInterval
function updateIndex() {
    i = (i + 1) % 10; // Increment i, loop back to 0 after 9 (10 frames)
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