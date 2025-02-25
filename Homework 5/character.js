class character
{
    constructor(path, x,y)
    {
        this.path = path;
        this.myImage = loadImage(this.path);
        this.x = x;
        this.y = y;
        this.imageWidth = 20;
        this.imageHeight = 100;
}

draw()
{
    image(this.myImage, this.x, this.y, 20, 100);
}


}