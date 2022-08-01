var welcomeEl = document.querySelector("#welcome");
var startbtnEL = document.querySelector("#start-quiz");
var timerEL = document.querySelector("#timer");
var questionEL = document.querySelector("#question");
var quizEl = document.querySelector("#quiz");
var choiceEL = document.querySelector("#choice");
var resultEL = document.querySelector("#result");
var winLossEL = document.querySelector("#win-or-loss");
var messageEl = document.querySelector("#message");


var timeLeft = 20;
var qIndex = 0;
var choice;
var answer;

// Store quiz questions and answers
var questions = [
    {question:"Inside which HTML element do we put the JavaScript?",
    choices: ["<script>", "<javascript>", "<scripting>", "<js>"], answer: "<script>"}, 
    {question:"Which built-in method removes the last element from an array and returns that element?",
    choices: ["last()", "get()", "pop()", "None of the above."], answer:"pop()"}]


startbtnEL.addEventListener("click", startGame);

function startGame(){
    // Hide welcome panel and startquiz btn
    welcomeEl.dataset.state="hidden";
    welcomeEl.setAttribute("class", "hidden");
    startbtnEL.setAttribute("class", "hidden");
    // Set timer
    countTime();

    //set quiz content
    quizEl.setAttribute("class", "show");
    generateQuestion();

}

// Set timer, if no time left, hide timer
function countTime(){
    var timeInterval = setInterval(function(){
        if(timeLeft === 0 || timeLeft < 0){
            clearInterval(timeInterval);
            timerEL.setAttribute("class", "hidden");
            sendResult();
            return;
        } else {
            timerEL.textContent = "Time: " + timeLeft;
        }
        timeLeft--;
    }, 1000) 
}

function sendResult(){
    quizEl.setAttribute("class", "hidden");
    timerEL.setAttribute("class", "hidden");
    resultEL.setAttribute("class", "show");
    if (timeLeft <= 0){
        winLossEL.innerHTML = "Time's up";
        messageEl.innerHTML = "Your final score is " + timeLeft;
    } else {
        winLossEL.innerHTML = "All done!"
        messageEl.innerHTML = "Your final score is " + timeLeft;
    }
}

function generateQuestion(){
    if (qIndex < questions.length){
        questionEL.textContent = questions[qIndex].question;
        answer = questions[qIndex].answer;
        removeElement(choiceEL);
        for (let i = 0; i < 4;i++){
            choice = document.createElement("button");
            choice.textContent = questions[qIndex].choices[i];
            choice.setAttribute("class", "options");
            choice.style.display = "block";
            choiceEL.appendChild(choice);
        }
        qIndex++;
    } else{
        sendResult();
    }  
}

function removeElement(element){
    for(let i = 0; i < element.length; i++){
        element[i].parentNode.removeChild(element[i]);
    }
}
// Click answer and jump to next question
var optionEL = document.querySelectorAll(".options");
choiceEL.addEventListener("click", function(event){
    var element = event.target;
    if (element.matches("button")){
        if (element.textContent == answer){
            generateQuestion();
        } else {
            timeLeft -= 5;
            generateQuestion();
        }
    }
})

