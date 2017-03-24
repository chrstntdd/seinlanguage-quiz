$(function () {
  handleAnswerFeedback();
});

var state = {
  questions: [
    {
      question: 'What did Jerry accidentally call Michael Richard\'s character in the pilot episode?',
      answers: ['Kramer', 'Keagan', 'Kessler', 'Ketchup'],
      correctAnswerIndex: 2
    },
    {
      question: 'How many seasons of Seinfeld are there?',
      answers: [10,6,12,9],
      correctAnswerIndex: 3
    },
    {
      question: 'What is the name of the Fried Chicken chain that opens up across the street from Kramer?',
      answers: ['Tyler\'s Chicken', 
                'Kentucky Fried Cicken',
                'Brendan\'s Southern Style Poultry',
                'Popeye\'s'],
      correctAnswerIndex: 0
    },
    {
      question: 'Why did George give up his Gore-Tex jacket to the liqor store clerk?',
      answers: ['George was hypnotized by the clerk',
                'George destroyed some merchandise and had no cash to reimburse the store', 
                'George felt bad for the clerk since there was no heat in the building',
                'George lost a bet'],
      correctAnswerIndex: 1
    },
    {
      question: 'What is George\'s debit card code?',
      answers: ['JERRY',
                'BOSCO',
                'BOBOS',
                'COSMO'],
      correctAnswerIndex: 1
    }
  ],
  currentQuestionIndex: 0,
  correctCount: 0,
  route: 'start',  //options: 'start','question','final-feedback'
  prevAnswerCorrect: false

};

//MANAGE STATE

function setRoute(state, route) {
  state.route = route;
}

function resetQuiz(state) {
  state.correctCount = 0
  state.currentQuestionIndex = 0;
  setRoute(state, 'start');
}

function nextQuestion(state) {
  var questionNum = state.currentQuestionIndex;
  questionNum++;
  questionNum === state.questions.length ?
    setRoute(state, 'final-feedback') :
    setRoute(state, 'question');
}


//DOM MANIPULATION (RENDERS)

function renderQuestionCard(state, element) {
  renderQuestionText(state, element.find('.js-question-text'));
  renderQuestionCount(state.element.find('.js-question-count'));
  renderChoices(state, element.find('.answer'));
  if (currentQuestionIndex > 0) {
    renderAnswerFeedback(state, element.find('.js-answer-feedback'));
  }
}

function renderQuestionText(state, element) {
  var currentQuestion = state.questions[state.currentQuestionIndex];
  element.text(currentQuestion.question);
}

function renderQuestionCount(state, element) {
  var questionCount = (state.currentQuestionIndex + 1) + '/' + state.questions.length;
  element.html(questionCount);
}

function renderQuestionChoices(state, element) {
  var currentQuestion = state.questions[state.currentQuestionIndex];
  var questionChoices = currentQuestion.answers.map((answer, index) =>
    (
      '<label class="answer" ' +
      '<input type="radio" name="answerChoice" value="' + index + '">' +
      answer +
      '</label>'
    )
  );
  element.html(questionChoices);
}


function renderFinalFeedback(state, element) {
  var feedbackHTML = state.score + ' out of ' + state.questions.length + ' questions right.';
  element.html(feedbackHTML);
}

//EVENT HANDLERS

function handleStartQuiz() {
  /*
  After start button is pressed, load first question card.
  */
}

function handleAnswerSubmits() {
  /*
  When the submit answer button is pressed, check answer, update state score object, 
  increment currentQuestionIndex, render feedback response, load next question.
  */
}

function handleEndQuiz() {
  /*
  Once the currentQuestion is equal to the length of questions array,
  run renderFinalFeedback, present start over button.
  */
}

function handleAnswerFeedback() {
  //OPEN MODAL
  $('[data-popup-open]').on('click', function (e) {
    var targetPopupClass = $(this).attr('data-popup-open');
    $('[data-popup="' + targetPopupClass + '"]').fadeIn(350);
    e.preventDefault();
  });
  //CLOSE MODAL
  $('[data-popup-close]').on('click', function (e) {
    var targetPopupClass = $(this).attr('data-popup-close');
    $('[data-popup="' + targetPopupClass + '"]').fadeOut(350);
    e.preventDefault();
  });
}