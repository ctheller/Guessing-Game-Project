//Beginning of IIFE
(function(){ 

var playersGuess,
    winningNumber = generateWinningNumber();
    gameover = false;

/* **** Guessing Game Functions **** */

// Generate the Winning Number
//The winning number is the value all "Players" are trying to guess. 
//If they guess the winning number they win! This number will be generated
// in your JavaScript file when the page loads. 

function generateWinningNumber(){
  var min = 1;
  var max = 100;
  function generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return generateRandom(min, max);
};


function playersGuessSubmission(){
  $("form").on('click', '#guessbutton', function(){
    if (numGuess <= 0){
      return;
    };
    playersGuess = +$("#guess").val();
    $("#guess").val("");

    if (gameover){
      return;
    }
    checkGuess();
  });
  };


//Stop 'enter' from refreshing page and make it submit the form

$(window).keydown(function(event){
    if(event.keyCode == 13){
        $('#guessbutton').trigger("click");
        return false;
    }
});


// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
  if (playersGuess<winningNumber){
    return "lower";
  }
  else if (playersGuess>winningNumber){
    return "higher";
  }
};

function guessDistance(){
  var numTens = (Math.ceil(Math.abs(winningNumber-playersGuess)/10)); 
  return numTens*10;
}

function guessMessage(){
  return "Your guess is " + lowerOrHigher() + 
  " than the winning number by fewer than " + guessDistance() + " digits."
};

// Check if the Player's Guess is the winning number 

var hasGuessed = [];
var numGuess = 5;


 //Remove messages 

function resetMessages(){
  $("#alert, #result, #message, #hintoutput").remove();
}

function winGame(){
    $("h1").after("<p id=\"result\">YOU WIN!!</p>");
    $("body").addClass("gameover winner");
    $("#guesstracking").remove();
    gameover = true;
}

function loseGame(){
    resetMessages();
    $("#guesstracking").remove();
    $("h1").after("<p id=\"result\">GAME OVER...</p>");
    $("body").addClass("gameover loser rain");
    createRain();
    gameover = true;
}

function checkGuess(){

  //Remove messages 

  resetMessages();

  //Check for invalid inputs

  if (!(1<=playersGuess && playersGuess<=100)){
      $("h1").after("<p id=\"result\">Invalid input!</p>");
      return;
    }

  //Check for winning

  else if (playersGuess === winningNumber) {
    winGame();
  }

  //Check for already-guessed numbers

  else if (hasGuessed.includes(playersGuess)) {
      $("h1").after("<p id=\"alert\">You already guessed that number!</p>");
    }

  //Handle an incorrect guess. 

  else {

    $("h1").after("<p id=\"result\">Try Again!!</p><p id=\"message\">"+guessMessage()+"</p>");
    
    numGuess-=1;
    $("#numguess").text(numGuess);
    
    //Checks for Losing

    if (numGuess === 0) {
      loseGame();
    }

  };

  hasGuessed.push(playersGuess);
};

// Create a provide hint button that provides additional clues to the "Player"

//Chooses random numbers to include in hint, based on number of guesses left, and returns in increasing order.

function generateHintArray(){
  var hintArray = [winningNumber]
  for (var i = 0; i < (2*numGuess-1);) {
    var addThisNum = generateWinningNumber();
    if (addThisNum!==winningNumber && !hintArray.includes(addThisNum)){
      hintArray.push(addThisNum);
      i++;
    } 
  }
  return hintArray.sort(function(a, b){return a-b});
}

function hintArrayToString (array){
  var string = ""
  for (var i = 0; i < array.length; i++) {
    if (string !== "") {
      string += ", ";
    }
    string += array[i];
  }
  return string;
}

function provideHint(){
	$(".gamebuttons").on('click','#hint', function(){
    $("#hintoutput").remove();
    $("#guesstracking").before("<p id=\"hintoutput\">The winning number is one of the following: <br>"+hintArrayToString(generateHintArray())+"</p>");
  });
}

// Allow the "Player" to Play Again

function playAgain(){
	$(".gamebuttons").on('click','#reload', function(){
    location.reload();
  });
}

/* **** Event Listeners/Handlers ****  */

$(document).ready(provideHint);
$(document).ready(playAgain);
$(document).ready(playersGuessSubmission);




//****** Rain: taken from https://codepen.io/alemesre/pen/hAxGg ******//

// number of drops created.
var nbDrop = 858; 

// function to generate a random number range.
function randRange( minNum, maxNum) {
  return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}

// function to generate drops
function createRain() {

  for( i=1;i<nbDrop;i++) {
  var dropLeft = randRange(0,1600);
  var dropTop = randRange(-1000,1400);

  $('.rain').append('<div class="drop" id="drop'+i+'"></div>');
  $('#drop'+i).css('left',dropLeft);
  $('#drop'+i).css('top',dropTop);
  }

}

//end of IIFE

}());



