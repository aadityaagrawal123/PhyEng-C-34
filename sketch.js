
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var engine, world, backgroundImg;
var boat, boatImg, helicopter, helicopterImg; 
var ground;
var rope1, rope2; 
var food, foodImg, medicine, medicineImg;
food_con, medicine_con;
var wallR, wallL;
var time = 950;

function preload (){
  backgroundImg = loadImage("background.gif");
  boatImg = loadImage("boat.gif");
  helicopterImg = loadImage("helicopter.gif");
  foodImg =  loadImage("Food.png");
  medicineImg = loadImage("Medicine.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  engine = Engine.create();
  world = engine.world;   

  var Boptions = {
    isStatic : false
  }
  boat = Bodies.rectangle(width/2.5, height/1.65, 325, 275, Boptions);
  World.add(world, boat)

  var Hoption = {
    isStatic : true
  }
  helicopter = Bodies.rectangle(width/3, -121, 500, 320, Hoption);
  World.add(world, helicopter);

  ground = new Ground(width/2,height/1.18,width,0.05);

  rope1 = new Rope(6,{x:width/1.8 ,y: height/5.89});
  rope2 = new Rope(6,{x:width/1.98 ,y: height/5.89});

  wallL =  new Ground(width/300, height/2, 0.05, height);
  wallR =  new Ground(width/1.2, height/2, 0.05, height);

  medicine = Bodies.rectangle(width/1.9, height/3.8, 50, 40, Boptions);
  Matter.Composite.add(rope1.body, medicine);
  
 food = Bodies.rectangle(width/2.1, height/4, 40, 60, Boptions);
 Matter.Composite.add(rope2.body, food);
 
 food_con = new Link(rope2,food);
 medicine_con = new Link(rope1,medicine);

  button = createImg('leftArrow.png');
  button.position(width/1.1,height/1.1);
  button.size(50,50);
  button.mouseClicked(moveLeft);

 button2 = createImg('rightArrow.png');
 button2.position(width/1.05,height/1.1);
 button2.size(50,50);
 button2.mouseClicked(moveRight);

 button3 = createImg('up.png');
 button3.position(width/1.075,height/1.18);
 button3.size(50,50);
 button3.mouseClicked(moveUp);
  
}


function draw() 
{
  background(51);

  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  if(helicopter!=null){
    image(helicopterImg,helicopter.position.x,helicopter.position.y,500,320);
  }

if (frameCount % -1.1) {
time = time-1
}

  rope1.show ()
 rope2.show ()
  ground.show ()
  wallL.show()
  wallR.show()

  if(food!=null){
    image(foodImg,food.position.x,food.position.y,90,115); 
  }
  if(medicine!=null){
    image(medicineImg,medicine.position.x,medicine.position.y,95,90); 
  }
  image(boatImg,boat.position.x,boat.position.y,325,275); 
  
  fill("#FFFF");
  textAlign("center");
  textSize(27);
  text("Time remaining: " + time + "ms", width /1.12, height/12);

  drawSprites();

}
function moveRight () {
boat.position.x = boat.position.x + 2;
}
function moveLeft () {
 boat.position.x = boat.position.x - 2;
}
function moveUp () {
  if (boat.position.y > width- 1110){
  boat.position.y = boat.position.y - 2.5;
 }
}