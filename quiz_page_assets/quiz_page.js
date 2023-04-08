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
let gameBoardArray = [];
let gameBoardText = [];
let playerOnePosition = 0;
let buttonClicked;
let affirmation = $("#affirmation");

let categoryMap = new Map([
  ["Arts & Literature", "arts_and_literature"],
  ["Film & TV", "film_and_tv"],
  ["Food & Drink", "food_and_drink"],
  ["General Knowledge", "general_knowledge"],
  ["Geography", "geography"],
  ["History", "history"],
  ["Music", "music"],
  ["Science", "science"],
  ["Society & Culture", "society_and_culture"],
  ["Sport & Leisure", "sport_and_leisure"],
]);

let currentGame = {
  questionBank,
  userSelections,
  userScore,
  questionsAnswered,
  playerOnePosition,
};

// main function that queriestAPI for questions
// parses the user inputs to build the queryURL
// handles the response, sets data as global variable questionBank to be referenced moving forward, passes data to renderNextQuestion function along with questionsAnswered count to keep track

function queryTAPI() {
  currentGame.userSelections.categories = location.search.split("?")[1];
  currentGame.userSelections.number = location.search.split("?")[2];
  currentGame.userSelections.difficulty = location.search.split("?")[3];
  let queryURL =
    "https://the-trivia-api.com/api/questions?" +
    currentGame.userSelections.categories +
    currentGame.userSelections.number +
    "&region=US" +
    currentGame.userSelections.difficulty;

  fetch(queryURL)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log("There was an error getting questions from tAPI");
      }
    })
    .then((data) => {
      console.log(data);
      currentGame.questionBank = data;
      renderNextQuestion(data, currentGame.questionsAnswered);
    });
}

//TODO
//TrackingBoard length is determined by the number of questions
//7 questions >> 24 tiles
//20 questions >> 60 tiles
function renderBoard() {
  //erase the old board
  gameBoard.empty();

  //could move these two lines to the global/query.then area, only need to call them once
  let numberOfQuestions = currentGame.userSelections.number.split("=")[1];
  let boardCategories = currentGame.userSelections.categories
    .split("=")[1]
    .split(",");

  if (numberOfQuestions == 10) {
    //short board
    //create 24 element array repeating the board categories
    while (gameBoardArray.length < 24) {
      gameBoardArray = gameBoardArray.concat(boardCategories);
    }
    gameBoardArray.length = 24;
    
    
    // for (i = 0; i < gameBoardArray.length; i++) {
    //   gameBoardText[i] = ""; //reset all game board tiles to placeholder text
      
    // }

    //create two rows of 12
    var row1 = $("<div>");
    var row2 = $("<div>");
    row1.addClass("row rowThin");
    row2.addClass("row rowThin");
    gameBoard.append(row1);
    gameBoard.append(row2);

    //populate the first row
    for (let i = 0; i < 12; i++) {
      var tile = $("<div>");
      tile.addClass(gameBoardArray[i]);
      tile.addClass("col s1 tile");
      //tile.text(gameBoardText[i]);
      row1.append(tile);
    }

    //populate the second row
    for (let i = 12; i < 24; i++) {
      var tile = $("<div>");
      tile.addClass(gameBoardArray[i]);
      tile.addClass("col s1 tile");
      //tile.text(gameBoardText[i]);
      row2.append(tile);
    }

    //make the first tile say "START" and the last tile say "FINISH"
    gameBoard.children().children()[0].textContent="START";
    gameBoard.children().children()[23].textContent="FINISH";
    //TODO: maybe color the last tile rainbow somehow

    //add 8-bit character to gameboard
    gameBoard.children().children()[currentGame.playerOnePosition].innerHTML = "<img class='playerOneHero' src='../assets/images/hero.png'></img>";
    

  } else if (numberOfQuestions == 20) {
    //long board

    //create five rows
    //create 60 element array repeating the board categories
    while (gameBoardArray.length < 60) {
      gameBoardArray = gameBoardArray.concat(boardCategories);
    }
    // gameBoardArray.length = 60;
    // for (i = 0; i < gameBoardArray.length; i++) {
    //   gameBoardText[i] = ""; //reset all game board tiles to placeholder text
    // }
    //gameBoardText[currentGame.playerOnePosition] = "😊";

    //create five rows of 12
    var row1 = $("<div>");
    var row2 = $("<div>");
    var row3 = $("<div>");
    var row4 = $("<div>");
    var row5 = $("<div>");
    row1.addClass("row rowThin");
    row2.addClass("row rowThin");
    row3.addClass("row rowThin");
    row4.addClass("row rowThin");
    row5.addClass("row rowThin");
    gameBoard.append(row1);
    gameBoard.append(row2);
    gameBoard.append(row3);
    gameBoard.append(row4);
    gameBoard.append(row5);

    //populate the first row
    for (let i = 0; i < 12; i++) {
      var tile = $("<div>");
      tile.addClass(gameBoardArray[i]);
      tile.addClass("col s1 tileThin");
      tile.text(gameBoardText[i]);
      row1.append(tile);
    }

    //populate the second row
    for (let i = 12; i < 24; i++) {
      var tile = $("<div>");
      tile.addClass(gameBoardArray[i]);
      tile.addClass("col s1 tileThin");
      tile.text(gameBoardText[i]);
      row2.append(tile);
    }

    //populate the third row
    for (let i = 24; i < 36; i++) {
      var tile = $("<div>");
      tile.addClass(gameBoardArray[i]);
      tile.addClass("col s1 tileThin");
      tile.text(gameBoardText[i]);
      row3.append(tile);
    }

    //populate the fourth row
    for (let i = 36; i < 48; i++) {
      var tile = $("<div>");
      tile.addClass(gameBoardArray[i]);
      tile.addClass("col s1 tileThin");
      tile.text(gameBoardText[i]);
      row4.append(tile);
    }

    //populate the fifth row
    for (let i = 48; i < 60; i++) {
      var tile = $("<div>");
      tile.addClass(gameBoardArray[i]);
      tile.addClass("col s1 tileThin");
      tile.text(gameBoardText[i]);
      row5.append(tile);
    }

    //make the first tile say "START" and the last tile say "FINISH"
    gameBoard.children().children()[0].textContent="START";
    gameBoard.children().children()[59].textContent="FINISH";

     //add 8-bit character to gameboard
     gameBoard.children().children()[currentGame.playerOnePosition].innerHTML = "<img class='playerOneHero' src='../assets/images/hero.png'></img>";

  }
}

// function that renders current question to the page
// first empties the display, and if # of questions answered = length of the question array, pushes to endgame
// else, creates question containers and renders to page using questionsAnswered as index for current question
// pushed correct and incorrect answers into one array, array is then shuffled, then returned array is pushed into buttons
function renderNextQuestion(data, questionsAnswered) {
  triviaDisplay.empty();
  renderBoard();
  affirmation.text("");
  

  if (questionsAnswered == data.length) {
    return endGame(false);
  } else {
    let questionContainer = $("<div>");
    let question = $("<p>");
    correctAnswer = data[questionsAnswered].correctAnswer;
    let wrongAnswers = data[questionsAnswered].incorrectAnswers;
    let answerArr = [];
    // we gonna add catergory title to the quiz page header
    var quizPageHeader = $(".quizPageHeader");
  quizPageHeader.text(data[questionsAnswered].category);
    for (let i = 0; i < wrongAnswers.length; i++) {
      answerArr.push(wrongAnswers[i]);
    }
    answerArr.push(correctAnswer);
    answerArr = shuffleAnswers(answerArr);
    let answerContainer = $("<div>");
    answerContainer.addClass("answerContainer");
    questionContainer.addClass("centerQuiz wrapper " );
    question.addClass("question")
    //turn the answer container the same color as the current question category
    // answerContainer.addClass(
      // categoryMap.get(currentGame.questionBank[questionsAnswered].category)
    // );

    for (let i = 0; i < answerArr.length; i++) {
      let answerBtn = $("<button>");
      answerBtn.addClass(categoryMap.get(currentGame.questionBank[questionsAnswered].category));
      answerBtn.text(answerArr[i]);
      answerBtn.addClass("answerBtn z-depth-5");
      answerContainer.append(answerBtn);
      // answerBtn.addClass(categoryMap.get(currentGame.questionBank[questionsAnswered].category));
  
    }

    question.text(data[questionsAnswered].question);
    questionContainer.append(question);
    questionContainer.append(answerContainer);
    triviaDisplay.append(questionContainer);
  }

  // Sending to local storage each time a question is rendered.
  localStorage.setItem("currentGame", JSON.stringify(currentGame));
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
function checkAnswer(userAnswer, category) {
  if (userAnswer === correctAnswer) { //the player answered correctly, so they advance or win the game
    

    //This is important for tracking stats with the progress tracker
    currentGame.questionBank[currentGame.questionsAnswered].userCorrect =
      currentGame.questionBank[currentGame.questionsAnswered].category +
      "+" +
      currentGame.questionBank[currentGame.questionsAnswered].difficulty;
    
    let didPlayerAdvance = false; //this boolean keeps track of whether the player has any more room on the board to advance
    for (
      let i = currentGame.playerOnePosition + 1;
      i < gameBoardArray.length;
      i++
    ) {
      //get the category of the question just answered
      if (categoryMap.get(category) == gameBoardArray[i]) { //advance player One to next tile matching current category
        console.log(gameBoardArray[i]);
        currentGame.playerOnePosition = i; //update player position based on the category of the current question
        console.log(i);
        console.log(currentGame.playerOnePosition);
        didPlayerAdvance = true; //there was space to advance, so the game is not over yet!
        console.log("inside if statement");
        break;
      }
    }
    if (!didPlayerAdvance) { //if there is no space left to advance, then trigger the endgame
      currentGame.playerOnePosition = gameBoardArray.length -1; //move the player to the last tile
      renderBoard(); //render the gameboard to show the player on the last tile
      setTimeout(function () { //wait 3 seconds, then call endGame() function
        endGame(true);
      }, 3000);
    }
    if (currentGame.playerOnePosition == gameBoardArray.length - 1) {  //if the player lands exactly on the last tile, they win...delete this?
      console.log("Landed exactly on the last tile!");
      setTimeout(function () {
        endGame(true);
      }, 3000);
    }
    pickQuery(0);
  } else {
    currentGame.questionBank[currentGame.questionsAnswered].userCorrect = false;
    pickQuery(1);
  }

  currentGame.questionsAnswered++;
  setTimeout(function () {
    renderNextQuestion(currentGame.questionBank, currentGame.questionsAnswered);
  }, 3000);
}

// function that triggers end game and redirects to next screen
function endGame(winOrLose) {
  localStorage.removeItem("gameInProgress");
  if (winOrLose) {
    currentGame.userWonGame = true;
    localStorage.setItem("currentGame", JSON.stringify(currentGame));
    location.assign("../gameover_page_assets/gameover.html");
  } else {
    currentGame.userWonGame = false;
    localStorage.setItem("currentGame", JSON.stringify(currentGame));
    location.assign("../gameover_page_assets/gameover.html");
  }
}

// event delegation for the main display that will trigger on click of an answerBtn, take the text of the target, and pass it to the checkAnswer function
$(".triviaDisplay").on("click", ".answerBtn", (e) => {
  $(".answerBtn").attr("disabled", true);
  let userAnswer = $(e.target).text();
  buttonClicked = $(e.target);
  checkAnswer(
    userAnswer,
    currentGame.questionBank[currentGame.questionsAnswered].category
  );
});

// GIPHY FUNCTIONS -------------------------------------------

// receives query phrase from pickQuery and sends request to API
// handles response and passes data and query phrase to renderGifs
function queryGiphy(query) {
  let apiKey = "api_key=axJ1DtkLXB8rYsm7KvxDxCwLhNlzccGq";
  let baseURL = "https://api.giphy.com/v1/gifs/search?";
  let rating = "&rating=pg-13";

  fetch(baseURL + apiKey + rating + "&q=" + query)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log("There was a problem pulling giphs from GIPHY");
      }
    })
    .then((data) => {
      renderGifs(data, query);
    });
}

// creates gif and verbal affirmation elements
// randomly selects gif url from api response and sets as src for created img
// reformats original query and renders this along with gif to page
function renderGifs(data, query) {
  let gif = $("<img>");
  let i = Math.floor(Math.random() * data.data.length);
  let gifURL = data.data[i].images.original.url;
  gif.attr("src", gifURL);
  gif.addClass("gifIMG");
  affirmation.text(query.toUpperCase().split("-").join(" "));
  //triviaDisplay.append(affirmation);
  buttonClicked.empty() //erase the text of the answer inside the button
  buttonClicked.css("background-image", "url("+gifURL+")");
}

// function is called after answer is determined to be correct or incorrect
// random word from predefined arrays is selected and fed into the queryGiphy function
function pickQuery(result) {
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

function loadPreviousGame() {
  let gameInProgress = localStorage.getItem("gameInProgress");
  if (gameInProgress) {
    currentGame = JSON.parse(localStorage.getItem("currentGame"));
    console.log(currentGame);
    renderNextQuestion(currentGame.questionBank, currentGame.questionsAnswered);
  } else {
    queryTAPI();
    renderBoard();
  }
}

loadPreviousGame();
