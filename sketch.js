

//Referencia PRO C13 a  PRO C14
// Declara variables pasa los estados del juego 
var PLAY = 1;            
var END = 0;             
var gameState = PLAY;    

 

var trex, trex_running, trex_collided;       
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstacle, obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;                              


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");   
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");         
  obstacle2 = loadImage("obstacle2.png");         
  obstacle3 = loadImage("obstacle3.png");         
  obstacle4 = loadImage("obstacle4.png");         
  obstacle5 = loadImage("obstacle5.png");         
  obstacle6 = loadImage("obstacle6.png");        
  
  //Precargar la imágenes del Game Over y Restart
  gameOverImg = loadImage("gameOver.png");     
  restartImg = loadImage("restart.png");       
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);  
  trex.scale = 0.5;
  
  //Ver el área de Collisión (Probar parámetros)
  trex.setCollider("circle",0,0,40);     
   
  trex.debug = false;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);

  //Crea los Sprites del Game Over y de Restart
  gameOver=createSprite(300,80,100,40);      
  gameOver.addImage(gameOverImg);             
  
  restart=createSprite(300,110,100,40);     
  restart.addImage(restartImg);           
  
  
   //Hace menos grande las imágenes
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  

  //console.log("Hola"+ " "* "Mundo");                                
  
  score = 0;
  
  // Crea los grupos de Obstáculos y Nubes
  obstaclesGroup = new Group();      
  cloudsGroup = new Group();
   
  
}

function draw() {
  background(140);
  fill("white");          
  
  //Texto de Puntución se ve siempe
  text("Puntuación: "+ score, 500,50);      

  //Muestra el gameState
  console.log("Éste es el gameState",gameState)  
 
  
  //Condiciona actividades a los gameStates
  if(gameState === PLAY) {         
     
    //Se mueve mientras está en PLAY
    ground.velocityX = -4;    
    
    // Muestra el valor delScore, pero no el texto   
      score = score + Math.round(frameCount/60);   
    
    // Se reestablece el suelo, se mueve.
     if (ground.x < 0){              
    ground.x = ground.width/2;
     }
    //Trex se mueve en PLAY, no en END
    trex.velocityY = trex.velocityY + 0.8    
    
    //Aparece las nubes
    spawnClouds();                    
   
    //Aparecen los obstáculos
    spawnObstacles();                   
    
    
    //Si Trex toca obstaculos cambia a END en gameState
    if(obstaclesGroup.isTouching(trex)) {     
      gameState = END; 
    }     
  }   
  else if(gameState === END) {
    
    // Se detiene Suelo cuando el gameState es END
       ground.velocityX = 0;       
          
    // Detiene movimiento de los obstáculos 
      obstaclesGroup.setVelocityXEach(0);      
    
    // Ya no desaparecen los obtáculos
      obstaclesGroup.setLifetimeEach(-1);    
    
    // Se detiene el movimiento de las nubes
      cloudsGroup.setVelocityXEach(0);     
    
     // Ya no desaparecen los obtáculos cambiamos tiempo de vida
      cloudsGroup.setLifetimeEach(-1);    
    
    //Cambia la Animación del Trex cuando choca con obstáculos
      trex.changeAnimation("collided",trex_collided)   
    
    //Quita el movimiento del salto al Trex
      trex.velocityY = 0;                 
   
   }

  
  if(keyDown("space")&& trex.y>=140) {
    trex.velocityY = -13;
  }
  
  
  //Siempre Collisiona al Piso
  trex.collide(invisibleGround);    
  
  
  
  
  
  
  drawSprites();
}

function spawnObstacles(){         
 if (frameCount % 60 === 0){
   //var obstacle = createSprite(400,165,10,40);   
   var obstacle = createSprite(600,165,10,40);      
   obstacle.shapeColor= "green";                     
   obstacle.velocityX = -4;                     

   
    //Genera obstáculos al azar 
    var rand = Math.round(random(1,6));             
    switch(rand) {                                  
      case 1: obstacle.addImage(obstacle1);         
              break; 
      case 2: obstacle.addImage(obstacle2);         
              break; 
      case 3: obstacle.addImage(obstacle3);         
              break;
      case 4: obstacle.addImage(obstacle4);         
              break;
      case 5: obstacle.addImage(obstacle5);         
              break;
      case 6: obstacle.addImage(obstacle6);         
              break;
      default: break;
    
    }
   
    //asigna escala y ciclo de vida al obstáculo           
    obstacle.scale = 0.5;                           
    obstacle.lifetime = 300;                        
   
   // Agrega los obstáculos a su grupo
   obstaclesGroup.add(obstacle);    
 }
}


function spawnClouds() {
  
  //escribe el código aquí para aparecer las nubes
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.6;
    cloud.velocityX = -3;
    
     //asigna ciclo de vida a la variable 
    cloud.lifetime = 220;                  
    
    //ajusta la profundidad
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    // Agrega nubes a su grupo
    cloudsGroup.add(cloud);      
  }
  
}