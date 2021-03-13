const TIME_ALLOWED = 60;
const TIME_INTERVAL = 20;

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

var timer;
var timeLeft = TIME_ALLOWED;

displayWelcomeMessage(true);

startBtnEl.on("click", quizStart);

function quizStart() {
   var currentQuestion = 0;
   displayWelcomeMessage(false);
   timerStart();
   displayQuestion(currentQuestion);
}
function displayWelcomeMessage(isDisplayed) {
   if (isDisplayed) {
      welcomeCardEl.show();
      questionCardEl.hide();
      timeUpCardEl.hide();
   } else {
      welcomeCardEl.hide();
   }
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
   hideAnswers();
   questionCardEl.show();
   questionNumEl.text("Question " + (currentQuestion + 1));
   questionTextEl.text(questions[currentQuestion].question);
   for (let i = 0; i < questions[currentQuestion].answer.length; i++) {
      answerListEl[i].show();
      answerListEl[i].text(questions[currentQuestion].answer[i].answerText);
   }
   submitAnswerEl.on("click", function () {
      checkAnswer(currentQuestion);
      currentQuestion++;
      if (currentQuestion < questions.length) {
         setTimeout(function () {
            displayQuestion(currentQuestion);
         }, 1000);
      }else{
        setTimeout(function () {
            timeUp();
         }, 1000);
      }
   });
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
         isCorrect = true;         
      } else if (radioListEl[i].is(":checked") && !questions[currentQuestion].answer[i].isCorrect) {
         incorrectAlertEl.show();
        isCorrect = false;         
      }      
   }   
}
function timeUp() {
   clearInterval(timer);
   questionCardEl.hide();
   timeUpCardEl.show();
   scoreEl.text(timeLeft+1);
   getInitials();
}
function showHighScores() {}
function getInitials() {}
function clearHighScore() {}
function addTime() {
    timeLeft += TIME_INTERVAL;
}
function removeTime() {
    timeLeft -= TIME_INTERVAL;
}

