var PLAY = 1;
var END = 0;
var START = 2
var gmaeState = PLAY
var gameState = START;



var monkey, monkey_running
var monkey, monkey_back
var banana, bananaImage, obstacle, obstacleImage, ground, groundImage, monkImage;
var Button, ButtonImage;
var start, startImage;
var FoodGroup, obstacleGroup
var monkeySound;
var score = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  monkey_back = loadAnimation("sprite_8.png", "sprite_7.png", "sprite_6.png", "sprite_5.png", "sprite_4.png", "sprite_3.png", "sprite_2.png", "sprite_1.png", "sprite_0.png");

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  groundImage = loadImage("ground1.jpg");
  monkImage = loadImage("sprite_7.png")

  startImage = loadImage("st1.png");
  buttonImage = loadImage("button1.png");

  jumpSound = loadSound("jump2.mp3");

  bananaSound = loadSound("banana.mp3");

  gameoverSound = loadSound("gameover2.mp3");

}



function setup() {
  createCanvas(500, 300);

  ground = createSprite(250, 150);
  ground.addImage(groundImage)
  ground.velocityX = -4
  ground.scale = 1.5;

  monkey = createSprite(10, 200);
  monkey.addAnimation("running", monkey_running);
  monkey.addImage(monkImage)
  monkey.scale = 0.1;

  invisibleGround = createSprite(250, 230, 500, 10);
  invisibleGround.visible = false;

  bananaGroup = new Group();
  stoneGroup = new Group();

}


function draw() {
  background(1000);

  console.log(monkey.y);

  if (gameState === START) {
    ground.velocityX = 0;
    monkey.velocityX = 5;

    if (monkey.x > 500) {
      monkey.x = 0;

      monkey.velocityX = 0

      monkey.visible = false;

      gameState = PLAY;

    }


  }

  if (keyDown("r")) {

    gameState = PLAY;

    stoneGroup.destroyEach();

    bananaGroup.destroyEach();

    monkey.velocityY = 0;

    ground.velocityX = 0

    monkey.velocityX = 0;

    score = 0


    monkey.visible = true;

  } else if (gameState === PLAY) {



    monkey.visible = true;

    monkey.x = 35

    monkey.velocityX = 3

    ground.velocityX = -5

    monkey.collide(invisibleGround);
    spawnstone();
    spawnbanana();

    if (monkey.x > 100) {

      monkey.velocityX = 0

    }

    if ((touches.length > 0 || keyDown("SPACE")) && monkey.y >= height - 110) {
      monkey.velocityY = -15;

      jumpSound.play();

      touches = [];

    }

    if (bananaGroup.isTouching(monkey)) {

      bananaGroup.destroyEach();

      bananaSound.play();

      score = score + 5;

    }





    monkey.velocityY = monkey.velocityY + 1


    if (stoneGroup.isTouching(monkey)) {


      stoneGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);
      ground.velocityX = 0;

      bananaGroup.destroyEach();


      gameoverSound.play();



      gameState = END;

    }

    if (ground.x < 0) {
      ground.x = ground.width / 2;

    }
  } else if (gameState === END) {

    stoneGroup.destroyEach()
    ground.velocityX = 0;
    monkey.velocityY = 0;
    monkey.velocityX = 0;
    bananaGroup.destroyEach();

    monkey.visible = false;

  }
  // createEdgeSprites();

  // stoneGroup.bounceOff(monkey);

  drawSprites();

  fill(10);
  textSize(20)
  text("BANANA = " + score, 200, 25);

}

function spawnstone() {
  if (frameCount % 200 === 0) {
    var stone = createSprite(500, 210, 40, 10);
    stone.y = 210;
    stone.addImage(obstaceImage);
    stone.scale = 0.09;
    stone.velocityX = -5;


    stone.lifetime = 150;


    stone.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;


    stoneGroup.add(stone);
  }
}

function spawnbanana() {

  if (frameCount % 110 === 10) {
    var banana = createSprite(500, 100, 40, 10);
    banana.y = Math.round(random(198, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.07;
    banana.velocityX = -4;


    banana.lifetime = 200;


    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;


    bananaGroup.add(banana);
  }

}