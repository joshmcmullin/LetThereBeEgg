// level variables
var levelCounter = 0;
var levelStatus = false;
var level;

class Level{
    constructor(yellowSpawnRate, orangeSpawnRate, redSpawnRate, levelTime, levelStatus){
        this.yellowSpawnRate = yellowSpawnRate;
        this.orangeSpawnRate = orangeSpawnRate;
        this.redSpawnRate = redSpawnRate;
        this.time = levelTime;
        this.status = levelStatus;
    }

    setEnemies(){
        // set timer to make a new enemy every 1 seconds
        var yellowEnemyInterval = setInterval(makeYellowEnemy, this.yellowSpawnRate);
        // set timer to make new orange enemy every 5 seconds;
        var orangeEnemyInterval = setInterval(makeOrangeEnemy, this.orangeSpawnRate);
        // set timer to make new red enemy every 10 seconds;
        var redEnemyInterval = setInterval(makeRedEnemy, this.redSpawnRate);
        this.status = true;
    }
    
}