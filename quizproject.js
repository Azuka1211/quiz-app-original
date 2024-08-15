const questions = [
  {
    question: "What is largest organ of the Human body?",
    answers: [
      { text: "Skull", correct: false },
      { text: "Skin", correct: true }, 
      { text: "Heart", correct: false }, 
      { text: "Brain", correct: false }, 
    ],
  },
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true }, 
      { text: "Lisbon", correct: false }, 
      { text: "Berlin", correct: false }, 
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true }, 
      { text: "Jupiter", correct: false }, 
      { text: "Venus", correct: false }, 
    ],
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    answers: [
      { text: "Osmium", correct: false },
      { text: "Oxygen", correct: true }, 
      { text: "Gold", correct: false }, 
      { text: "Zinc", correct: false },
    ],
  } 
];

let currentQuestionIndex = 0; 
let score = 0; 
let timer; 
let timeLeft = 20;

function startQuiz() {
  currentQuestionIndex = 0; // Resets the question index to the first question
  score = 0; // Resets the score to 0
  setNextQuestion(); // Calls the function to display the next question
}


function setNextQuestion() {
  resetState(); // Clears the previous question's state (like answers and timer)
  showQuestion(questions[currentQuestionIndex]); // Displays the current question
  startTimer(); // Starts the timer for the current question
}


function showQuestion(question) {
  // Displays the text of the current question
  document.getElementById("question").innerText = question.question;

  // Loops through each possible answer for the current question
  question.answers.forEach((answer) => {
    const button = document.createElement("button"); // Creates a new button element
    button.innerText = answer.text; // Sets the button's text to the answer choice
    button.classList.add("answer-button"); // Adds a class for styling the button
    button.addEventListener("click", () =>
      selectAnswer(button, answer.correct)
    ); 
    document.getElementById("answer-buttons").appendChild(button); 
  });
}

function resetState() {
  document.getElementById("next-button").disabled = true;
  while (document.getElementById("answer-buttons").firstChild) {
    document
      .getElementById("answer-buttons")
      .removeChild(document.getElementById("answer-buttons").firstChild);
  }
  
}


function selectAnswer(button, correct) {
  clearInterval(timer);
  if (correct) {
    button.classList.add("selected");
    score++;
  } else {
    button.style.backgroundColor = "red";
  }
  document.getElementById("next-button").disabled = false; 
  document.getElementById("score").innerText = `Score: ${score}`;
}

function nextQuestion() {
  currentQuestionIndex++; 
  if (currentQuestionIndex < questions.length) {
    setNextQuestion(); 
  } else {
    document.getElementById("question").innerText = "Quiz Over!"; 
    resetState();
    document.getElementById("next-button").disabled = true;
  }
}

function startTimer() {
  timeLeft = 20; 
  document.getElementById("timer").innerText = `Time left: ${timeLeft}s`; 

  timer = setInterval(() => {
    timeLeft--; // Decreases the time left by 1 second
    document.getElementById("timer").innerText = `Time left: ${timeLeft}s`; // Updates the timer display
    if (timeLeft <= 0) {
      t
      clearInterval(timer); 
      autoMoveToNext(); 
    }
  }, 1000); 
}


function resetTimer() {
  clearInterval(timer); // Stops the timer
  document.getElementById("timer").innerText = ""; // Clears the timer display on the screen
}


function autoMoveToNext() {
  alert("Time's up! Moving to the next question."); // Alerts the user that time is up
  nextQuestion(); // Moves to the next question
}


function usePhoneAFriend() {
  // Finds the correct answer for the current question and alerts the user
  alert(
    "Your friend thinks the answer is: " +
      questions[currentQuestionIndex].answers.find((answer) => answer.correct)
        .text
  );
  document.getElementById("phone-a-friend").disabled = true; // Disables the "Phone a Friend" button after use
}


function useFiftyFifty() {
  const correctAnswer = questions[currentQuestionIndex].answers.find(
    (answer) => answer.correct
  ); // Finds the correct answer
  const randomIncorrect = questions[currentQuestionIndex].answers.find(
    (answer) => !answer.correct
  ); // Finds a random incorrect answer

  // Loops through each button and hides the incorrect answers except for one
  document.getElementById("answer-buttons").childNodes.forEach((button) => {
    if (
      button.innerText !== correctAnswer.text &&
      button.innerText !== randomIncorrect.text
    ) {
      button.style.display = "none"; // Hides the button
    }
  });
  document.getElementById("fifty-fifty").disabled = true; // Disables the "50/50" button after use
}

// This function simulates the "Ask the Audience" lifeline
function useAskAudience() {
  // Finds the correct answer for the current question and alerts the user
  alert(
    "The audience suggests the answer is: " +
      questions[currentQuestionIndex].answers.find((answer) => answer.correct)
        .text
  );
  document.getElementById("ask-audience").disabled = true; // Disables the "Ask the Audience" button after use
}

// This line starts the quiz as soon as the page is loaded
startQuiz();
