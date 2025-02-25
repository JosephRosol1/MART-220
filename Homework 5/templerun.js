class templerun
{
    constructor(path)
    {
        this.path = path;
        console.log(this.path)
        //need image
        this.myImage = loadImage(this.path);
    }

    draw()
    {
        image(this.myImage, 100,100);
        //image draw
    }

    hasCollided(x2, y2, w2, h2){
        return(
            this.x < x2 + w2 &&
            this.x + this.imageWidth > x2 &&
            this.y < y2 + yh &&
            this.y + this.imageHeight > y2
        );
    }
}