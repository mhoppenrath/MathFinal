$(document).ready(function() {
	// set variables for inital start
	var score = 0; //keeps track of the score which will print out at the end
	var questionCount = FinalQuestions.length; //makes the end of the game
	var progress = 0; //this tracks the progress ingame so far
	var unanswered = 0;
	var intervalId; // the counter variable
	var randomPicker; //which question is picked. This is global because I want it to go between functions
	var currentQuestion; //this is global so we can share it amongst all the functions
	var nextQuestion = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block next-button' href='#' role='button'>Next Question</a></p>"
	var answerForm ='<input id="answer"> My Answer: <button type="button" onclick="answerQuestion()">Submit</button>'
	//creates a start button under the title
	function initalScreen() {
		startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
		$("#questionHolder").html(startScreen);
	}
	initalScreen();

	// creates the timer function
	function timer() {
		theTime = setInterval(thirtySeconds, 1000);
		function thirtySeconds(){
			if (counter === 0) {
				clearInterval(theTime);
				timeoutLoss();
			}
			if (counter > 0 ) {
				counter--;
			}
			$("#timer").html("0:" + counter);
		}

	}

	// first we pick a radom number then we tet to see if we have done it.
	function randomQuestion() {
		randomPicker = Math.floor(Math.random() * questionCount);
		return FinalQuestions[randomPicker];
	}
	//Builds out the HTML for the current quesiton
	function buildQuestion() {
		progress ++;
		currentQuestion = randomQuestion();
		currentQuestion.previousDone = true;
		question = "<p class='text-center main-button-container'>" + currentQuestion.question + "</p>";
		picture = currentQuestion.picture;
		$("#questionHolder").html(question);
		$("#pictureHolder").html(picture);
		$("#formHolder").html(answerForm);

	}

	function newGame() {
		counter = 30;
		progress = 0;
		score=0;
		unanswered=0;
		for (var i = 0; i<FinalQuestions.length;i++){
			FinalQuestions[i].previousDone = false;
		}
		newStartScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start a New Game</a></p>";
		$("#questionHolder").html(newStartScreen);

	}
	$('.start-button, .next-button').on("click", function(){
		buildQuestion()
	});


	function answerQuestion() {
	    var x = document.getElementById("answer").value;
	    if (x == "") {
	        alert("Plase Answer the Question");
	        return false;
	    }
			else if (x != currentQuestion.answer)
			{
				if (progress != questionCount) {
					alert("Correct!")
					buildQuestion()
				}
				else
					done()
			}
			else
				alert("Sorry that is wrong. Try again.")
	}
	function done() {

	}


});
