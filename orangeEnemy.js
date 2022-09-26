const orangeEnemyHeight = 32;
const orangeEnemyWidth = 32;
let orangeEnemySpeed = 1.5;
let orangeEnemyHealth = 5;
let orangeEnemyHealthCheck = orangeEnemyHealth;
let orangeEnemyDamage = 0;
var orangeEnemyAttackStatus = false;

class OrangeEnemy{
    constructor(orangeEnemyX, orangeEnemyY, orangeEnemyWidth, orangeEnemyHeight, orangeEnemySpeed, orangeEnemyHealth, orangeEnemyHealthCheck, orangeEnemyDamage, orangeEnemyAttackStatus) {
        this.x = orangeEnemyX;
        this.y = orangeEnemyY;
        this.width = orangeEnemyWidth;
        this.height = orangeEnemyHeight;
        this.speed = orangeEnemySpeed;
        this.health = orangeEnemyHealth;
        this.healthCheck = orangeEnemyHealthCheck;
        this.damage = orangeEnemyDamage;
        this.attackStatus = orangeEnemyAttackStatus;
    }

    draw(){
        ctx.fillStyle = "orange";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move(){
        var orangeEnemyMovement = Math.sqrt(Math.pow(((player.x - player.width / 2) - (this.x - this.width / 2)), 2) + Math.pow(((player.y - player.height / 2) - (this.y - this.height / 2)), 2)); 
        this.x += ((player.x - this.x) / orangeEnemyMovement) * this.speed;
        this.y += ((player.y - this.y) / orangeEnemyMovement) * this.speed;
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
            var orangeEnemyAttackTimer = setTimeout(() => {
                this.attackStatus = false
            }, 1000);
       }
    }
}