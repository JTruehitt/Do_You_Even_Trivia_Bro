// https://the-trivia-api.com/

// setting global varibales
let triviaDisplay = $(".triviaDisplay");
let gameBoard = $(".gameBoard");
let userAnswer;
let correctAnswer;
let questionsAnswered = 0;
let questionBank;
let userScore = 0;
let userSelections = {};


// main function that queriestAPI for questions
// parses the user inputs to build the queryURL
// handles the response, sets data as global variable questionBank to be referenced moving forward, passes data to renderNextQuestion function along with questionsAnswered count to keep track

function queryTAPI() {
  //! LocalStorage Method-----------------
  // let userSelections = JSON.parse(localStorage.getItem("userSelections"));

  // if (userSelections.categories.length === 10) {
  //   userSelections.categories = "";
  // } else  {
  //   userSelections.categories = "categories=" + userSelections.categories.join();
  // }
  // if (userSelections.difficulty == "any") {
  //   userSelections.difficulty = "";
  // }

  //! URL Method--------------------------
  //let userSelections = {};
  userSelections.categories = location.search.split("?")[1];
  userSelections.number = location.search.split("?")[2];
  userSelections.difficulty = location.search.split("?")[3];
  //!-------------------------------------

  let queryURL =
    "https://the-trivia-api.com/api/questions?" +
    userSelections.categories +
    userSelections.number +
    "&region=US" +
    userSelections.difficulty;

  console.log(queryURL);
  fetch(queryURL)
    .then((res) => res.json())
    .then((data) => {
      questionBank = data;
      console.log(data);
      renderNextQuestion(data, questionsAnswered);
    });
}

//TODO
//TrackingBoard length is determined by the number of questions
//7 questions >> 24 tiles
//20 questions >> 60 tiles
function renderBoard() {

let numberOfQuestions = userSelections.number.split("=")[1];
let boardCategories = userSelections.categories.split("=")[1].split(",");

if (numberOfQuestions == 10) {
  //short board
  //create 24 element array repeating the board categories
  var gameBoardArray = [];
  while (gameBoardArray.length<24){
    gameBoardArray = gameBoardArray.concat(boardCategories); 
  }
  gameBoardArray.length = 24;
  console.log(gameBoardArray);

  //create two rows of 12
  var row1 = $("<div>");
  var row2 = $("<div>");
  row1.addClass("row");
  row2.addClass("row");
  gameBoard.append(row1);
  gameBoard.append(row2);

  //populate the first row
  for (let i=0; i<12; i++) {
    var tile = $("<div>");
    tile.addClass(gameBoardArray[i]);
    tile.addClass("col s1");
    tile.text("&&&");
    row1.append(tile);
  }

  //populate the second row
  for (let i=12; i<24; i++) {
    var tile = $("<div>");
    tile.addClass(gameBoardArray[i]);
    tile.addClass("col s1");
    tile.text("&&&");
    row2.append(tile);
  }
  
}else if (numberOfQuestions == 20)
{
  //long board
  
  //create five rows
  //create 24 element array repeating the board categories
  var gameBoardArray = [];
  while (gameBoardArray.length<60){
    gameBoardArray = gameBoardArray.concat(boardCategories); 
  }
  gameBoardArray.length = 60;
  console.log(gameBoardArray);

  //create five rows of 12
  var row1 = $("<div>");
  var row2 = $("<div>");
  var row3 = $("<div>");
  var row4 = $("<div>");
  var row5 = $("<div>");
  row1.addClass("row");
  row2.addClass("row");
  row3.addClass("row");
  row4.addClass("row");
  row5.addClass("row");
  gameBoard.append(row1);
  gameBoard.append(row2);
  gameBoard.append(row3);
  gameBoard.append(row4);
  gameBoard.append(row5);

  //populate the first row
  for (let i=0; i<12; i++) {
    var tile = $("<div>");
    tile.addClass(gameBoardArray[i]);
    tile.addClass("col s1");
    tile.text("&&&");
    row1.append(tile);
  }

  //populate the second row
  for (let i=12; i<24; i++) {
    var tile = $("<div>");
    tile.addClass(gameBoardArray[i]);
    tile.addClass("col s1");
    tile.text("&&&");
    row2.append(tile);
  }

  //populate the second row
  for (let i=24; i<36; i++) {
    var tile = $("<div>");
    tile.addClass(gameBoardArray[i]);
    tile.addClass("col s1");
    tile.text("&&&");
    row2.append(tile);
  }

  //populate the second row
  for (let i=36; i<48; i++) {
    var tile = $("<div>");
    tile.addClass(gameBoardArray[i]);
    tile.addClass("col s1");
    tile.text("&&&");
    row2.append(tile);
  }

  //populate the second row
  for (let i=48; i<60; i++) {
    var tile = $("<div>");
    tile.addClass(gameBoardArray[i]);
    tile.addClass("col s1");
    tile.text("&&&");
    row2.append(tile);
  }

}
}
//function to build the gameboard



//Dynamically create the board tiles, insert into the <footer>
/* <div class="row">
        <div class="col s1 red">1</div>
        <div class="col s1 pink">2</div>
        <div class="col s1 purple">3</div>
        <div class="col s1 indigo">4</div>
        <div class="col s1 blue">5</div>
        <div class="col s1 teal">6</div>
        <div class="col s1 green">7</div>
        <div class="col s1 lime">8</div>
        <div class="col s1 yellow">9</div>
        <div class="col s1 orange">10</div>
        <div class="col s1 red">11</div>
        <div class="col s1 pink">12</div>
      </div> */

//The type of categories picked from the modal determine the tiles shown in board
//create color classes in CSS for each category
//assign color class to the question text somehow
//assign the color to the board tiles for each category

//TODO
//Create a variable for a player
//Create a variable for the board tiles array
//Create a variable for each player's position along the board (starting at 0)
//Create GAME OVER condition for when any player reaches the final tile

//! OLD
// function queryTAPI(userSelections) {
//   let categoryQuery;
//   let difficultyQuery;

//   if (userSelections.categories == "any") {
//     categoryQuery = "";
//   } else if (userSelections.categories.length >= 1)
//     categoryQuery = "categories=" + userSelections.categories.join();

//   if (userSelections.difficulty == "any") {
//     difficultyQuery = "";
//   } else {
//     difficultyQuery = "&difficulty=" + userSelections.difficulty;
//   }

//   let baseURL =
//     "https://the-trivia-api.com/api/questions?" +
//     categoryQuery +
//     userSelections.number +
//     "&region=US" +
//     difficultyQuery;

//   let queryURL = baseURL;
//   fetch(queryURL)
//     .then((res) => res.json())
//     .then((data) => {
//       questionBank = data;
//       console.log(data);
//       renderNextQuestion(data, questionsAnswered);
//     });
// }
//! OLD

// function that renders current question to the page
// first empties the display, and if # of questions answered = length of the question array, pushes to endgame
// else, creates question containers and renders to page using questionsAnswered as index for current question
// pushed correct and incorrect answers into one array, array is then shuffled, then returned array is pushed into buttons
function renderNextQuestion(data, questionsAnswered) {
  triviaDisplay.empty();

  if (questionsAnswered == data.length) {
    return endGame();
  } else {
    let questionContainer = $("<div>");
    let question = $("<p>");
    correctAnswer = data[questionsAnswered].correctAnswer;
    let wrongAnswers = data[questionsAnswered].incorrectAnswers;
    let answerArr = [];
    for (let i = 0; i < wrongAnswers.length; i++) {
      answerArr.push(wrongAnswers[i]);
    }
    answerArr.push(correctAnswer);
    answerArr = shuffleAnswers(answerArr);
    let answerContainer = $("<div>");
    answerContainer.addClass("answerContainer");

    for (let i = 0; i < answerArr.length; i++) {
      let answerBtn = $("<button>");
      answerBtn.text(answerArr[i]);
      answerBtn.addClass("answerBtn");
      answerContainer.append(answerBtn);
    }

    question.text(data[questionsAnswered].question);
    questionContainer.append(question);
    questionContainer.append(answerContainer);
    triviaDisplay.append(questionContainer);
  }
}

// function that shuffles answers so the correct answer is not always the last one
// sets i and j to different indexes of the array and swaps them over several iterations to ensure randomness of answer positions
function shuffleAnswers(answers) {
  for (let i = answers.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let swap = answers[i];
    answers[i] = answers[j];
    answers[j] = swap;
  }
  return answers;
}

// function checks if passed user answer equals the current correct answer
// adjusts score as needed
// increases questionsAnswered number and passes back to render next question to determine how to proceed
function checkAnswer(userAnswer) {
  if (userAnswer === correctAnswer) {
    //! Replace this alert with something
    // alert("yay, that's right");
    pickQuery(0);
    // userScore += //need to figure out scoring mechanic
  } else {
    //! Replace this alert with something
    // alert("sorry, that's wrong");
    pickQuery(1);
    // userScore -= //need to figure out scoring mechanic
  }

  questionsAnswered++;
  setTimeout(function () {
    renderNextQuestion(questionBank, questionsAnswered);
  }, 3000);
}

// function that triggers end game and redirects to next screen
function endGame() {
  //! will need to sort this out and configure functionality once endgame page is made
  triviaDisplay.text("GAME OVER");
  // localStorage.setItem("userScore", userScore)
  // location.assign("endgame.html")
  return;
}

// event delegation for the main display that will trigger on click of an answerBtn, take the text of the target, and pass it to the checkAnswer function
$(".triviaDisplay").on("click", ".answerBtn", (e) => {
  let userAnswer = $(e.target).text();
  checkAnswer(userAnswer);
});

// event listener for start game function that collects user input and passes it to the inital query function
// ! once landing page is made, this will just turn to a function that is called on load as start button will be on that page
$(".startGameBtn").click(() => {
  let categories = [];
  $("input[type=checkbox]:checked").each(function () {
    categories.push($(this).val());
  });
  let difficulty = $("#difficulty").val();

  //! line 141 is just a placeholder until we figure out a number slider or something
  //  let number = "&limit=" + $("#number").val();
  let number = "&limit=5";

  let userSelections = { categories, difficulty, number };

  queryTAPI(userSelections);
});

// GIPHY FUNCTIONS -------------------------------------------

// receives query phrase from pickQuery and sends request to API
// handles response and passes data and query phrase to renderGifs
function queryGiphy(query) {
  let apiKey = "api_key=axJ1DtkLXB8rYsm7KvxDxCwLhNlzccGq";
  let baseURL = "https://api.giphy.com/v1/gifs/search?";
  let rating = "&rating=pg-13";

  fetch(baseURL + apiKey + rating + "&q=" + query)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      renderGifs(data, query);
    });
}

// creates gif and verbal affirmation elements
// randomly selects gif url from api response and sets as src for created img
// reformats original query and renders this along with gif to page
function renderGifs(data, query) {
  let gif = $("<img>");
  let affirmation = $("<h2>");
  let i = Math.floor(Math.random() * data.data.length);
  console.log(i);
  let gifURL = data.data[i].images.original.url;
  gif.attr("src", gifURL);
  gif.addClass("gifIMG");
  affirmation.text(query.toUpperCase().split("-").join(" "));
  triviaDisplay.append(affirmation, gif);
}

// function is called after answer is determined to be correct or incorrect
// random word from predefined arrays is selected and fed into the queryGiphy function
function pickQuery(result) {
  // ! i just came up with these for a bit of diversity. we can change/add more if we like
  const correct = ["correct", "yes", "way-to-go", "good-job"];
  const incorrect = ["wrong", "no", "no-way", "nope"];
  let r = Math.floor(Math.random() * correct.length);
  if (result === 0) {
    query = correct[r];
    queryGiphy(query);
  } else {
    query = incorrect[r];
    queryGiphy(query);
  }
}

//function queryTAPI() {
  //! LocalStorage Method-----------------
  // let userSelections = JSON.parse(localStorage.getItem("userSelections"));

  // if (userSelections.categories.length === 10) {
  //   userSelections.categories = "";
  // } else  {
  //   userSelections.categories = "categories=" + userSelections.categories.join();
  // }
  // if (userSelections.difficulty == "any") {
  //   userSelections.difficulty = "";
  // }

  //! URL Method--------------------------
  // let userSelections = {};
  // userSelections.categories = location.search.split("?")[1];
  // userSelections.number = location.search.split("?")[2];
  // userSelections.difficulty = location.search.split("?")[3];
  // //!-------------------------------------

  // let queryURL =
  //   "https://the-trivia-api.com/api/questions?" +
  //   userSelections.categories +
  //   userSelections.number +
  //   "&region=US" +
  //   userSelections.difficulty;

  // console.log(queryURL);
  // fetch(queryURL)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     questionBank = data;
  //     console.log(data);
  //     renderNextQuestion(data, questionsAnswered);
  //   });
//}

queryTAPI();
renderBoard();