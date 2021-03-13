const TIME_ALLOWED = 60;

var startBtnEl = $("#start");
var timeEl = $("#timer");
var welcomeCardEl = $("#welcome");
var questionCardEl = $("#question");
var submitAnswerEl = $("#answer-submit");
var timeUpCardEl = $("#time-up");
var questionNumEl = $("#question-num");
var questionTextEl = $("#question-text");
var answerListEl = [$("#answer1"), $("#answer2"), $("#answer3"), $("#answer4")];
var initialSubmitEl = $("#initial-submit");

var timeLeft = TIME_ALLOWED;

displayWelcomeMessage(true);

startBtnEl.on('click', quizStart);

function quizStart(){  
    var currentQuestion = 0;
    displayWelcomeMessage(false);    
    timerStart();    
    displayQuestion(currentQuestion);    
}
function displayWelcomeMessage(isDisplayed){
    if (isDisplayed){
        welcomeCardEl.show();
        questionCardEl.hide();
        timeUpCardEl.hide();
    }else{
        welcomeCardEl.hide();
    }
}
function displayQuestion(currentQuestion){    
    hideAnswers();
    questionCardEl.show();
    questionNumEl.text("Question " + (currentQuestion+1));
    questionTextEl.text(questions[currentQuestion].question);
    for (let i = 0; i < questions[currentQuestion].answer.length; i++) {
        answerListEl[i].show();
        answerListEl[i].text(questions[currentQuestion].answer[i].answerText);                
    }
    submitAnswerEl.on("click", checkAnswer);  
}
function hideAnswers(){
    for (let i = 0; i < answerListEl.length; i++) {
        answerListEl[i].hide();        
    }
}
function checkAnswer(){
    
}
function showHighScores(){

}
function timeUp(){
    questionCardEl.hide();
    timeUpCardEl.show();
    getInitials();
}
function getInitials(){

}
function clearHighScore(){

}
function addTime(){

}
function removeTime(){

}
function timerStart(){
    
    console.log("timer started");
        
    var timer = setInterval(function(){
        if(timeLeft >= 0){
            timeEl.text(timeLeft);
            timeLeft--;
        }else{
            clearInterval(timer);
            console.log("interval cleared");
            timeUp();
        }               
    }, 1000);
}






