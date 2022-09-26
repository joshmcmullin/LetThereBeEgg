const yellowEnemyHeight = 32;
const yellowEnemyWidth = 32;
let yellowEnemySpeed = 1;
let yellowEnemyHealth = 5;
let yellowEnemyHealthCheck = yellowEnemyHealth;
let yellowEnemyDamage = 0;
var yellowEnemyAttackStatus = false;

class YellowEnemy{
    constructor(yellowEnemyX, yellowEnemyY, yellowEnemyWidth, yellowEnemyHeight, yellowEnemySpeed, yellowEnemyHealth, yellowEnemyHealthCheck, yellowEnemyDamage, yellowEnemyAttackStatus) {
        this.x = yellowEnemyX;
        this.y = yellowEnemyY;
        this.width = yellowEnemyWidth;
        this.height = yellowEnemyHeight;
        this.speed = yellowEnemySpeed;
        this.health = yellowEnemyHealth;
        this.healthCheck = yellowEnemyHealthCheck;
        this.damage = yellowEnemyDamage;
        this.attackStatus = yellowEnemyAttackStatus;
    }

    draw(){
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move(){
        var yellowEnemyMovement = Math.sqrt(Math.pow(((player.x - player.width / 2) - (this.x - this.width / 2)), 2) + Math.pow(((player.y - player.height / 2) - (this.y - this.height / 2)), 2)); 
        this.x += ((player.x - this.x) / yellowEnemyMovement) * this.speed;
        this.y += ((player.y - this.y) / yellowEnemyMovement) * this.speed; 
        // checks x axis to see if player is centered. If player is centered, the player speed is inversely applied to the enemy to give the illusion of player movement.
        // checks within a range of -3 pixels +3 pixels because I the player's position is varying slightly *sometimes* for some reason
        if (player.x >= (playerX - 3) && player.x <= (playerX + 3)){
            if (rightPressed){
                this.x = Math.min(this.x - player.speed);
            } else if (leftPressed){
                this.x = Math.max(this.x + player.speed);
            }
        }
        // checks y axis to see if player is centered. If player is centered, the player speed is inversely applied to the enemy to give the illusion of player movement.
        // checks within a range of -3 pixels +3 pixels because I the player's position is varying slightly *sometimes* for some reason
        if (player.y >= (playerY - 3) && player.y <= (playerY + 3)){
            if (upPressed){
                this.y = Math.max(this.y + player.speed);
            } else if (downPressed){    
                this.y = Math.min(this.y - player.speed);
            }
        }       
    }

    hitPlayer(){
        if (this.x + this.width >= player.x && this.x <= player.x + player.width && 
        this.y + this.height >= player.y && this.y <= player.y + player.height && this.attackStatus === false){
            player.health -= this.damage;
            this.attackStatus = true;
            //console.log("Damaged! Player health is: " + player.health);
            var yellowEnemyAttackTimer = setTimeout(() => {
                this.attackStatus = false
            }, 1000);
       }
    }
}