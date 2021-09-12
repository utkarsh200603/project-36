var dog,sadDog,happyDog;
var buttonFeed,buttonAdd;
var feedObj;
var database;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database=firebase.database()
  createCanvas(1000,400);
  foodObj= new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  buttonFeed=createButton("feed the dog");
  buttonFeed.position(700,95);
  buttonFeed.mousePressed(feedDog);

  buttonAdd=createButton("add food to stock");
  buttonAdd.postion(800,95);
  buttonAdd.mousePressed(addFood);
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

}

function draw() {
  background(46,139,87);
  drawSprites();
  foodObj.display();
}

//function to read food Stock
function readStock(data){
  foods=data.val();
  foodObj.updateFoodStock(foods)
}

//function to update food stock and last fed time
  function feedDog(){
    dog.addImage(happydog);

    if(foodObj.getFoodStock()<=0){
      foodObj.upadateFoodStock(foodObj.getFoodStock()*0);
    }else{
      foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    }
    database.ref('/').update({
      food:foodObj.getFoodStock(),
      feedTime:hour()
    })

  }

//function to add food in stock
function addFoods(){
  foodS++;
  databse.ref('/').update({
    food:foodS
  })
}