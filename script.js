const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const ratioElement = document.getElementById('ratio'); 

let shuffledQuestions, currentQuestionIndex;
let totalCorrect = 0;
let totalQuestions = 0; 

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  totalCorrect = 0;
  totalQuestions = questions.length;
  ratioElement.innerText = '';
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    totalCorrect++;
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
    const ratio = totalCorrect + '/' + totalQuestions;
    ratioElement.innerText = 'Total Score: ' + ratio;
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: 'What is IoT?',
    answers: [
      { text: 'Internet of Things', correct: true },
      { text: 'Internet of Thinks', correct: false }
    ]
  },
  {
    question: 'What is a tiny bit of data that a website stores on your web browser?',
    answers: [
      { text: 'web', correct: false },
      { text: 'page rank', correct: false },
      { text: 'web crawler', correct: false },
      { text: 'web cookie', correct: true }
    ]
  },
  {
    question: 'What is like a smart explorer on the internet. It starts from a few important web addresses, looks at the content of those pages, and finds new web addresses?',
    answers: [
      { text: 'web', correct: false },
      { text: 'page rank', correct: false },
      { text: 'web crawler', correct: true },
      { text: 'web cookie', correct: false }
    ]
  },
  {
    question: 'What is like a voting system for web pages?',
    answers: [
      { text: 'page queue', correct: false },
      { text: 'page rank', correct: true }
    ]
  }
];
