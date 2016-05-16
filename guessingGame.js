/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
    winningNumber = generateWinningNumber();



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
      return false;
    };
    playersGuess = +$("#guess").val();
    $("#guess").val("");
    checkGuess();
  });
  };

$(document).ready(playersGuessSubmission);


//Stop 'enter' from refreshing page
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
  return "Hint: Your guess is " + lowerOrHigher() + 
  " than the winning number by fewer than " + guessDistance() + " digits."
};

// Check if the Player's Guess is the winning number 
var hasGuessed = [];
var numGuess = 5;

function checkGuess(){
	// add code here
  $(".alert").remove();
  $("#result").remove();
  $("#message").remove();

  if (playersGuess === winningNumber) {
    $("h1").after("<p id=\"result\">You Win!!</p>");
    $(".guesstracking").remove();
  }
  else if (hasGuessed.includes(playersGuess)) {
      $(".guesstracking").before("<p class=\"alert\">You already guessed that number!</p>");
    }

  else {
    
    $("h1").after("<p id=\"result\">Try Again!!</p><p id=\"message\">"+guessMessage()+"</p>");

    numGuess-=1;

    $(".numguess").text(numGuess);
      
    if (numGuess === 0) {
      $(".guesstracking").remove();
      $("#result").remove();
      $("#message").remove();
      $("h1").after("<p id=\"result\">You Lose, sorry!</p>");
      }
  };
  hasGuessed.push(playersGuess);
};

// Create a provide hint button that provides additional clues to the "Player"


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
    $(".hintoutput").remove();
    $(".guesstracking").before("<p class=\"hintoutput\">The winning number is one of the following: <br>"+hintArrayToString(generateHintArray())+"</p>");
  });
}

$(document).ready(provideHint);

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
}


/* **** Event Listeners/Handlers ****  */

