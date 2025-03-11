class Character {
    constructor(path, x, y) 
    {
        this.path = path;
        this.myImage = loadImage(this.path);           
        this.x = x;
        this.y = y;
        this.imageWidth = 40;
        this.imageHeight = 60;
        this.flipX = false;
    }

    draw() 
    {
        push();
        if (this.flipX){
            translate(this.imageWidth, 0);
            scale(-1.0, 1.0);
            image(this.myImage, this.x, this.y, 40, 60);
        }
        else{
            image(this.imageHeight, this.x, this.y, 50, 75);
        }
        pop();
    }   
}