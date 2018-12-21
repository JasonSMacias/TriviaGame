// array of 10 question/answer/wrongAnswers objects from questions.js
questions = [sfq1,sfq2,sfq3,sfq4,sfq5,sfq6,sfq7,sfq8,sfq9,sfq10];

// I don't understand why this console.log doesn't show the full array, as defined above, but as it exists after having its elements spliced out
console.log("initial questions:");
console.log(questions);

// setting variables
questionsHTM = $("#question");

//setting up randomized order questions array
var randomOrderQuestions = [];

// variable to hold setInterval running timer
var intervalId;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;
var time = 0;

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

// functions
function reset() {

  time = 0;

  // reset display div
  $("#display").text("00:00");

}
function start() {

  // DONE: Use setInterval to start the count here and set the clock to running.
  if (!clockRunning) {
    intervalId = setInterval(count, 1000);
    clockRunning = true;
  }
}
function stop() {

  // DONE: Use clearInterval to stop the count here and set the clock to not be running.
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

  if (time>30){
    stop();
    reset();
    $("#modal2").addClass("is-active");
    $("#continue2").click(function(){
    $(".modal").removeClass("is-active");
    // need to put reference to function to put up new question and start timer again
    // start();

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

stop();
reset();
//setting get ready modal and waiting for response to continue



// looping questions
for (i=0; i<10; i++) {
  

  questionsHTM.text(randomOrderQuestions[i].clue);
}


  
  $("#modal1").addClass("is-active");

  $("#continue").click(function(){
    $("#modal1").removeClass("is-active");
    start();
  });


  

  // else if user submits right answer, give +1 to score

stop();
reset();
// game over page, displaying final score.