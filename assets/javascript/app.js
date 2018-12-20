// array of 10 question/answer/wrongAnswers objects from questions.js
questions = [sfq1,sfq2,sfq3,sfq4,sfq5,sfq6,sfq7,sfq8,sfq9,sfq10];

// I don't understand why this console.log doesn't show the full array, as defined above, but as it exists after having its elements spliced out
console.log("initial questions:");
console.log(questions);

// setting variables
questionsHTM = $("#question");

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



//setting get-ready modal, wait for response

// looping questions
for (i=0; i<10; i++) {
  // set timer variable and start running
  // clear timer, set timer

  // populating question at this iteration
  questionsHTM.text(randomOrderQuestions[i].clue);

  // populating answers at this iterations

  // if timer runs out, function to give correct answer and move on

  // else if user submits right answer, give +1 to score

}

// game over page, displaying final score.