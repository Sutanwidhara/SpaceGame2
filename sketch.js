var backgroundImage , backgroundsp;
var spaceshipImage , spaceship;
var cometImage , comet;
var cometGroup ;
var gameState = "play";
var coinImage , coin , coinGroup ;
var score = 0 ;

function preload() {
backgroundImage = loadImage("./Assets/Spacebackgroundnew.jpg");
spaceshipImage = loadImage("./Assets/spaceship.png");
cometImage = loadImage("./Assets/comet.png");
coinImage = loadImage("./Assets/coin.png");
}

function setup() {
  canvas = createCanvas(windowWidth - 30 , windowHeight - 30);
  backgroundsp = createSprite( width/2 , height/2 );
  backgroundsp.addImage("space",backgroundImage);
  backgroundsp.velocityY = 2 ;


  spaceship = createSprite( width/2 , height - 100);
  spaceship.addImage("spaceship",spaceshipImage);
  spaceship.scale = 0.4 ;
  
  cometGroup=new Group();
  coinGroup=new Group();
}

function draw() {
  background(15,17,74);
  
  fill("white");
  fontSize : 20;
  text("score :" + score, 50 , 50 );
  
  if(gameState === "play"){
    if(backgroundsp.y>height){
      backgroundsp.y = height/2
    }

    if(keyDown("left")){
      spaceship.x = spaceship.x-5;
    }
  
    if(keyDown("right")){
      spaceship.x = spaceship.x+5;
    }
  
    if(keyDown("up")){
      spaceship.y = spaceship.y-5;
    }
  
    if(keyDown("down")){
      spaceship.y = spaceship.y+5;
    }
    
    if(spaceship.isTouching(cometGroup)){
      console.log("game ended");
      gameState = "end";
    }
    
    if(spaceship.isTouching(coinGroup)){
      score = score + 5 ;
      coinGroup.destroyEach();
    }
    
    
    
    spawnComet();
    spawnCoin();
  

  
  
  }

  if(gameState === "end"){
    background(15,17,74);
    fill("white");
    text("Game end",width/2 , height/2);
    cometGroup.destroyEach();
    spaceship.destroy();
    backgroundsp.destroy();
  }

  drawSprites();
  }

  function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
 
function spawnComet(){
  if(frameCount % 100 == 0 ){
    comet = createSprite( random( 50 , width-50) , 0 );
    comet.addImage("comet",cometImage);
    comet.velocityY = 3;
    comet.scale = 0.1;
    cometGroup.add(comet);
  }
  
}

function spawnCoin(){
  if(frameCount % 200 == 0){
    coin = createSprite(random(60 , width - 30), 0);
    coin.addImage("coin",coinImage);
    coin.velocityY = 4;
    coin.scale = 0.1;
    coinGroup.add(coin);
  }
}