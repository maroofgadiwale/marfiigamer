//Program:
var userClickedPattern=[];
var gamePattern=[];
var buttonColors=["red","green","blue","yellow"];
var hold,level=0,start=false;
function nextSequence()
{
  userClickedPattern=[];
  level++;
  $("h1").text("Level: "+level);
  hold=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[hold];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  makesound(randomChosenColor);

}

function makesound(randomChosenColor)
{
    var audio=new Audio("sounds/"+randomChosenColor+".mp3");
    audio.play();
}

//Detecting button clicks:
$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);   //Pushesh the content of variable into array
  makesound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

//Animation:
function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
      $("#"+currentColour).removeClass("pressed");
    },100);
}

//Detecting keypressed:
$(document).keypress(function(){
  if(!start)
  {
    $("h1").text("Level: "+level);
    nextSequence();
    start=true;
  }
});

function startNow()
{
  if(!start)
  {
    $("h1").text("Level: "+level);
    nextSequence();
    start=true;
  }
}


function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
  {
    if (userClickedPattern.length ==gamePattern.length)
    {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else
  {
      makesound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      startover();
  }

}

function startover()
{
  level=0;
  gamePattern=[];
  start=false;
}
