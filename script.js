let userTime = prompt("Enter the time you want to set in seconds:");
let timeLeft = userTime;
const timerElement = document.getElementById("timer");
function startTimer() {
  const timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerElement.innerText = "Time's up!";
      showResult();
    } else {
      const minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      timerElement.innerText = `${minutes}:${seconds}`;
      timeLeft--;
    }
  }, 1000);
}

const quizData = [
  {
    question: "What country is this?",
    image: "poland.jpeg",
    options: ["Poland", "Monaco", "Indonesia", "Austria"],
    answer: "Poland"
  },
  {
    question: "Which country is this?",
    image: "chad.jpg",
    options: ["Romania", "Andorra", "Chad", "Moldova"],
    answer: "Chad"
  },
  {
    question: "What is the capital of Canada?",
    image: "ottowa.jpg",
    options: ["Toronto", "Ottowa", "Quebec", "Vancouver"],
    answer: "Ottowa"
  },
  {
    question: "Which is the captial of South Korea?",
    image: "Seoul.jpg",
    options: ["Busan", "Incheon", "Pyongyang", "Seoul"],
    answer: "Seoul"
  },
  {
    question: "What is the 2nd richest country in GDP?",
    image: "OSK.jpg",
    options: ["Japan", "Germany", "United States of America", "China"],
    answer: "China"
  },
  {
    question:" guess the country by the emojis🍣🗻🍜",
    options:["Japan","China"," South Korea","Thailand"],
    answer:"Japan"
  },
];



const questionElement = document.getElementById("question");
const imageContainerElement = document.getElementById("image");
const optionsElement = document.getElementById("options");
const progressBar = document.getElementById("progress-bar");

let currentQuestion = 0;
let score = 0;

let myArr = [];
for (let i = 0; i < 6; i++) {
  let randomIndex = Math.floor(Math.random() * quizData.length);
  while (myArr.some(element => element.question === quizData[randomIndex].question)) {
    randomIndex = Math.floor(Math.random() * quizData.length);
  }
  myArr.push(quizData[randomIndex]);
}

function showQuestion() {
  const question = myArr[currentQuestion];
  questionElement.innerText = question.question;        

  const imageElement = document.createElement("img");
  imageElement.src = question.image;
  imageContainerElement.innerHTML = "";
  imageContainerElement.appendChild(imageElement);

  optionsElement.innerHTML = "";
  question.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    optionsElement.appendChild(button);
    button.addEventListener("click", selectAnswer);
  });

  updateProgressBar();
}


function selectAnswer(e) {
  const selectedButton = e.target;
  const answer = myArr[currentQuestion].answer;

  if (selectedButton.innerText === answer) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < myArr.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const quiz = document.getElementById("quiz");
  const scoreElement = document.createElement("h3");
  scoreElement.innerText = `Your score: ${score}/${myArr.length}`;
  const messageElement = document.createElement("h2");
  const tryAgainButton = document.createElement("button");

  if (score <= 3) {
    messageElement.innerText = "Hmm, you can do better. Try again!";
  } else {
    messageElement.innerText = "Nice work! You did great.";
  }

  tryAgainButton.innerText = "Try Again";
  tryAgainButton.addEventListener("click", () => {
    window.location.reload(); 
  });
  quiz.innerHTML = '';
  quiz.appendChild(scoreElement);
  quiz.appendChild(messageElement);
  quiz.appendChild(tryAgainButton);
}

function updateProgressBar() {
  const progress = ((currentQuestion + 1) / myArr.length) * 100; 
  progressBar.style.width = `${progress}%`;
}



showQuestion();
startTimer();