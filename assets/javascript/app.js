// array of 10 question/answer/wrongAnswers objects from questions.js
questions = [sfq1,sfq2,sfq3,sfq4,sfq5,sfq6,sfq7,sfq8,sfq9,sfq10];
console.log(questions);

// setting variables
questionsHTM = $("#question");

//setting up randomized order questions array
var randomOrderQuestions = [];

  // temporarily just putting something here
  // setting up random index # from questions
  var randomIndex = Math.floor(Math.random() * questions.length);
  console.log("random index: "+randomIndex);
  // pushing object at that index into randomOrderQuestions
  randomOrderQuestions.push(questions[randomIndex]);
  console.log(randomOrderQuestions);
  console.log(randomOrderQuestions[0].clue);
  questionsHTM.text(randomOrderQuestions[0].clue);
  // pulling the element copied to randomOrderQuestions out of questions
  questions.splice(randomIndex,1);
  console.log(questions);



//setting get-ready modal

// start timer

//populating initial data

// push asked question out of questions array