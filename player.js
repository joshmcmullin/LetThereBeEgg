
// player animation variables
// right timer variables
var rightWalkCounter = 0;
var rightWalkGetDate = true;
var rightCreateDateTimeout = true;
// left timer variables
var leftWalkCounter = 0;
var leftWalkGetDate = true;
var leftCreateDateTimeout = true;
// up timer variables
var upWalkCounter = 0;
var upWalkGetDate = true;
var upCreateDateTimeout = true;
// standing still images
var playerNeutralImage = new Image();
playerNeutralImage.src = "images/playerImages/PlayerNeutral.png";
// walking sprite sheet
var playerWalkingSpriteSheet = new Image();
playerWalkingSpriteSheet.src = "images/playerImages/playerWalkingAnimationSheet.png";

class Player{
    constructor(playerX, playerY, playerWidth, playerHeight, playerSpeed, playerHealth, playerMaxHealth, playerDamage, playerAttackSpeed, playerRange, playerDamaged) {
        this.x = playerX;
        this.y = playerY;
        this.width = playerWidth;
        this.height = playerHeight;
        this.speed = playerSpeed;
        this.health = playerHealth;
        this.maxHealth = playerMaxHealth;
        this.damage = playerDamage;
        this.attackSpeed = playerAttackSpeed;
        this.range = playerRange;
        this.status = playerDamaged;
    }

    // draws character animations
    draw(){
        // begin character walking right animations
        if (rightPressed){            
            if (rightWalkGetDate){
                rightWalkCounter = Date.now();
                rightWalkGetDate = false;
            }
            // don't allow start of animation to reset until a full cycle is completed (0.8 seconds)
            if (rightCreateDateTimeout){
                rightCreateDateTimeout = false;
                var newDateTimeout = setTimeout(() => {
                    rightWalkGetDate = true;
                    rightCreateDateTimeout = true;
                }, 800);
            }
            // check which character walking animation should be used
            if (rightWalkCounter + 100 > Date.now()){
                ctx.drawImage(playerWalkingSpriteSheet, 2, 0, 48, 68, this.x, this.y, 48, 68);
            } else if (rightWalkCounter + 200 > Date.now()){
                ctx.drawImage(playerWalkingSpriteSheet, 52, 0, 48, 68, this.x, this.y, 48, 68);
            } else if (rightWalkCounter + 300 > Date.now()){
               ctx.drawImage(playerWalkingSpriteSheet, 102, 0, 48, 68, this.x, this.y, 48, 68);
            } else if (rightWalkCounter + 400 > Date.now()){
               ctx.drawImage(playerWalkingSpriteSheet, 152, 0, 48, 68, this.x, this.y, 48, 68);
            } else if (rightWalkCounter + 500 > Date.now()){
               ctx.drawImage(playerWalkingSpriteSheet, 202, 0, 48, 68, this.x, this.y, 48, 68);
            } else if (rightWalkCounter + 600 > Date.now()){
               ctx.drawImage(playerWalkingSpriteSheet, 252, 0, 48, 68, this.x, this.y, 48, 68);
            } else if (rightWalkCounter + 700 > Date.now()){
               ctx.drawImage(playerWalkingSpriteSheet, 302, 0, 48, 68, this.x, this.y, 48, 68);
            } else if (rightWalkCounter + 800 > Date.now()){
               ctx.drawImage(playerWalkingSpriteSheet, 152, 0, 48, 68, this.x, this.y, 48, 68);
            } else {
               ctx.drawImage(playerWalkingSpriteSheet, 2, 0, 48, 68, this.x, this.y, 48, 68);
            }

        // begin character left walking animations
        } else if (leftPressed){
            if (leftWalkGetDate){
                leftWalkCounter = Date.now();
                leftWalkGetDate = false;
            }
            // don't allow start of animation to reset until a full cycle is completed (0.8 seconds)
            if (leftCreateDateTimeout){
                leftCreateDateTimeout = false;
                var newDateTimeout = setTimeout(() => {
                    leftWalkGetDate = true;
                    leftCreateDateTimeout = true;
                }, 800);
            }
            // check which character walking animation should be used
            if (leftWalkCounter + 100 > Date.now()){
                ctx.drawImage(playerWalkingSpriteSheet, 2, 70, 48, 68, this.x, this.y, 48, 68);
            } else if (leftWalkCounter + 200 > Date.now()){
                ctx.drawImage(playerWalkingSpriteSheet, 52, 70, 48, 68, this.x, this.y, 48, 68);
            } else if (leftWalkCounter + 300 > Date.now()){
                ctx.drawImage(playerWalkingSpriteSheet, 102, 70, 48, 68, this.x, this.y, 48, 68);
            } else if (leftWalkCounter + 400 > Date.now()){
                ctx.drawImage(playerWalkingSpriteSheet, 152, 70, 48, 68, this.x, this.y, 48, 68);
            } else if (leftWalkCounter + 500 > Date.now()){
                ctx.drawImage(playerWalkingSpriteSheet, 202, 70, 48, 68, this.x, this.y, 48, 68);
            } else if (leftWalkCounter + 600 > Date.now()){
                ctx.drawImage(playerWalkingSpriteSheet, 252, 70, 48, 68, this.x, this.y, 48, 68);
            } else if (leftWalkCounter + 700 > Date.now()){
                ctx.drawImage(playerWalkingSpriteSheet, 302, 70, 48, 68, this.x, this.y, 48, 68);
            } else if (leftWalkCounter + 800 > Date.now()){
                ctx.drawImage(playerWalkingSpriteSheet, 152, 70, 48, 68, this.x, this.y, 48, 68);
            } else {
                ctx.drawImage(playerWalkingSpriteSheet, 2, 70, 48, 68, this.x, this.y, 48, 68);
            }
        } else if (upPressed){
            if (upWalkGetDate){
                upWalkCounter = Date.now();
                upWalkGetDate = false;
            }
            // don't allow start of animation to reset until a full cycle is completed (0.8 seconds)
            if (upCreateDateTimeout){
                upCreateDateTimeout = false;
                var newDateTimeout = setTimeout(() => {
                    upWalkGetDate = true;
                    upCreateDateTimeout = true;
                }, 800);
            }
            // check which character walking animation should be used
            if (upWalkCounter + 100 > Date.now()){
                ctx.drawImage(playerWalkingSpriteSheet, 2, 140, 48, 68, this.x, this.y, 48, 68);
            } else if (upWalkCounter + 200 > Date.now()){
                ctx.drawImage(playerWalkingSpriteSheet, 52, 140, 48, 68, this.x, this.y, 48, 68);
            } else if (upWalkCounter + 300 > Date.now()){
                ctx.drawImage(playerWalkingSpriteSheet, 102, 140, 48, 68, this.x, this.y, 48, 68);
            } else if (upWalkCounter + 400 > Date.now()){
                ctx.drawImage(playerWalkingSpriteSheet, 152, 140, 48, 68, this.x, this.y, 48, 68);
            } else if (upWalkCounter + 500 > Date.now()){
                ctx.drawImage(playerWalkingSpriteSheet, 202, 140, 48, 68, this.x, this.y, 48, 68);
            } else if (upWalkCounter + 600 > Date.now()){
                ctx.drawImage(playerWalkingSpriteSheet, 252, 140, 48, 68, this.x, this.y, 48, 68);
            } else if (upWalkCounter + 700 > Date.now()){
                ctx.drawImage(playerWalkingSpriteSheet, 302, 140, 48, 68, this.x, this.y, 48, 68);
            } else if (upWalkCounter + 800 > Date.now()){
                ctx.drawImage(playerWalkingSpriteSheet, 152, 140, 48, 68, this.x, this.y, 48, 68);
            } else {
                ctx.drawImage(playerWalkingSpriteSheet, 2, 140, 48, 68, this.x, this.y, 48, 68);
            }
        } else {
            ctx.drawImage(playerNeutralImage, this.x, this.y);
        }
        
    }

    rangeIndicator(){
        ctx.beginPath();
        ctx.ellipse(this.x + (this.width / 2), this.y + (this.height / 2), this.range, this.range, 0, 0, Math.PI * 2);
        ctx.setLineDash([10, 10]);
        ctx.stroke();
    }

    drawHealthBar(){
        ctx.setLineDash([0, 0]);
        ctx.fillStyle = "red";
        ctx.fillRect(15, 15, 150, 30);
        ctx.fillStyle = "green";
        if (this.health > 0) {
            ctx.fillRect(15, 15, (150 * (this.health / this.maxHealth)), 30);
        } else if (this.health <= 0) {
            ctx.fillStyle = "red";
            ctx.fillRect(15, 15, 150, 30);
        }
        ctx.fillStyle = "black";
        ctx.strokeRect(15, 15, 150, 30);
        ctx.font = "26px Arial";
        var healthDisplay = this.health + "/" + this.maxHealth;
        if (this.health <= 0){
            healthDisplay = 0 + "/" + this.maxHealth;
        }
        ctx.fillText(healthDisplay, 50, 40);
    }

    move(){     
        // Checks if camera is at either the left or right edges of the map. If so, allows typical player movement.     
        if (rightPressed && camera.clipX >= (mapWidth - cameraViewWidth - 1)){
            this.x = Math.min(this.x + this.speed, canvas.width - this.width - 50);
        } else if (rightPressed && this.x < playerX){
            this.x = Math.min(this.x + this.speed, canvas.width - this.width - 50);
        } else if (leftPressed && camera.clipX <= 0){
            this.x = Math.max(this.x - this.speed, 50);
        } else if (leftPressed && this.x > playerX){
            this.x = Math.max(this.x - this.speed, 50);
        }
        // Checks if camera is at either the top or bottom edges of the map. If so, allows typical player movement.
        if (upPressed && camera.clipY <= 0){
            this.y = Math.max(this.y - this.speed, 50); 
        } else if (upPressed && this.y > playerY){
            this.y = Math.max(this.y - this.speed, 50); 
        } else if (downPressed && camera.clipY >= (mapHeight - cameraViewHeight + 320)){    
            this.y = Math.min(this.y + this.speed, canvas.height - this.height - 50);
        } else if (downPressed && this.y < playerY){
            this.y = Math.min(this.y + this.speed, canvas.height - this.height - 50);
        }
    }

    // using distance formula to determine closest target
    determineTarget(){
        var self = this;
        var targetEnemy;
        var targetEnemyDistance = 10000;       
        var enemyDistance = 0;
        enemies.forEach(function(enemy, i){
            enemyDistance = Math.sqrt(Math.pow(((enemy.x - enemy.width / 2) - (self.x - self.width / 2)), 2) + Math.pow(((enemy.y - enemy.height / 2) - (self.y - self.height / 2)), 2));
            if (targetEnemyDistance > enemyDistance){
                targetEnemyDistance = enemyDistance;
                targetEnemy = enemy;
            }
        });
        return targetEnemy;
             
    }

}