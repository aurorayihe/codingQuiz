var welcomeEl = document.querySelector("#welcome");
var startbtnEL = document.querySelector("#start-quiz");
var timerEL = document.querySelector("#timer");
var questionEL = document.querySelector("#question");
var quizEl = document.querySelector("#quiz");
var choiceEL = document.querySelector("#choice");
var resultEL = document.querySelector("#result");
var winLossEL = document.querySelector("#win-or-loss");
var messageEl = document.querySelector("#message");
var initialInput = document.querySelector("#initlals");
var submitEL = document.querySelector("#initial-submit");
var highScoreEL = document.querySelector("#highscore-list");

var timeLeft = 3;
var qIndex = 0;
var choice;
var answer;

// Store quiz questions and answers
var questions = [
    {question:"Inside which HTML element do we put the JavaScript?",
    choices: ["<script>", "<javascript>", "<scripting>", "<js>"], answer: "<script>"}, 
    {question:"Which built-in method removes the last element from an array and returns that element?",
    choices: ["last()", "get()", "pop()", "None of the above."], answer:"pop()"}]


// Click the start button and start the game
startbtnEL.addEventListener("click", startGame);

//Initialize the game and set up everything 
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
            timeLeft--;
        }
    }, 1000) 
}

// Show the result
function sendResult(){
    quizEl.setAttribute("class", "hidden");
    timerEL.setAttribute("class", "hidden");
    resultEL.setAttribute("class", "show");
    if (timeLeft <= 0){
        clearInterval(timeInterval);
        winLossEL.innerHTML = "Time's up";
        messageEl.innerHTML = "Your final score is " + timeLeft;
        return;
    } else {
        winLossEL.innerHTML = "All done!"
        messageEl.innerHTML = "Your final score is " + timeLeft;
        return;
    }
}

// Generate next question when you click an answer
function generateQuestion(){
    if (qIndex < questions.length){
        clearContent();
        questionEL.textContent = questions[qIndex].question;
        answer = questions[qIndex].answer;
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

// clear precious question content 
function clearContent(){
    var existContent = document.querySelectorAll(".options");
    console.log(existContent.length);
    if (existContent.length == 0){
        return;
    } else {
        for (let i = 0; i < existContent.length; i++){
            existContent[i].parentNode.removeChild(existContent[i]);
        }
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

//Submit initials
submitEL.addEventListener("click", addInitial);
function addInitial(){
    highScoreEL.setAttribute("class", "show");
    var highscore = document.createElement("li");
    highscore.textContent = submitEL.innerHTML;
    highScoreEL.appendChild(highscore);
}