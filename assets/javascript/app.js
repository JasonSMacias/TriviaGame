// array of 10 question/answer/wrongAnswers objects from questions.js
questions = [sfq1,sfq2,sfq3,sfq4,sfq5,sfq6,sfq7,sfq8,sfq9,sfq10];

// I don't understand why this console.log doesn't show the full array, as defined above, but as it exists after having its elements spliced out
console.log("initial questions:");
console.log(questions);

// setting variables
questionsHTM = $("#question");
answer1HTM = $("#answer1");
answer2HTM = $("#answer2");
answer3HTM = $("#answer3");
answer4HTM = $("#answer4");
radio1HTM = $("#radio1");
radio2HTM = $("#radio2");
radio3HTM = $("#radio3");
radio4HTM = $("#radio4");
questionsCorrectHTM = $("#modal-number-correct");

//setting up randomized order questions array
var randomOrderQuestions = [];

// setting up while loop to create a new array of questions in a random order
  while (randomOrderQuestions.length<10) {
    // setting up random index # from (remaining) questions array
    var randomIndex = Math.floor(Math.random() * questions.length);
    
    // pushing object at that index into randomOrderQuestions array
    randomOrderQuestions.push(questions[randomIndex]);
    
    // removing the element copied to randomOrderQuestions from questions
    questions.splice(randomIndex,1);
    
  }
  // logging random array, and original array, to make sure it has had all elements spliced out
console.log("random order questions:");
console.log(randomOrderQuestions);
console.log("final questions:");
console.log(questions);

// variable to keep track of which question/answer object program is on
QAObject = 0;

// variable to hold number of questions correct
questionsCorrect = 0;

// variable to keep track of whether last question was true or false;
lastQuestionWas = false;

// variable to hold setInterval running timer
var intervalId;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;
var time = 0;

// variable to keep track of whether current QAObject value is odd or even
QAObjectIsOdd = true;


// functions

// function to determine whether QAObject variable is currently odd or even and record it

function oddEven(number) {

  if (number % 2 == 0) {
    QAObjectIsOdd = false;
    }
  else {
    QAObjectIsOdd = true;
  }
}


function reset() {

  time = 0;

  // reset display div
  $("#display").text("00:00");

}
function start() {

  // Use setInterval to start the count here and set the clock to running.
  if (!clockRunning) {
    intervalId = setInterval(count, 1000);
    clockRunning = true;
  }
}
function stop() {

  // Use clearInterval to stop the count here and set the clock to not be running.
  clearInterval(intervalId);
  clockRunning = false;
}
function count() {

  time++;

  // Get the current time, pass that into the timeConverter function,and save the result in a variable.
  var converted = timeConverter(time);
  console.log(converted);

  // display converted time on page
  $("#display").text(converted);
  if (time==30){
    stop();
    reset();
    $("#modal-correct-answer").html(randomOrderQuestions[QAObject].answer);
    $("#modal2").addClass("is-active");
    $("#continue2").click(function(){
    $(".modal").removeClass("is-active");
    $("input").prop('checked', false);

    lastQuestionWas = false;
    // reference to function to put up new question and start timer again
    
    NextQuestion();
    
    });

  }
}
// will not need minutes for this, will remove unnecessary code later, as i swiped this from a class activity and don't want to mess with it just yet since it is working
function timeConverter(t) {

  var minutes = Math.floor(t / 60);
  var seconds = t - (minutes * 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (minutes === 0) {
    minutes = "00";
  }
  else if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return minutes + ":" + seconds;

}
// doing this seems to be necessary to keep timer from getting messed up after reloading
stop();
reset();



function NextQuestion() {
  if (clockRunning===false){
    QAObject++;
    oddEven(QAObject);
    console.log("QAObject odd: "+QAObjectIsOdd);
    // ending quiz if after last question
    if (QAObject>9){
      stop();
      reset();
      gameEnd();
      return(false);
    }
      // setting up two orderings of answers, that each differ from the way the answers are ordered on the initial question, depending on whether number of current object number is odd or even, to give some variety to where correct answer appears on the list.  Then starting.
      if (QAObjectIsOdd == true) {
        questionsHTM.text(randomOrderQuestions[QAObject].clue);
        console.log("Question/answer object: "+QAObject);
        answer2HTM.html(randomOrderQuestions[QAObject].answer);
        radio2HTM.val(true);
        answer3HTM.html(randomOrderQuestions[QAObject].wrongAnswer1);
        radio3HTM.val(false);
        answer4HTM.html(randomOrderQuestions[QAObject].wrongAnswer2);
        radio4HTM.val(false);
        answer1HTM.html(randomOrderQuestions[QAObject].wrongAnswer3);
        radio1HTM.val(false);
        start();
      }

      if (QAObjectIsOdd == false) {
        questionsHTM.text(randomOrderQuestions[QAObject].clue);
        console.log("Question/answer object: "+QAObject);
        answer4HTM.html(randomOrderQuestions[QAObject].answer);
        radio4HTM.val(true);
        answer1HTM.html(randomOrderQuestions[QAObject].wrongAnswer1);
        radio1HTM.val(false);
        answer2HTM.html(randomOrderQuestions[QAObject].wrongAnswer2);
        radio2HTM.val(false);
        answer3HTM.html(randomOrderQuestions[QAObject].wrongAnswer3);
        radio3HTM.val(false);
        start();
      }

    
  }
}

function gameEnd() {
  $(questionsCorrectHTM).text(questionsCorrect);
  $("#modal3").addClass("is-active");
}

  
  // putting initial question into html and set radio values to agree
  questionsHTM.text(randomOrderQuestions[QAObject].clue);
  answer1HTM.html(randomOrderQuestions[QAObject].answer);
  radio1HTM.val(true);
  answer2HTM.html(randomOrderQuestions[QAObject].wrongAnswer1);
  radio2HTM.val(false);
  answer3HTM.html(randomOrderQuestions[QAObject].wrongAnswer2);
  radio3HTM.val(false);
  answer4HTM.html(randomOrderQuestions[QAObject].wrongAnswer3);
  radio4HTM.val(false);

  // putting initial answers into html *******************




  //setting get ready modal to pop up on page load
  $("#modal1").addClass("is-active");
  // setting modal okay button to close and start timer
  $("#continue").click(function(){
    $("#modal1").removeClass("is-active");
    start();
  });

// Setting up event listener for submit button
$("#submit").click(function(){
  event.preventDefault();
  if ($("input[value='true']:checked").val()) {
    questionsCorrect++;
    lastQuestionWas = true;
    $("input").prop('checked', false);
    stop();
    reset();
    NextQuestion();
  }
  else {

    stop();
    reset();
    $("#modal-correct-answer").html(randomOrderQuestions[QAObject].answer);
    $("#modal2").addClass("is-active");
    $("#continue2").click(function(){
    $(".modal").removeClass("is-active");
    $("input").prop('checked', false);

    lastQuestionWas = false;
    // reference to function to put up new question and start timer again
    
    NextQuestion();
    
    });


  }
});
  



stop();
reset();
// game over page, displaying final score.

