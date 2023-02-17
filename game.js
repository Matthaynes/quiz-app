const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
let timeValue = 15;
let questions = [
  {
    question: "How do you make an 'if' statement in JavaScript?",
    choice1: 'maybe (condition)',
    choice2: 'if (condition){code  }',
    choice3: 'what if (condtion)',
    choice4: 'It (conditon)',
    answer: 2,
  },
  {
    question:
      "What tag do you use to link JavaScript in HTML?",
    choice1: "<script>",
    choice2: "<css>",
    choice3: "<rohan>",
    choice4: "None of the above",
    answer: 1,
  },
  {
    question: "Which of the following is an example of the else statement?",
    choice1: "else if(do the thing)",
    choice2: "else(play)",
    choice3: "if (hour < 18) { greeting = 'Good day';} else { greeting = 'Good evening';}",
    choice4: "maybe else( chess)",
    answer: 3,
  },
  {
    question: "What does JS stand for?",
    choice1: "Just stand",
    choice2: "Just stuff",
    choice3: "Job Stuff",
    choice4: "JavaScript",
    answer: 4,
  },
  {
    question: "How do you make an 'else if' statement in JavaScript?",
    choice1: 'maybe else(condition)',
    choice2: 'ifelse (condition){code  }',
    choice3: 'if (time < 10) {greeting = "Good morning";} else if (time < 20) {greeting = "Good day";} else { greeting = "Good evening";}',
    choice4: 'It if else(conditon)',
    answer: 3,
  },
  {
    question:
      "Which is the code to return the value of x rounded up to its nearest integer?",
    choice1: "Math.ceil(4.9);",
    choice2: ".round",
    choice3: "please round.HTML",
    choice4: "None of the above",
    answer: 1,
  },
  {
    question: "Which of the following is the code to return the value of x rounded down to to its nearest integer?",
    choice1: "else round down(do the thing)",
    choice2: "Math.floor(4.9);",
    choice3: "if (hour < 18) { greeting = 'Good day';} else { greeting = 'Good evening';}",
    choice4: "pls round down( chess)",
    answer: 2,
  },
  {
    question: "Which statement tells the browser to write Hello Dolly inside an HTML element with id, demo",
    choice1: "write= 'Hello Dolly';",
    choice2: "Print ='Hello Dolly';",
    choice3: "None of the other answers",
    choice4: "document.getElementById('demo').innerHTML = 'Hello Dolly.'';",
    answer: 4,
  },
   {
    question: "Which of the following is an example of how you do a single line comment in JavaScript?",
    choice1: "//comment",
    choice2: "{{comment",
    choice3: "?||\comment",
    choice4: "/\/\/\comment",
    answer: 1,
  },
  {
    question: "Which of the following is an example of how you do a multi line comment?",
    choice1: "// comment \\",
    choice2: "--comment--",
    choice3: "/* comments */",
    choice4: "All of the other answers",
    answer: 3,
  },

  
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()
  startTimer(15); //calling startTimer function
  startTimerLine(0); //calling startTimerLine function
}

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('/end.html')
  }

  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionsIndex, 1)

  acceptingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()

    }, 1000)
  })
})

incrementScore = num => {
  score += num
  scoreText.innerText = score + "%"
}

startGame()