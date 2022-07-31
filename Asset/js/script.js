var timeEL = document.getElementById("#time");
var welcomeTitleEL = document.getElementById("#welcome-title");
var welcomeSentenceEL = document.getElementById("#welcome-sentence");
var startbtnEl = document.getElementById("#start-quiz");
var initialSubmitEl = document.getElementById("#initial-submit");

startbtnEl.addEventListener("click", startQuiz());


function startQuiz (){
    timeCount();
}

function timeCount(){
    var timeLeft = 75;
    var timeInterval = setInterval(function(){
        if(timeLeft > 1){
            timeEL.textContent = `Time: ${timeLeft}`;
            timeLeft--;
        } else{
            clearInterval(timeInterval);
        }
    }
    , 1000)
}




function setHighScore(event){
    event.preventDefault();
}
