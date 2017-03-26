$(function () {
  beginQuiz();
  handleAnswerFeedback();
  handleAnswerSubmits();
  renderQuestionCard();
});

var state = {
  questions: [
    {
      question: 'What did Jerry accidentally call Michael Richard\'s character in the pilot episode?',
      answers: ['Kramer',
                'Keagan',
                'Kessler',
                'Ketchup'],
      correctAnswer: 'Kessler'
    },
    {
      question: 'How many seasons of Seinfeld are there?',
      answers: [10,6,12,9],
      correctAnswer: 9 
    },
    {
      question: 'What is the name of the Fried Chicken chain that opens up across the street from Kramer?',
      answers: ['Tyler\'s Chicken', 
                'Kentucky Fried Cicken',
                'Brendan\'s Southern Style Poultry',
                'Kenny Rogers Roasters'],
      correctAnswer: 'Kenny Rogers Roasters'
    },
    {
      question: 'Why did George give up his Gore-Tex jacket to the liqor store clerk?',
      answers: ['George was hypnotized by the clerk',
                'George destroyed some merchandise and had no cash to reimburse the store', 
                'George felt bad for the clerk since there was no heat in the building',
                'George lost a bet'],
      correctAnswer: 'George destroyed some merchandise and had no cash to reimburse the store'
    },
    {
      question: 'What is George\'s debit card code?',
      answers: ['JERRY',
                'BOSCO',
                'BOBOS',
                'COSMO'],
      correctAnswer: 'BOSCO'
    },
    {
      question: 'What is the name of the raincoat Mr. Seinfeld invented?',
      answers: ['The empire',
                'The executive',
                'The prestige',
                'The trench'],
      correctAnswer: 'The executive'
    }
  ],
  currentQuestionIndex: 0,
  correctCount: 0,

};


function resetQuiz() {
  state.correctCount = 0
  state.currentQuestionIndex = 0;
}

function renderQuestionCard() {
  var currentQuestionObj = state.questions[state.currentQuestionIndex];
  renderQuestionPrompt();
  renderQuestionChoices(currentQuestionObj.answers);
}

function renderQuestionPrompt() {
  var progressHTML = '<span>(' + (state.currentQuestionIndex + 1) + '/' + state.questions.length + ')</span>'
  var questionText = state.questions[state.currentQuestionIndex].question;
  $('.js-question-text').html(progressHTML + questionText);
}

function renderQuestionChoices(answers) { //array
  $('#question-form label').each(function (index, label) {
    $(this).find('input').attr('value', answers[index]);
    $(this).find('input').prop('checked', false); //render choices without previous selection.
    $(this).find('span').text(answers[index]);
  });
}

function renderFinalResults() {
  $('#my-quiz').addClass('hidden');
  $('#start-quiz-over').removeClass('hidden');
  var element = $('.js-final-results');
  element.html('<h2>' + 'You got ' + state.correctCount + ' out of ' + state.questions.length + ' right!' + '</h2>');
  handleQuizRestart();
}

function checkAnswer(userChoice) {
  var correctChoice = state.questions[state.currentQuestionIndex].correctAnswer;
  if (userChoice == correctChoice) {
    state.correctCount++;
    renderQuestionFeedback(true);
  } else {
    renderQuestionFeedback(false);
  }
  state.currentQuestionIndex++;
  if (state.currentQuestionIndex == state.questions.length) {
    renderFinalResults()
  } else {
    renderQuestionCard();
  }
}

function renderQuestionFeedback(boolean) {
  var feedback = $('.popup-inner h2');
  boolean ? feedback.text('RIGHT') : feedback.text('WRONG')
}

function beginQuiz() {
  $('#start-quiz').click(function (e) {
    $('#my-quiz').removeClass('hidden');
    $('#start-quiz').addClass('hidden');
  });
}

function handleQuizRestart() {
  $('#start-quiz-over').on('click', function (e) {
    $('#my-quiz').removeClass('hidden');
    $('#start-quiz-over').addClass('hidden');
    $('.js-final-results').text('');
    resetQuiz();
    renderQuestionCard();
  });
}

function handleAnswerSubmits() {
  $('#submit-answer').click(function (e) {
    e.preventDefault();
    var userChoice = $('input[name="answerChoice"]:checked').val();
    checkAnswer(userChoice);
  });
}


function handleAnswerFeedback() {
  //OPEN MODAL
  $('#submit-answer').on('click', function (e) {
    var targetPopupClass = $(this).attr('data-popup-open');
    $('[data-popup="' + targetPopupClass + '"]').fadeIn(50);
    e.preventDefault();
  });
  //CLOSE MODAL
  $('#close-feedback-modal').on('click', function (e) {
    var targetPopupClass = $(this).attr('data-popup-close');
    $('[data-popup="' + targetPopupClass + '"]').fadeOut(50);
    e.preventDefault();
  });
}