var welcomeEl = document.querySelector("#welcome");
var startbtnEL = document.querySelector("#start-quiz");
var timerEL = document.querySelector("#timer");
var questionEL = document.querySelector("#question");
var quizEl = document.querySelector("#quiz");
var choiceEL = document.querySelector("#choice");
var resultEL = document.querySelector("#result");
var winLossEL = document.querySelector("#win-or-loss");
var messageEl = document.querySelector("#message");
var submitEL = document.querySelector("#initial-submit");
var highScoreEL = document.querySelector("#highscore-list");

var timeLeft;
var qIndex = 0;
var choice;
var answer;

// Store quiz questions and answers
var questions = [
    {question:"Inside which HTML element do we put the JavaScript?",
    choices: ["<script>", "<javascript>", "<scripting>", "<js>"], answer: "<script>"}, 
    {question:"Which built-in method removes the last element from an array and returns that element?",
    choices: ["last()", "get()", "pop()", "None of the above."], answer:"pop()"},
    {question:"Which of the following function of String object returns the index within the calling String object of the first occurrence of the specified value?",
    choices: ["substr()", "search()", "lastIndexOf()", "indexOf()"], answer:"indexOf()"},
    {question:"Which of the following function of String object creates an HTML anchor that is used as a hypertext target?",
    choices: ["anchor()", "link()", "blink()", "big()"], answer:"anchor()"},
    {question:"Which of the following function of Array object creates a new array with all of the elements of this array for which the provided filtering function returns true?",
    choices: ["concat()", "every()", "filter()", "some()"], answer:"filter()"},
    {question:"Which of the following function of Array object represents the source code of an object?",
    choices: ["toSource()", "splice()", "toString()", "unshift()"], answer:"toSource()"},
    {question:"Javascript file has an extension of",
    choices: [".java", ".js", ".javascript", ".xml"], answer:".js"},
]


// Click the start button and start the game
startbtnEL.addEventListener("click", startGame);

//Initialize the game and set up everything 
function startGame(){
    timeLeft = 10;
    qIndex = 0;
    // Hide welcome panel and startquiz btn
    welcomeEl.dataset.state="hidden";
    welcomeEl.setAttribute("class", "hidden");
    startbtnEL.setAttribute("class", "hidden");
    viewHighscore.setAttribute("class", "hidden");
    // Set timer
    timerEL.setAttribute("class", "show");
    countTime();

    //set quiz content
    quizEl.setAttribute("class", "show");
    generateQuestion();

}

// Set timer, if no time left, hide timer
function countTime(){
    var timeInterval = setInterval(function(){
        if(timeLeft === 0 || timeLeft < 0){
            timerEL.setAttribute("class", "hidden");
            clearInterval(timeInterval);
            sendResult();
            return;
        } else if (qIndex == questions.length) {
            console.log(qIndex);
            clearInterval(timeInterval);
            sendResult()
        } else {
            timerEL.textContent = "Time: " + timeLeft;
            timeLeft--;
            return;
        }
    }, 1000) 
}

// Show the result
function sendResult(){
    quizEl.setAttribute("class", "hidden");
    timerEL.setAttribute("class", "hidden");
    resultEL.setAttribute("class", "show");
    if (timeLeft <= 0){
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
    } else{
        sendResult();
    }  
}

// clear precious question content 
function clearContent(){
    var existContent = document.querySelectorAll(".options");
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
var answerEL = document.querySelector("#answer");
choiceEL.addEventListener("click", function(event){
    var element = event.target;
    if (element.matches("button")){
        qIndex++;
        if (element.textContent == answer){
            generateQuestion();
        } else {
            timeLeft -= 5;
            generateQuestion();
        }
    }
})

//Submit initials
var highscores = [];
submitEL.addEventListener("click", function(event){
    event.preventDefault();
    highScoreEL.setAttribute("class", "show");
    resultEL.setAttribute("class", "hidden");
    var initialInput = document.querySelector("#initials");
    var initialText = initialInput.value.trim()
    initialText = initialText + ": " + timeLeft;
    // Return from function early if submitted initial input is blank
    if (initialText === ""){
        return;
    }
    // Add new initial and highscore 
    highscores.push(initialText);
    initialInput.value = "";

    //Store updated highscores in localStorage, re-render the list
    storeHighscore();
    renderHighscores();
       
});

var viewHighscore = document.querySelector("#view-highscores");
viewHighscore.addEventListener("click", renderHighscores);

// Store highscores in localStorage
function storeHighscore(){
    // Stringify and set key in localStorage to highscores array
    localStorage.setItem("highscores", JSON.stringify(highscores));
}

// Render existing high scores
function renderHighscores(){
    welcomeEl.setAttribute("class", "hidden");
    startbtnEL.setAttribute("class", "hidden");
    goBackEl.setAttribute("class", "show");
    clearEL.setAttribute("class", "show");
    highScoreEL.innerHTML = "";
    for (let i = 0; i < highscores.length; i++){
        var highscore = highscores[i];
        var li = document.createElement("li");
        li.setAttribute("class", "names");
        li.textContent = highscore;
        highScoreEL.appendChild(li);
    }
}

// Set GoBack button, go back to the start page
var goBackEl = document.querySelector("#go-back");
goBackEl.addEventListener("click",function(event){
    highScoreEL.setAttribute("class", "hidden");
    goBackEl.setAttribute("class", "hidden");
    clearEL.setAttribute("class", "hidden");
    welcomeEl.setAttribute("class","show");
    startbtnEL.setAttribute("class", "show");
    viewHighscore.setAttribute("class", "show");
    questions.sort();
})

// Clear all highscores
var clearEL = document.querySelector("#clear");
clearEL.addEventListener("click", function(event){
    var existName = document.querySelectorAll(".names");
    if (existName.length == 0){
        return;
    } else {
        for(let i = 0; i < existName.length; i++){
            existName[i].parentNode.removeChild(existName[i]);
        }
    }
    highscores=[];
})


