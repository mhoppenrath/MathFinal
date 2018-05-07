$(document).ready(function() {
	// set variables for inital start
	var score = 0; //keeps track of the score which will print out at the end
	var questionCount = GoTfactoids.length; //makes the end of the game
	var progress = 0; //this tracks the progress ingame so far
	var unanswered = 0;
	var intervalId; // the counter variable
	var randomPicker; //which question is picked. This is global because I want it to go between functions
	var currentQuestion; //this is global so we can share it amongst all the functions
	var nextQuestion = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block next-button' href='#' role='button'>Next Question</a></p>"

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
	//times out the timer when you reach 0
	function timeOutLoss() {
		unanswered++;
		progress ++;
		console.log("unanswered: " + unanswered + " progress: " + progress);
		$("#timer").html("0:00");
		$("questionHolder").html("You ran out of time. The correct answer was: " + GoTfactoids[currentQuestion].correctAnswer);
		//put image in the question hodler
		var anwserImage = 
		$("#hiddenResult").html(nextQuestion);
	}
	function pickedRightAnswer() {
		score++;
		progress ++;
		console.log("score: " + score + " progress: " + progress);		
		$("#questionHolder").html("Correct!");
		//put image in the question hodler
		$("#hiddenResult").html(nextQuestion);

	}
	//clearly for wrong answers
	function pickedWrongAnswer() {
		progess++;
		console.log("Progress: " + progress);
		$("#questionHolder").html("WRONG! The right answer is" + GoTfactoids[currentQuestion].correctAnswer);
		$("#hiddenResult").html(nextQuestion);
		var answerImage = $('<img>');
		answerImage.attr('src', GoTfactoids[i].src);
	}
	// first we pick a radom number then we tet to see if we have done it.
	function randomQuestion() {
		randomPicker = Math.floor(Math.random() * questionCount);
		console.log(randomPicker);
		return randomPicker;
	}
	function buildQuestion() {
		if (progress != questionCount) {
			do {
				currentQuestion = randomQuestion();
				console.log(GoTfactoids[currentQuestion])
			} while(GoTfactoids[currentQuestion].previousDone === true);
			GoTfactoids[currentQuestion].previousDone = true;
			for (var i = 0; i<4;i++){
				potientialAnswer = GoTfactoids[currentQuestion].answers[i];
				questioniHTML = "<p class='main-button-container'><a class='btn btn-primary btn-lg btn-block answer-button' value: " + GoTfactoids[i] +  "href='#' role='button'>" + potientialAnswer + "</a></p>"

			}
		}	
		else {
			newGame();
		}

	}

	function newGame() {
		counter = 30;
		progress = 0;
		score=0;
		unanswered=0;
		for (var i = 0; i<GoTfactoids.length;i++){
			GoTfactoids[i].previousDone = false;
		}
		newStartScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start a New Game</a></p>";
		$("#questionHolder").html(newStartScreen);

	}
	$('.start-button, .next-button').on("click", function(){
		buildQuestion()
		timer();
	});

	$('.answer-buttonns').on('click', function(){
		if(this.value = GoTfactoids[currentQuestion]) {
			pickedRightAnswer();
		}
		else {
			pickedWrongAnswer();
		}
	})



});