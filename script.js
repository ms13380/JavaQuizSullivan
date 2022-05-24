
var Body = document.getElementById("quiz");
var results = document.getElementById("results");
var finalscore = document.getElementById("Score");
var gameend = document.getElementById("gameend");
var questions = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startbutton = document.getElementById("startbuttn");
var begin = document.getElementById("openpage");
var highscore = document.getElementById("highscore");
var scorepage = document.getElementById("scorePage");
var scoreinitials = document.getElementById("initials");
var DisplayName = document.getElementById("hsinitials");
var endgame = document.getElementById("end");
var submitScore = document.getElementById("submit");
var dsphighschore = document.getElementById("hscore");
var button1 = document.getElementById("a");
var button2 = document.getElementById("b");
var button3 = document.getElementById("c");
var button4 = document.getElementById("d");

var questions = [{
    question: "What does OOPs stand for?",
    choiceA: "OOPSIE DAISY I DELETED EVERYTHING",
    choiceB: "Out of programming",
    choiceC: "Object Oriented Programming",
    choiceD: "Online operational potential",
    correctAnswer: "c"},
  {
    question: "What is an array?",
    choiceA: "A dynamic data type",
    choiceB: "A set of related static data",
    choiceC: "A dictionary of variables",
    choiceD: "A type of button",
    correctAnswer: "b"},
   {
    question: "What is an API?",
    choiceA: "A Productive Intellect",
    choiceB: "3.14",
    choiceC: "Allocated Programing Information",
    choiceD: "Application Programming Interface",
    correctAnswer: "d"},
    {
    question: "What language do you use to style a page?",
    choiceA: "CSS",
    choiceB: "javascript",
    choiceC: "Python",
    choiceD: "Latin",
    correctAnswer: "a"},
    {
    question: "What comes after a function?",
    choiceA: "()",
    choiceB: "[]",
    choiceC: "{}",
    choiceD: "$$",
    correctAnswer: "a"},  
    {
    question: "What is used for encapsulation in Java?",
    choiceA: "Functions",
    choiceB: "Classes",
    choiceC: "Variables",
    choiceD: "Code",
    correctAnswer: "b"},
    {
    question: "Which of the following is not a primitive data type?",
    choiceA: "String",
    choiceB: "Number",
    choiceC: "Symbol",
    choiceD: "Arrays",
    correctAnswer: "d"},
    ];

var finalQuestionIndex = questions.length;
var currentQuestionIndex = 0;
var timeLeft = 5;
var timerInterval;
var score = 0;
var correct;

function generateQuizQuestion(){
    gameend.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = questions[currentQuestionIndex];
    questions.innerHTML = "<p>" + currentQuestion.question + "</p>";
    button1.innerHTML = currentQuestion.choiceA;
    button2.innerHTML = currentQuestion.choiceB;
    button3.innerHTML = currentQuestion.choiceC;
    button4.innerHTML = currentQuestion.choiceD;
};

startbutton.addEventListener("click",startQuiz);

function startQuiz(){
    gameend.style.display = "none";
    begin.style.display = "none";
    generateQuizQuestion();
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    Body.style.display = "block";
}
function showScore(){
    Body.style.display = "none"
    gameend.style.display = "flex";
    clearInterval(timerInterval);
    scoreinitials.value = "";
    finalscore.innerHTML = "You got " + score + " out of " + questions.length + " correct!";
}

submitScore.addEventListener("click", function highscore(){
    
    
    if(scoreinitials.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscore = JSON.parse(localStorage.getItem("savedHighscore")) || [];
        var currentUser = scoreinitials.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameend.style.display = "none";
        highscore.style.display = "flex";
        scorepage.style.display = "block";
        endgame.style.display = "flex";
        
        savedHighscore.push(currentHighscore);
        localStorage.setItem("savedHighscore", JSON.stringify(savedHighscore));
        generateHighscores();

    }
    
});

function generateHighscores(){
    DisplayName.innerHTML = "";
    dsphighschore.innerHTML = "";
    var highscore = JSON.parse(localStorage.getItem("savedHighscore")) || [];
    for (i=0; i<highscore.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscore[i].name;
        newScoreSpan.textContent = highscore[i].score;
        DisplayName.appendChild(newNameSpan);
        dsphighschore.appendChild(newScoreSpan);
    }
}

function showHighscore(){
    begin.style.display = "none"
    gameend.style.display = "none";
    highscore.style.display = "flex";
    scorepage.style.display = "block";
    endgame.style.display = "flex";

    generateHighscores();
}

function clearScore(){
    window.localStorage.clear();
    DisplayName.textContent = "";
    dsphighschore.textContent = "";
}

function replayQuiz(){
    highscore.style.display = "none";
    gameend.style.display = "none";
    begin.style.display = "flex";
    timeLeft = 75;
    score = 0;
    currentQuestionIndex = 0;
}

function checkAnswer(answer){
    correct = questions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
    }else{
        showScore();
    }
}
