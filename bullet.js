class Bullet{
    constructor(bulletAnchorX, bulletAnchorY, bulletWidth, bulletHeight, bulletSpeed, bulletDamage, bulletStartingX, bulletStartingY, bulletTargetX, bulletTargetY){
    this.x = bulletAnchorX;
    this.y = bulletAnchorY;
    this.width = bulletWidth;
    this.height = bulletHeight;
    this.speed = bulletSpeed;
    this.damage = bulletDamage;
    this.startingX = bulletStartingX;
    this.startingY = bulletStartingY;
    this.targetX = bulletTargetX;
    this.targetY = bulletTargetY;
    }

    draw(){
        // ctx.fillStyle = "yellow";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(bulletImage, this.x, this.y);
    }

    move() {
        player.determineTarget();
        // fires toward target main enemy with exact bullet speed along the trajectory
        var enemyDist = Math.sqrt(Math.pow(((this.targetX - player.determineTarget().width / 2) - (this.startingX - player.width / 2)), 2) + Math.pow(((this.targetY - player.determineTarget().height / 2) - (this.startingY - player.height / 2)), 2));
        var bulletMoveX = ((this.targetX - this.startingX) / enemyDist) * this.speed;
        var bulletMoveY = ((this.targetY - this.startingY) / enemyDist) * this.speed;
        this.x += bulletMoveX;
        this.y += bulletMoveY;
        
        // allow slight leading of bullets to even out inverse enemy movement & allow shots to connect more often
        if (camera.clipX >= (mapWidth - cameraViewWidth - 1) || camera.clipX <= 0){ // check if we're in the right or left camera-free zone
            if (camera.clipY <= 0 || camera.clipY >= (mapHeight - cameraViewHeight + 320)){ // check if we're in the top or bottom camera-free zone, which would put us in the 4 corners with no camera work
                // no bullet adjustment needed
            } else if (upPressed){
                this.y += player.speed;
            } else if (downPressed){
                this.y -= player.speed;
            }
        } else if (camera.clipY <= 0 || camera.clipY >= (mapHeight - cameraViewHeight + 320)){ // check if we're in the top or bottom camera-free zone
            if (rightPressed){
                this.x -= player.speed;
            } else if (leftPressed){
                this.x += player.speed;
            }
        } else { // this is for the center of the map
            if (upPressed){
                this.y += player.speed;
            } else if (downPressed){
                this.y -= player.speed
            }
            if (rightPressed){
                this.x -= player.speed;
            } else if (leftPressed){
                this.x += player.speed;
            }
        }           
    }

    outOfBounds(){
        if (this.x < 0 || this.x > canvas.width){
            return this.x < 0;
        } else if (this.y < 0 || this.y > canvas.height){
            return this.y < 0;

        }
    }
    
    // check if bullet is within any item's width & height
    hasHitItem(item){
        return (this.x + this.width >= item.x && this.x <= item.x + item.width) && 
        (this.y + this.height >= item.y && this.y <= item.y + item.height);
    }

    // use item code to check if it's hit main enemy
    hasHitEnemy(enemy){
        return this.hasHitItem(enemy);
    }

    /* Apply bullet damage to enemy
    *  Pass bullet collided variable (necessary to check if bullet needs deleting)
    *  Delete main enemy if bullet damage put them below 0 health
    */
    hasCollided(){
        var self = this;
        var collided = false;
        enemies.forEach(function(enemy, i){
            if (self.hasHitEnemy(enemy)){
                enemy.health -= self.damage * player.damage;
                //console.log("Dealt " + (self.damage * player.damage) + " damage.");
                collided = true;
                if (enemy.health <= 0){
                    delete enemies[i];
                }        
            }
        });

        // clear undefined main enemies from array
        enemies = enemies.filter(item => item !== undefined);
        return collided;
    }

}
