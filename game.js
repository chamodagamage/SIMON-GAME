var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var gamePattern = [];
var userClickedPattern=[];
var keyPress=true;
var level=0;

$(".btn").click(function (){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){
  if (keyPress=== true){
    nextSequence();
    keyPress= false;
  }
});

function nextSequence() {
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);

    for (var i = 0; i < buttonColors.length; i++) {
      if (i === randomNumber) {
        randomChosenColor = buttonColors[i];
        gamePattern.push(randomChosenColor);
      }
    }

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    if(userClickedPattern.length>0){
      while (userClickedPattern.length) { userClickedPattern.pop(); }
    }
}


function playSound(name){
  switch (name) {
    case ("blue"):
      var audio = new Audio("sounds/blue.mp3");
      audio.play();
      break;
    case ("green"):
      var audio1 = new Audio("sounds/green.mp3");
      audio1.play();
      break;
    case ("red"):
      var audio2 = new Audio("sounds/red.mp3");
      audio2.play();
      break;
    case ("yellow"):
      var audio3 = new Audio("sounds/yellow.mp3");
      audio3.play();
      break;
    default:
  }
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function (){
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function (){
        nextSequence();
      }, 1000);
    }

  }else{
    var gameOverSound = new Audio("sounds/wrong.mp3");
    gameOverSound.play();
    $("body").addClass("game-over");
    setTimeout(function (){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  while (gamePattern.length) { gamePattern.pop(); }
  keyPress=true;
  level=0;
}
