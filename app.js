const questions = [
  {
    question: "Which variable in JavaScript can't reassign?",
    options: ["int", "var", "let", "const"],
    answer: 3,
  },
  {
    question: "What will `typeof null` return?",
    options: ["'null'", "'object'", "'undefined'", "'number'"],
    answer: 1,
  },
  {
    question: "Which method is used to convert a string to an integer?",
    options: ["parseInt()", "parseFloat()", "Number()", "toFixed()"],
    answer: 0,
  },
  {
    question:
      "Which of these is a correct way to write a function in JavaScript?",
    options: [
      "function myFunc[]",
      "function:myFunc()",
      "def myFunc()",
      "function myFunc()",
    ],
    answer: 3,
  },
  {
    question: "What is the output of: `console.log(2 + '2')`?",
    options: ["4", "'22'", "NaN", "undefined"],
    answer: 1,
  },
  {
    question: "Which operator is used to compare both value and type?",
    options: ["==", "=", "===", "!="],
    answer: 2,
  },
  {
    question: "What will this code output?\n`let x; console.log(x);`",
    options: ["null", "0", "undefined", "Error"],
    answer: 2,
  },
  {
    question: "Which method selects an element by its ID in the DOM?",
    options: [
      "document.querySelectorAll('#id')",
      "document.getElementByClass()",
      "document.getElementById()",
      "document.getElementsByTagName()",
    ],
    answer: 2,
  },
  {
    question: "How do you write a single-line comment in JavaScript?",
    options: [
      "# This is a comment",
      "// This is a comment",
      "<-- This is a comment -->",
      "/* This is a comment */",
    ],
    answer: 1,
  },
  {
    question: "Which loop is guaranteed to execute at least once?",
    options: ["for", "while", "foreach", "do...while"],
    answer: 3,
  },
];

let i;
if (localStorage.getItem("currentQuestion")) {
  i = parseInt(localStorage.getItem("currentQuestion"));
} else {
  i = 0;
}

let answer;
if (localStorage.getItem("score")) {
  answer = parseInt(localStorage.getItem("score"));
} else {
  answer = 0;
}

const questionNo = document.querySelector("#question-number");
const questionText = document.querySelector("#question");
const options = document.querySelectorAll(".option");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");

const submit = document.getElementById("submit");

function display(index) {
  const question = questions[index];
  console.log(question);

  questionNo.innerHTML = `Question ${index + 1} of ${questions.length}`;
  questionText.innerHTML = question.question;
  options.forEach((option, index) => {
    option.innerHTML = question.options[index];

    option.onclick = () => {
      options.forEach((opt) => 
      opt.classList.remove("selected"));
      option.classList.add("selected");

      if (index === question.answer) {
        answer = answer + 1;
        console.log("score = ", answer);
        localStorage.setItem("score", answer);
      }
    };
  });

  if (index === questions.length - 1) {
    submit.style.display = "inline-block";
  } else {
    submit.style.display = "none";
  }

  if (index > 0) {
    prev.style.display = "inline-block";
  } else {
    prev.style.display = "none";
  }}

display(i);

next.addEventListener("click", () => {
  if (i < questions.length - 1) {
    i++;
    console.log(i);
    localStorage.setItem("currentQuestion", i);
    display(i);
  }
});

prev.addEventListener("click", () => {
  if (i > 0) {
    i--;
    console.log(i);
    localStorage.setItem("currentQuestion", i);
    display(i);
  }
});

let timer = 180;
let timerDisplay = document.getElementById("timer");

let interval = setInterval(function () {
  let minutes = Math.floor(timer / 60);
  let seconds = timer % 60;
  timerDisplay.innerHTML = `Time Left: ${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
  timer--;

  if (timer < 0) {
    clearInterval(interval);
    alert("Time over!");
    localStorage.clear();
    location.reload();
  }
}, 1000);

let reset = document.getElementById("reset");
reset.addEventListener("click", () => {
  alert("quiz has been restarted !");
  localStorage.clear();
  location.reload();
});

submit.addEventListener("click", () => {
  alert("Quiz over and you got " + answer + " marks out of 10");
  localStorage.clear();
  location.reload();
});