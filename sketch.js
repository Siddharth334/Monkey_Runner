
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var survival_Time = 0,score = 0;
var ground;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  
}



function setup() {
  createCanvas(600,400);
  monkey = createSprite(50,350,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(300,395,600,10);

  obstacleGroup = new Group();
  FoodGroup = new Group();

}


function draw() {
  background(225);
  text("Survival Time :"+ survival_Time,300,50);
  survival_Time = survival_Time + Math.round(frameCount/60);
  text("score :"+score,200,50);
  monkey.collide(ground);
  if(keyDown("space") && monkey.y>300){
    monkey.velocityY = -13;
   
  }
   monkey.velocityY = monkey.velocityY+0.8;
  
  
  if(monkey.isTouching(obstacleGroup)){
    text("GAME OVER",250,200); 
    obstacleGroup.destroy(); 
    FoodGroup.destroy(); 
    monkey.destroy();
    obstacle.velocityX = 0;
    banana.velocityX = 0;
    
  }
  
  spawnBananas();
  spawnObstacles();
  drawSprites();
  
}

function spawnObstacles(){
  
 if(frameCount % 80 === 0) {
    var obstacle = createSprite(600,365,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + survival_Time/1000);
    
    //generate random obstacles
    
    
   obstacle.addImage("obstacle",obstacleImage);
   obstacle.scale = 0.1;
   obstacle.lifetime = 300;       
   obstacleGroup.add(obstacle);
   
  
 
 
 }
    
  
  
  
  
  
  
  
}

function spawnBananas(){
  if (frameCount % 80 === 0) {
    var banana = createSprite(500,200,40,10);
    
    banana.addImage("banana",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -(5 + survival_Time/1000);
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    
    //add each cloud to the group
    FoodGroup.add(banana);
 
  if(monkey.isTouching(FoodGroup)){
    score = score+1;
    FoodGroup.destroyEach(); 
  }
  
  
  
  }
  
  
  
  
  
  
}


