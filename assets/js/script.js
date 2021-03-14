const TIME_ALLOWED = 60;
const TIME_INTERVAL = 10;

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

var timer;
var timeLeft = TIME_ALLOWED;
var score = 0;
var currentQuestion = 0;

displayWelcomeMessage();

startBtnEl.on("click", quizStart);

function quizStart() {   
   welcomeCardEl.hide();
   timerStart();
   displayQuestion(currentQuestion);

   submitAnswerEl.on("click", function () {
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
   });
}
function restartQuiz(){
    timeLeft = TIME_ALLOWED;
    score = 0;
    currentQuestion = 0;
    displayWelcomeMessage();
}
function displayWelcomeMessage() {
   welcomeCardEl.show();
   questionCardEl.hide();
   timeUpCardEl.hide();
   highScoreCardEl.hide();
   invalidInitialsEl.hide();
}
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
function hideAnswers() {
   for (let i = 0; i < answerListEl.length; i++) {
      answerListEl[i].hide();
      radioListEl[i].prop("checked", false);
   }
   incorrectAlertEl.hide();
   correctAlertEl.hide();
}
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
function timeUp() {
   clearInterval(timer);
   questionCardEl.hide();
   timeUpCardEl.show();
   score = timeLeft+1;
   scoreEl.text(score);
   getInitials();
}
function getInitials() {
    initialSubmitEl.on("click", function(){
        if(initialInputEl.val().length < 2){
            invalidInitialsEl.show();
        }else{
            addHighScore(initialInputEl.val());
        }        
    });
}
function addHighScore(initials){
    var newHighScore = $("<li class='list-group-item bg-dark'>");
    newHighScore.text(initials+" : "+score);
    initialsListEl.append(newHighScore);
    showHighScores();
    backBtnEl.on("click", function(){
        restartQuiz();
    });
}
function showHighScores() {
    timeUpCardEl.hide();
    highScoreCardEl.show();
}
function clearHighScore() {}
function removeTime() {
   timeLeft -= TIME_INTERVAL;
}
