$(function () {
  handleAnswerFeedback();
  handleAnswerSubmits();
  beginQuiz();
  renderQuestionCard();
});

var state = {
  questions: [
    {
      question: 'What did Jerry accidentally call Michael Richard\'s character in the pilot episode?',
      answers: ['Kramer', 'Keagan', 'Kessler', 'Ketchup'],
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
                'Popeye\'s'],
      correctAnswer: 'Tyler\'s Chicken'
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
    }
  ],
  currentQuestionIndex: 0,
  correctCount: 0,
  prevAnswerCorrect: false

};

//MANAGE STATE


function resetQuiz(state) {
  state.correctCount = 0
  state.currentQuestionIndex = 0;
}

function renderQuestionCard(){
  var currentQuestionObj = state.questions[state.currentQuestionIndex];
  renderQuestionPrompt();
  renderQuestionChoices(currentQuestionObj.answers);
}

function renderQuestionPrompt() {
  var progressHTML = '<span>(' + (state.currentQuestionIndex + 1) + '/' + state.questions.length + ')</span>'
  var questionText =  state.questions[state.currentQuestionIndex].question;
  $('.js-question-text').html(progressHTML + questionText);
}

function renderQuestionChoices(answers){ //array
  $('#question-form label').each(function(index, label){
    $(this).find('input').attr('value', answers[index]);
    $(this).find('span').text(answers[index]);
  });
}

function checkAnswer(userChoice){
  var correctChoice = state.questions[state.currentQuestionIndex].correctAnswer;
  if(userChoice === correctChoice){
    alert('RIGHT');
  } else {
    alert('wrong');
  }
}

//DOM MANIPULATION (RENDERS)

function beginQuiz(){
  $('#start-quiz').click(function(e){
    $('#my-quiz').removeClass('hidden');
    $('#start-quiz').addClass('hidden');
  });
}

//EVENT HANDLERS

function handleAnswerSubmits() {
  $('#submit-answer').click(function(e){
    e.preventDefault();
    var userChoice = $('input[name="answerChoice"]:checked').val();
    checkAnswer(userChoice);
  });
}


function handleAnswerFeedback() {
  //OPEN MODAL
  $('#submit-answer').on('click', function (e) {
    var targetPopupClass = $(this).attr('data-popup-open');
    $('[data-popup="' + targetPopupClass + '"]').fadeIn(350);
    e.preventDefault();
  });
  //CLOSE MODAL
  $('#close-feedback-modal').on('click', function (e) {
    var targetPopupClass = $(this).attr('data-popup-close');
    $('[data-popup="' + targetPopupClass + '"]').fadeOut(350);
    e.preventDefault();
  });
}