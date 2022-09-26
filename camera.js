class Camera{
    constructor(image, clipX, clipY, clipWidth, clipHeight, cameraX, cameraY, cameraWidth, cameraHeight){
        this.image = image;
        this.clipX = clipX;
        this.clipY = clipY;
        this.clipWidth = clipWidth;
        this.clipHeight = clipHeight;
        this.x = cameraX;
        this.y = cameraY;
        this.width = cameraWidth;
        this.height = cameraHeight;
    }

    draw(){
        ctx.drawImage(this.image, this.clipX, this.clipY, this.clipWidth, this.clipHeight, this.x, this.y, this.width, this.height);
    }

    move(){
        // checks to see if left or right edge of the map is in the camera. If so, don't allow camera movement.
        if (rightPressed && player.x >= playerX){
            this.clipX = Math.min(this.clipX + player.speed, 960);
        } else if (leftPressed && player.x <= (canvas.width - playerX - player.width)){
            this.clipX = Math.max(this.clipX - player.speed, 0);
        }
        // checks to see if top or bottom edge of the map is in the camera. If so, don't allow camera movement.
        if (upPressed && player.y <= (canvas.height - playerY - player.height)){
            this.clipY = Math.max(this.clipY - player.speed, 0);
        } else if (downPressed && player.y >= playerY){    
            this.clipY = Math.min(this.clipY + player.speed, 1280);
        }
    }    

}