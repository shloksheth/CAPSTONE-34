const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope3;

var bg_img;
var food;

var button,button2,button3;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;

var starImg, star1, star2;
var balloon, balloonImg;
var emptyStar, oneStar, stars;
var starDisplay;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  bunny = loadImage('racoon.png');
  starImg = loadImage("star.png");

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  emptyStar = loadAnimation("empty.png");
  oneStar = loadAnimation("one_star.png");
  stars = loadAnimation("stars.png");

}

function setup() 
{
  createCanvas(600,700);
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cut_btn.png');
  button.position(180,90);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
  button2 = createImg('cut_btn.png');
  button2.position(390,90);
  button2.size(50,50);
  button2.mouseClicked(drop2);
 
  rope = new Rope(7,{x:button.x+20,y:90});
  rope2 = new Rope(7,{x:button2.x+20,y:90});

  star1 = createSprite(320,50,20,20)
  star1.addImage("star",starImg);
  star1.scale = 0.018

  star2 = createSprite(50,370,20,20)
  star2.addImage("star",starImg);
  star2.scale = 0.018

  mute_btn = createImg('mute.png');
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  ground = new Ground(250,height,width,20);

  bunny = createSprite(120,620,100,100);
  bunny.scale = 0.2;

  balloon = createImg('baloon2.png');
  balloon.position(260,370);
  balloon.size(95,120);
  balloon.mouseClicked(airblow);

  starDisplay = createSprite(70,30,30,30);
  starDisplay.scale = 0.2
  starDisplay.addAnimation("empty",emptyStar);
  starDisplay.addAnimation("oneStar",oneStar);
  starDisplay.addAnimation("allStars",stars);
  starDisplay.changeAnimation("empty");

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    World.remove(engine.world,fruit);
    fruit = null;
    eating_sound.play();
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    bk_song.stop();
    sad_sound.play();
    fruit=null;
   }
  
    
  if (collide(fruit,star1,20)==true){
    star1.visible = false
    starDisplay.changeAnimation("oneStar");
  }
  if (collide(fruit,star2,20)==true && star1.visible == false){
    star2.visible = false
    starDisplay.changeAnimation("allStars");
  }
  if (collide(fruit,star2,20)==true && star1.visible == true){
    star2.visible = false
    starDisplay.changeAnimation("oneStar");
  }
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null;
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}

function airblow()
{
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0,y:-0.03});
  air.play();
}

