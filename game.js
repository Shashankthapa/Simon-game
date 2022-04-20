gamePattern = [];
userClickedPattern = [];
buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;


$('.btn').click(function() {
  var userChoosenColor = $(this).attr('id');
  userClickedPattern.push(userChoosenColor);
  playSound(userChoosenColor);
  animatePress(userChoosenColor);
  checkAnswer(userClickedPattern.length-1);
});

//keyboard key press
$(document).keypress(function(){
  $('#level-title').text("Press A to Start");
  if(!started){
    nextSequence();
    started = true;
  }
});

function reset(){
  gamePattern = [];
  level = 0;
  started = false;
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $('#level-title').text('Level ' + level);
  var randomNumber = Math.floor(Math.random() * 4);
  let randomChoosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChoosenColor);
  $("#" + randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColor);
}

function wrong(){
  $('#level-title').addClass('game-over');
}

function checkAnswer(currentLevel){

  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    console.log("success");

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
      $("body").addClass("game-over");
      playSound('wrong');
      setTimeout(function (){
        $("body").removeClass("game-over");
      },100);
      $('#level-title').text("Game Over! Press Any key to Restart.");
      reset();
    }
  }




function playSound(name) {
  var audio = new Audio(name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  var addHash = "#" + currentColor;
  $(addHash).addClass('pressed');
  setTimeout(myTimeout,100);
  function myTimeout(){
    $(addHash).removeClass('pressed');
  }
}
