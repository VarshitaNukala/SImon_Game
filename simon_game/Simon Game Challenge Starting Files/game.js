var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
function nextSequence(){
    userClickedPattern=[];
    
    var randomNumber=Math.round(Math.random()*3);
    var randomChosenColor=buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    //console.log(gamePattern);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    $("#level-title").text("Level " + level);
    
    
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})
$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
       if(gamePattern.length===userClickedPattern.length){
           setTimeout(function(){
               nextSequence();
           },1000);
       }
    }
    else{
        var wrong=new Audio("sounds/wrongg.mp3");
        wrong.play();
        $("body").addClass("game-over");
        $("#level-title").text("Game Over :( Press ANy Key To Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
        startOver();
    }
}
function startOver(){
    level=0
    started=false;
    gamePattern=[];
}