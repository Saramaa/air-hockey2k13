<?php $title='Simple game in HTML 5 Canvas'; include(__DIR__ . '/temp/header.php'); ?> 
<body>
<div id='flash'> 
  <h1>Air-Hockey 2k13</h1> 
  <div id="game"> 
    <script src="hockey.js"></script> 
    <audio autoplay loop id="bgMusic"><source src="sound/icehockey.ogg"></audio> 
    
   <p><b>Controlls for player 1:</b></p>
   <p>Press "→" to move right and "←" to move left.
   <p><b>Controlls for player 2:</b></p>
   <p>Press "d" to move right and "a" to move left. </p>
   <p><b>Rules:</b></p>
   <p>The player who first scores 5 points win. If the score is 4 - 4 the game will go in to sudden death. Then then the player needs to win with 2 points.</p>
  </div> 
   
  <div id="gameOver"> 
    <h1> 
      GAME OVER 
    </h1> 
    <span> 
      Play again? 
    </span> 
  </div> 

</div> 
</body> 


<?php $path=__DIR__; include(__DIR__ . '/temp/footer.php'); ?> 
