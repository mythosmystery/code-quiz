const TIME_ALLOWED = 60;

var startBtnEl = $("#start");
var timeEl = $("#timer");

displayWelcomeMessage();

startBtnEl.on('click', quizStart);

function quizStart(){  
    startBtnEl.hide(); 
    timerStart();
    displayQuestion();
    
}
function displayWelcomeMessage(){

}
function displayQuestion(){

}
function timerStart(){
    var timeLeft = TIME_ALLOWED;
    console.log("timer started");
        
    var timer = setInterval(function(){
        if(timeLeft >= 0){
            timeEl.text(timeLeft);
            timeLeft--;
        }else{
            clearInterval(timer);
            console.log("interval cleared");
        }               
    }, 1000);
}






