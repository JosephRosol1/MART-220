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
}