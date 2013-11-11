// Create the canvas 
var container = document.getElementById('game'); 
var canvas = document.createElement("canvas"); 
var ctx = canvas.getContext("2d"); 
canvas.width = 461; 
canvas.height = 495; 
container.appendChild(canvas); 

// Background image 
var bgReady = false; 
var bgImage = new Image(); 
bgImage.onload = function () { 
  bgReady = true; 
}; 
bgImage.src = "img/hockey.png"; 

// Player1 image 
var player1Ready = false; 
var player1Image = new Image(); 
player1Image.onload = function () { 
  player1Ready = true; 
}; 
player1Image.src = "img/player1.png"; 
// Player2 image 
var player2Ready = false; 
var player2Image = new Image(); 
player2Image.onload = function () { 
  player2Ready = true; 
}; 
player2Image.src = "img/player2.png"; 

// Hockeypuck image 
var hockeypuckReady = false; 
var hockeypuckImage = new Image(); 
hockeypuckImage.onload = function () { 
  hockeypuckReady = true; 
}; 
hockeypuckImage.src = "img/hockeypuck.png";

// Game objects 
var player1 = { 
  speed: 256 // movement in pixels per second 
}; 
var player2 = { 
  speed: 256 // movement in pixels per second 
};

var hockeypuck = {}; 
var player1Score = 0;
var player2Score = 0;
var playerHit = 1; //Controll for which player(1 = Player 1, 2 = Player 2) that has touched the puck last
var wallHit = 0;  //Controll for which wall(0 = left wall, 1 = right wall) the hockeypuck has touched last
var puckSpeed = 0.50;
var puckAngle = 0.25;


//Soundeffects 
var slapshot = new Audio("sound/slapshot.ogg"); 
var goal1 = new Audio("sound/goal1.wav"); 
var win = new Audio("sound/CreditsWin.ogg"); 
var board = new Audio("sound/board.ogg"); 

// Handle keyboard controls 
var keysDown = {}; 
addEventListener("keydown", function (e) { 
    keysDown[e.keyCode] = true; 
}, false); 

addEventListener("keyup", function (e) { 
    delete keysDown[e.keyCode]; 
}, false); 

// Reset the game when the match is over 
var reset = function () { 
  player1.x = canvas.width / 2; 
  player1.y = canvas.height / 2; 
  player2.x = canvas.width / 2; 
  player2.y = canvas.height / 2;
  hockeypuck.x = canvas.width / 2; 
  hockeypuck.y = canvas.height / 2;
}; 
var dropThePuck = function()
{
hockeypuck.x = 247; 
hockeypuck.y = 240;
}
// Change the speed and angle of the puck
var changePuckSpeed = function()
{
puckSpeed = puckSpeed + 0.10;
puckAngle = puckAngle + 0.10;
}
//Decide how the hockeypuck will move around on the canvas
var moveHockeypuck = function (){	
	if(playerHit == 2 && wallHit == 0){
	hockeypuck.y = hockeypuck.y+puckSpeed;
	hockeypuck.x = hockeypuck.x+puckAngle;
	}
	if(playerHit == 2 && wallHit == 1){
	hockeypuck.y = hockeypuck.y+puckSpeed;
	hockeypuck.x = hockeypuck.x-puckAngle;
	}
	if (playerHit == 1 && wallHit == 0)
		{
		hockeypuck.y = hockeypuck.y-puckSpeed;
		hockeypuck.x = hockeypuck.x+puckAngle;
		}
		if (playerHit == 1 && wallHit == 1)
		{
		hockeypuck.y = hockeypuck.y-puckSpeed;
		hockeypuck.x = hockeypuck.x-puckAngle;
		}
};

// Update game objects 
var update = function (modifier) { 

if (37 in keysDown) { // Player1 holding left 
  player1.x -= player1.speed * modifier; 
} 
if (39 in keysDown) { // Player1 holding right 
  player1.x += player1.speed * modifier; 
} 
if (65 in keysDown) { // Player2 holding "A" for left
  player2.x -= player2.speed * modifier; 
} 
if (68 in keysDown) { // Player2 holding "D" for right
  player2.x += player2.speed * modifier; 
} 

// Collision controll to see if the hockey puck collidse with player 1 or player 2
if ( 
  player1.y+216 <= (hockeypuck.y) 
  && player1.x <= (hockeypuck.x) 
  && player1.x+19 >= (hockeypuck.x) 
  && player1.y+221 >= (hockeypuck.y) 
) { 
  playerHit = 1; 
  changePuckSpeed();
  slapshot.play();
  wallHit = 1;
} 
if ( 
  player1.y+216 <= (hockeypuck.y) 
  && player1.x+20 <= (hockeypuck.x) 
  && player1.x+38 >= (hockeypuck.x) 
  && player1.y+221 >= (hockeypuck.y) 
) { 
  playerHit = 1; 
  changePuckSpeed();
  slapshot.play();
  wallHit = 0;
} 
if ( 
  player2.y-215 >= (hockeypuck.y) 
 && player2.x <= (hockeypuck.x) 
 && player2.x+19 >= (hockeypuck.x) 
 && player2.y-221 <= (hockeypuck.y) 
)
	{
	playerHit = 2; 
	changePuckSpeed();
  slapshot.play();
  wallHit = 1;
  	}
  	if ( 
  player2.y-215 >= (hockeypuck.y) 
 && player2.x+20 <= (hockeypuck.x) 
 && player2.x+38 >= (hockeypuck.x) 
 && player2.y-221 <= (hockeypuck.y) 
)
	{
	playerHit = 2; 
	changePuckSpeed();
  slapshot.play();
  wallHit = 0;
  	}
  	if(hockeypuck.x>canvas.width-12){wallHit = 1;board.play();}
  	if(hockeypuck.x<0){wallHit = 0;board.play();}
  	
  	if(hockeypuck.y<0){player1Score= player1Score+1; playerHit = 2;puckSpeed=0.50;puckAngle=0.25;goal1.play();dropThePuck();}
  	if(hockeypuck.y>canvas.height){player2Score= player2Score+1; playerHit=1;puckSpeed=0.50;puckAngle=0.25;goal1.play();dropThePuck();}
  	
//Game over function. Show #gameOver tag. Stop playing the background music and start playing the "win-music". Drop the puck in the middle of the ice and wait for the user for retrying 	
var gameOver = function() { 
  $('div#gameOver').show(); 
	
hockeypuck.x = 247; 
hockeypuck.y = 240;
bgMusic.pause(); 
win.play();    
}; 

// Retry has been clicked. win-music is paused and backgroundmusic starts. The score is set to 0 - 0.
$('div#gameOver').click(function(){ 
    $('div#gameOver').hide(); 
    win.pause();
    player1Score = 0;
    player2Score = 0;
   bgMusic.play();
}); 

//Prevents movement outside of the canvas for player 1 and 2
if (player1.y < -50) {player1.y = -5;} 
if (player1.y > canvas.height-35) {player1.y = canvas.height-35;} 
if (player1.x < 0) {player1.x = 0;} 
if (player1.x > canvas.width-38) {player1.x = canvas.width-38;} 

if (player2.y < -50) {player2.y = -5;} 
if (player2.y > canvas.height-35) {player2.y = canvas.height-35;} 
if (player2.x < 0) {player2.x = 0;} 
if (player2.x > canvas.width-38) {player2.x = canvas.width-38;} 

//Controll for calling the gameOver function
if (player1Score>= 5 && player1Score-1 > player2Score || player2Score>= 5 && player2Score-1>player1Score) { 
  gameOver(); 
} 
   
};

// Draw everything 
var render = function () { 
  if (bgReady) { 
    ctx.drawImage(bgImage, 0, 0); 
  } 

  if (player1Ready) { 
    ctx.drawImage(player1Image, player1.x, player1.y+222); 
  } 
 if (player2Ready) { 
    ctx.drawImage(player2Image, player2.x, player2.y-235); 
  } 
   if (hockeypuckReady) { 
   	   moveHockeypuck();
    ctx.drawImage(hockeypuckImage, hockeypuck.x-3, hockeypuck.y-5); 
    
  } 

   
  // Score 
  if(player1Score<4 && player2Score<4){
  ctx.fillStyle = "rgb(0, 0, 0)"; 
  ctx.font = "23px Helvetica"; 
  ctx.textAlign = "left"; 
  ctx.textBaseline = "top"; 
  ctx.fillText("Player 2 score: "+ player2Score, 1, 32);
  
   ctx.fillStyle = "rgb(0, 0, 0)"; 
  ctx.font = "23px Helvetica"; 
  ctx.textAlign = "left"; 
  ctx.textBaseline = "bottom"; 
  ctx.fillText("Player 1 score: " + player1Score, 1, 450);
  }
  if(player2Score==4 && player1Score<=3){
  ctx.fillStyle = "rgb(0, 0, 0)"; 
  ctx.font = "23px Helvetica"; 
  ctx.textAlign = "left"; 
  ctx.textBaseline = "top"; 
  ctx.fillText("Player 2 score: "+ player2Score, 1, 32);
  
   ctx.fillStyle = "rgb(0, 0, 0)"; 
  ctx.font = "23px Helvetica"; 
  ctx.textAlign = "left"; 
  ctx.textBaseline = "bottom"; 
  ctx.fillText("Player 1 score: " + player1Score, 1, 450);
  }
  
  if(player2Score<=3 && player1Score==4){
  ctx.fillStyle = "rgb(0, 0, 0)"; 
  ctx.font = "23px Helvetica"; 
  ctx.textAlign = "left"; 
  ctx.textBaseline = "top"; 
  ctx.fillText("Player 2 score: "+ player2Score, 1, 32);
  
   ctx.fillStyle = "rgb(0, 0, 0)"; 
  ctx.font = "23px Helvetica"; 
  ctx.textAlign = "left"; 
  ctx.textBaseline = "bottom"; 
  ctx.fillText("Player 1 score: " + player1Score, 1, 450);
  }
  
   if(player2Score>=4 && player1Score>=4 && !(player2Score-1>player1Score) && !(player1Score-1>player2Score)){ 
  ctx.fillStyle = "rgb(0, 0, 0)"; 
  ctx.font = "23px Helvetica"; 
  ctx.textAlign = "left"; 
  ctx.textBaseline = "bottom"; 
  ctx.fillText("SUDDEN DEATH! Player 2 score: "+ player2Score, 1, 50);
   
    ctx.fillStyle = "rgb(0, 0, 0)"; 
  ctx.font = "23px Helvetica"; 
  ctx.textAlign = "left"; 
  ctx.textBaseline = "bottom"; 
  ctx.fillText("SUDDEN DEATH! Player 1 score: " + player1Score, 1, 450);
   }
  
   if(player1Score>4 && player1Score-1>player2Score ){ 
  ctx.fillStyle = "rgb(0, 0, 0)"; 
  ctx.font = "25px Helvetica"; 
  ctx.textAlign = "left"; 
  ctx.textBaseline = "bottom"; 
  ctx.fillText("Player 2 lose! " + player2Score + " - " + player1Score, 1, 32);
   
  ctx.fillStyle = "rgb(0, 0, 0)"; 
  ctx.font = "25px Helvetica"; 
  ctx.textAlign = "left"; 
  ctx.textBaseline = "bottom"; 
  ctx.fillText("Player 1 wins! " + player1Score + " - " + player2Score, 1, 450);
   }
   
    if(player2Score>4 && player2Score-1>player1Score ){ 
  ctx.fillStyle = "rgb(0, 0, 0)"; 
  ctx.font = "25px Helvetica"; 
  ctx.textAlign = "left"; 
  ctx.textBaseline = "bottom"; 
  ctx.fillText("Player 2 wins! " + player2Score + " - " + player1Score, 1, 32);
   
  ctx.fillStyle = "rgb(0, 0, 0)"; 
  ctx.font = "25px Helvetica"; 
  ctx.textAlign = "left"; 
  ctx.textBaseline = "bottom"; 
  ctx.fillText("Player 1 lose! " + player1Score + " - " + player2Score, 1, 450);
   }
  
  
}; 

// The main game loop 
var main = function () { 
  var now = Date.now(); 
  var delta = now - then; 

  update(delta / 1000); 
  render(); 
  then = now; 
}; 

// Let's play this game! 
reset(); 
var then = Date.now(); 
setInterval(main, 1); // Execute as fast as possible 



