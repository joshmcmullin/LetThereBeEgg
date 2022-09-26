// declare canvas & variable to store 2D rendering context
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// declare useful variables
var mapWidth = 1920;
var mapHeight = 1920;
var cameraViewWidth = 960;
var cameraViewHeight = 960;
var gameStarted = false;

// arrays
var bullets = [];
var enemies = [];

// Create player
const playerHeight = 68;
const playerWidth = 48;
var playerX = (canvas.width - playerWidth) / 2;
var playerY = (canvas.height - playerHeight) / 2;
var playerSpeed = 3;
var playerHealth = 10;
var playerMaxHealth = 10;
var playerDamage = 1.0; // 1.0 is baseline, 2.0 is 100% increase in damage, etc.
var playerAttackSpeed = 1.0; // 2.0 is 100% increase, 2.5 is 250% increase, 3.5 is 250% increase, etc.
var playerRange = 200;
var playerDamaged = false;
var displayRangeIndicator = false;
player = new Player(playerX, playerY, playerWidth, playerHeight, playerSpeed, playerHealth, playerMaxHealth, playerDamage, playerAttackSpeed, playerRange, playerDamaged);

// camera variables
var backgroundImage = new Image();
backgroundImage.src = "images//backgroundImages/Background.png";
var clipX = 0;
var clipY = 0;
var clipWidth = cameraViewWidth;
var clipHeight = cameraViewHeight;
var cameraX = 0;
var cameraY = 0;
var cameraWidth = cameraViewWidth;
var cameraHeight = cameraViewHeight;
camera = new Camera(backgroundImage, clipX, clipY, clipWidth, clipHeight, cameraX, cameraY, cameraWidth, cameraHeight);

// additional bullet variables
var bulletLoaded = false;
var enemyDistance = 0;
var firstShotDate = 0;
var secondShotDate = 0;
var bulletImage = new Image();
bulletImage.src = "images/bulletImages/Bullet2.png"

// control & movement variables
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let shootPressed = false;

// Make Bullets
function makeBullet(){
  // stops bullet from drawing if no enemies are on screen or if enemies are out of range
  if (enemies.length > 0){ 
    const bulletSize = 20;
    var bulletXpos = player.x + (player.width / 2) - bulletSize;
    var bulletYpos = player.y + (player.height / 2) - bulletSize;
    var bulletSpeed = 15;
    var bulletDamage = 5;
    // fetches & saves target enemy position for stable bullet trajectory
    var bulletTargetX = player.determineTarget().x;
    var bulletTargetY = player.determineTarget().y;
    // fetches & saves current player position for stable bullet trajectory
    var bulletStartingX = player.x;
    var bulletStartingY = player.y;
    // computes distance directly from player to enemy & allows player to attack if enemy is within attack range
    enemyDistance = Math.sqrt(Math.pow(((player.determineTarget().x - player.determineTarget().width / 2) - (player.x - player.width / 2)), 2) + Math.pow(((player.determineTarget().y - player.determineTarget().height / 2) - (player.y - player.height / 2)), 2));
    if (enemyDistance <= playerRange){
      var bullet = new Bullet(bulletXpos, bulletYpos, bulletSize, bulletSize, bulletSpeed, bulletDamage, bulletStartingX, bulletStartingY, bulletTargetX, bulletTargetY);  
      bullets.push(bullet);
      lastBulletDate = Date.now();
    } 
  }  
}

// starts game
function startGame(){
  gameStarted = true;
  document.getElementById("main-menu").style.display = "none";
}

// selects level
function levelSelectScreen(){

}

// Make Yellow Enemies
function makeYellowEnemy(){  
  var yellowEnemy = new YellowEnemy(Math.floor(Math.random() * (canvas.width - 32)), Math.floor(Math.random() * (canvas.height - 32)), yellowEnemyWidth, yellowEnemyHeight, yellowEnemySpeed, yellowEnemyHealth, yellowEnemyHealthCheck, yellowEnemyDamage, yellowEnemyAttackStatus);
  enemies.push(yellowEnemy);
}

// Make Orange Enemies
function makeOrangeEnemy(){  
  var orangeEnemy = new OrangeEnemy(Math.floor(Math.random() * (canvas.width - 32)), Math.floor(Math.random() * (canvas.height - 32)), orangeEnemyWidth, orangeEnemyHeight, orangeEnemySpeed, orangeEnemyHealth, orangeEnemyHealthCheck, orangeEnemyDamage, orangeEnemyAttackStatus);
  enemies.push(orangeEnemy);
}

// Make Red Enemies
function makeRedEnemy(){  
  var redEnemy = new RedEnemy(Math.floor(Math.random() * (canvas.width - 32)), Math.floor(Math.random() * (canvas.height - 32)), redEnemyWidth, redEnemyHeight, redEnemySpeed, redEnemyHealth, redEnemyHealthCheck, redEnemyDamage, redEnemyAttackStatus);
  enemies.push(redEnemy);
}

// make the spawns and level time increase based upon levelCounter, which will increment when the level is completed
function makeLevel(){
  var yellowSpawnRate = 10000;
  var orangeSpawnRate = 10000;
  var redSpawnRate = 10000;
  var levelTime = 60000;
  switch (levelCounter) {
    case 0:
      yellowSpawnRate = 3000;
      orangeSpawnRate = 999999; // don't allow orange spawns yet
      redSpawnRate = 999999; // don't allow red spawns yet
      levelTime = 20000;
      break;
    case 1:
      yellowSpawnRate = 2500;
      orangeSpawnRate = 999999; // don't allow orange spawns yet
      redSpawnRate = 999999; // don't allow red spawns yet
      levelTime = 25000;
      break;
    case 2:
      yellowSpawnRate = 3000;
      orangeSpawnRate = 4000;
      redSpawnRate = 999999; // don't allow red spawns yet
      levelTime = 30000;
      break;
    case 3:
      yellowSpawnRate = 3000;
      orangeSpawnRate = 3000;
      redSpawnRate = 999999; // don't allow red spawns yet
      levelTime = 40000;
      break;
    case 4:
      yellowSpawnRate = 2000;
      orangeSpawnRate = 2500;
      redSpawnRate = 999999; // don't allow red spawns yet
      levelTime = 50000;
      break;
    case 5:
      yellowSpawnRate = 3000;
      orangeSpawnRate = 3500;
      redSpawnRate = 7000;
      levelTime = 60000;
      break;
    case 6:
      yellowSpawnRate = 3000;
      orangeSpawnRate = 3500;
      redSpawnRate = 3500;
      levelTime = 60000;
      break;
  }
  level = new Level(yellowSpawnRate, orangeSpawnRate, redSpawnRate, levelTime, levelStatus);
}


// clear canvas & redraw
function mainLoop() {
  if (gameStarted){
    if (!levelStatus){
      makeLevel();
      level.setEnemies();
      levelCounter++;
      levelStatus = true;  
    }
    // only allow this if the player is alive
    if (player.health > 0){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      camera.move();
      camera.draw();
  
      // create bullets
      if (bullets.length > 0){
        bullets.forEach(function(bullet, i){         
          if (enemies.length > 0){          
            bullet.draw();     
            bullet.move();
          }      
  
          // check for bullets out of bounds & make them undefined
          if(bullet.outOfBounds() || bullet.hasCollided()){
            delete bullets[i];
          }      
        });
  
        // clear undefined bullets from array
        bullets = bullets.filter(item => item !== undefined);
      }
  
      // create main enemies
      if (enemies.length > 0){    
        enemies.forEach(function(enemy, i){
          enemy.draw();   
          enemy.move();
          enemy.hitPlayer();   
        });
      } 
  
      // draw & move player  
      player.draw(); 
      player.drawHealthBar(); 
      player.move();
      // display range indicator
      if (displayRangeIndicator){
        player.rangeIndicator();
      }
    }
  }
  

  // gameover screen
  if (player.health <= 0){
    ctx.fillStyle = "blue";
    ctx.fillText("Game Over!", canvas.width/2 - 60, 50);
  }
}


// event listeners for key presses
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key === "d"){
    rightPressed = true;
  } else if (e.key === "a"){
    leftPressed = true;
  } else if (e.key === "w"){
    upPressed = true;
  } else if (e.key === "s"){
    downPressed = true;
  } else if (e.key === "j"){
    displayRangeIndicator = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "d"){
    rightPressed = false;
  } else if (e.key === "a"){
    leftPressed = false;
  } else if (e.key === "w"){
    upPressed = false;
  } else if (e.key === "s"){
    downPressed = false;
  } else if (e.key === "j"){
    displayRangeIndicator = false;
  }
}


// set timer to draw every 10 milliseconds
const drawInterval = setInterval(mainLoop, 10);
// set variables for attack speed
var lastBulletDate = 0;
// set timer for attack speed. Checks every .05 seconds to make sure it's been long enough before launching a bullet.
var playerAttackSpeedInterval = setInterval(() => {
  if ((Date.now() - lastBulletDate) >= (1000 / player.attackSpeed)){
    makeBullet();
  }
}, 50);