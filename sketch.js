var dog, happyDog, dogImage, happyDogImage; 
var database; 
var foodS, foodStock;  


function preload()
{
  dogImage = loadImage("images/dog.png"); 
  happyDogImage = loadImage("images/dog1.png");
}

function setup() {
	createCanvas(500, 500);
  
  dog = createSprite(250,250,20,20); 
  dog.addImage("dog", dogImage); 
  dog.scale = 0.5; 

  database = firebase.database(); 

  foodStock = database.ref('Food'); 
  foodStock.on("value", readStock); 


}


function draw() {  
  background(46, 139, 87)

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS); 
    dog.addImage("dog",happyDogImage); 
  }

  drawSprites();

  textSize(20); 
  fill("black"); 
  stroke(20); 
  text("NOTE : Press the up arrow key to feed Drago milk :)", 50, 300); 
  text("Food Remaining :" + foodS, 50, 400); 
}

function readStock(data) {
  foodS = data.val(); 
}

function writeStock(x) {
  if(x<=0) 
  x = 0;
  else 
  x = x - 1; 
  database.ref('/').update({
    Food : x
  })
}
