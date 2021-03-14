const TIME_ALLOWED = 60;
const TIME_INTERVAL = 10;

//JQuery declarations
var startBtnEl = $("#start");
var timeEl = $("#timer");
var welcomeCardEl = $("#welcome");
var questionCardEl = $("#question");
var submitAnswerEl = $("#answer-submit");
var timeUpCardEl = $("#time-up");
var scoreEl = $("#score");
var questionNumEl = $("#question-num");
var questionTextEl = $("#question-text");
var answerListEl = [$("#answer1"), $("#answer2"), $("#answer3"), $("#answer4")];
var radioListEl = [$("#radio1"), $("#radio2"), $("#radio3"), $("#radio4")];
var initialSubmitEl = $("#initial-submit");
var incorrectAlertEl = $("#incorrect");
var correctAlertEl = $("#correct");
var initialsListEl = $("#initials");
var highScoreCardEl = $("#highscores");
var invalidInitialsEl = $("#invalid-initials-alert");
var initialInputEl = $("#initial-input");
var backBtnEl = $("#back");
var clearBtnEl = $("#clear-scores");
var viewScoreBtnEl = $("#view-scores");

var timer;
var timeLeft = TIME_ALLOWED;
var score = 0;
var currentQuestion = 0;

displayWelcomeMessage();

//event listeners for our buttons
startBtnEl.on("click", quizStart);
submitAnswerEl.on("click", submitAnswer);
initialSubmitEl.on("click", getInitials);
clearBtnEl.on("click", clearHighScore);
viewScoreBtnEl.on("click", showHighScores);
backBtnEl.on("click", restartQuiz);

//starts main quiz logic
function quizStart() {   
    console.log("quiz start");
   welcomeCardEl.hide();
   timerStart();
   displayQuestion(currentQuestion);     
   console.log("end of func");
}

//submits answer and goes to next question
function submitAnswer(){ 
        console.log("submit answer");     
        checkAnswer(currentQuestion);
        currentQuestion++;
        if (currentQuestion < questions.length) {
           setTimeout(function () {
              displayQuestion(currentQuestion);
           }, 1000);
        } else {
           setTimeout(function () {
              timeUp();
           }, 1000);
        }       
}

//restarts the quiz when the go back button is clicked
function restartQuiz(){
    timeLeft = TIME_ALLOWED;
    score = 0;
    currentQuestion = 0;
    timeEl.text("");    
    clearInterval(timer);
    displayWelcomeMessage();    
}

//displays welcome message and clears other cards
function displayWelcomeMessage() {
    
   welcomeCardEl.show();
   questionCardEl.hide();
   timeUpCardEl.hide();
   highScoreCardEl.hide();
   invalidInitialsEl.hide();
}

//starts the set interval timer and calls timeUp when it runs out
function timerStart() {
   console.log("timer started");

   timer = setInterval(function () {
      if (timeLeft >= 0) {
         timeEl.text(timeLeft);
         timeLeft--;
      } else {
         timeUp();
      }
   }, 1000);
}

//displays question and answers from the objects in the other file
function displayQuestion(currentQuestion) {
    console.log(currentQuestion);
   hideAnswers();
   questionCardEl.show();
   questionNumEl.text("Question " + (currentQuestion + 1));
   questionTextEl.text(questions[currentQuestion].question);
   for (let i = 0; i < questions[currentQuestion].answer.length; i++) {
      answerListEl[i].show();
      answerListEl[i].text(questions[currentQuestion].answer[i].answerText);
   }
}

//resets answers for next question
function hideAnswers() {
   for (let i = 0; i < answerListEl.length; i++) {
      answerListEl[i].hide();
      radioListEl[i].prop("checked", false);
   }
   incorrectAlertEl.hide();
   correctAlertEl.hide();
}

//checks the selected answer against the array
function checkAnswer(currentQuestion) {
   console.log("checking answer...");
   var isCorrect;
   for (let i = 0; i < radioListEl.length; i++) {
      if (radioListEl[i].is(":checked") && questions[currentQuestion].answer[i].isCorrect) {
         correctAlertEl.show();         
         return;
      } else if (radioListEl[i].is(":checked") && !questions[currentQuestion].answer[i].isCorrect) {
         incorrectAlertEl.show();
         isCorrect = false;
      }
   }
   if (!isCorrect && timeLeft > TIME_INTERVAL){
    removeTime();
   } else if(!isCorrect){
       timeLeft = 0;
   }
}

//clears everything and goes to the time up card
function timeUp() {
   clearInterval(timer);
   questionCardEl.hide();
   timeUpCardEl.show();
   score = timeLeft+1;
   scoreEl.text(score);   
}

//gets users initials
function getInitials() {    
        if(initialInputEl.val().length < 2){
            invalidInitialsEl.show();
        }else{
            addHighScore(initialInputEl.val());
        }        
    
}

//adds high score and initials to high score list
function addHighScore(initials){
    var newHighScore = $("<li class='list-group-item bg-dark'>");
    newHighScore.text(initials+" : "+score);
    initialsListEl.append(newHighScore);
    showHighScores();    
}

//shows high score card, hides other cards
function showHighScores() {
    clearInterval(timer);
    timeEl.text("");
    questionCardEl.hide();
    welcomeCardEl.hide();
    timeUpCardEl.hide();
    highScoreCardEl.show();
}
function clearHighScore() {
    initialsListEl.children("li").remove();
}
function removeTime() {
   timeLeft -= TIME_INTERVAL;
}
