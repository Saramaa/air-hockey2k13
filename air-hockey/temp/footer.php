<?php 
  $d = explode("/", trim($path, "/")); 
  $srcUrl = '../source.php?dir=' . end($d) . '&amp;file=' . basename($_SERVER["PHP_SELF"]) . '#file'; 
?> 

<footer id='footer'> 

<div id='copy'>&copy Anderz Johansson  2013</div> 

</footer> 

<script src="http://www.student.bth.se/~anjo13/javaScript/me/test/air-hockey/js/jquery.js"></script> 
<script src="main.js"></script> 

<!-- For Google Analytics, tracking use of testprograms on dbwebb.se. Do not include this in your own testprograms. --> 
<script type="text/javascript"> 
  var _gaq = _gaq || []; 
  _gaq.push(['_setAccount', 'UA-22093351-1']); 
  _gaq.push(['_trackPageview']); 
  (function() { 
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true; 
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'; 
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s); 
  })(); 
</script> 

</body> 
</html>  
