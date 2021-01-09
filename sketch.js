const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var engine, world; 
var plinkos = [];
var divisions = [];
var divisionHeight = 300;
var score = 0;
var particle;
var count = 0;
var gameState = "play";
var bg_img;
var turn = 0;
function preload() {
  bg_img = loadImage("bg img.jpeg");
}
function setup() {
  createCanvas(800, 800);

  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width / 2, height, width, 20);
  for (var k = 5; k <= width; k = k + 80) {
    divisions.push(new Divisions(k, height - divisionHeight / 2, 10, divisionHeight));
  }

  for (var j = 75; j <= width; j = j + 50) {

    plinkos.push(new Plinko(j, 75));
  }

  for (var j = 20; j <= width - 10; j = j + 50) {

    plinkos.push(new Plinko(j, 175));
  }

  for (var j = 75; j <= width; j = j + 50) {

    plinkos.push(new Plinko(j, 275));
  }

  for (var j = 20; j <= width - 10; j = j + 50) {

    plinkos.push(new Plinko(j, 375));
  }
  Engine.run(engine);
}
function draw() {
  Engine.update(engine);
  background(bg_img);
  fill("white")
  textSize(30);
  text("500", 10, 550);
  text("500", 90, 550);
  text("500", 170, 550);
  text("500", 250, 550);
  text("100", 330, 550);
  text("100", 410, 550);
  text("100", 490, 550);
  text("200", 570, 550);
  text("200", 650, 550);
  text("200", 730, 550);
  push();
  fill("white");
  textSize(30);
  text("Score : " + score, 10, 40);
  text("Turn : " + turn, 680, 40);
  pop();

  for (var i = 0; i < plinkos.length; i++) {

    plinkos[i].display();

  }
  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }
  if (particle != null) {
    particle.display();
    if (particle.body.position.y > 760) {
      if (particle.body.position.x < 320) {
        score = score + 500;
        particle = null;
        if (count >= 5) { gameState = "end" };
      }
      else if (particle.body.position.x > 301 && particle.body.position.x < 550) {
        score = score + 100;
        particle = null;
        if (count >= 5) { gameState = "end" };
      }
      else if (particle.body.position.x > 561 && particle.body.position.x < 750) {
        score = score + 200;
        particle = null;
        if (count >= 5) { gameState = "end" };


      }
    }



  }
  if (count >= 5) {
    gameState = "end";
    fill("cyan")
    textSize(75);
    text("GAME OVER!!", 200, 250);
  }




}



function mousePressed() {
  if (gameState !== "end") {
    turn = turn + 1;
    particle = new Particle(mouseX, 15, 15, 10);
    count++;
  }
}
