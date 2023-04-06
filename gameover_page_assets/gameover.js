var dynamicSection = $(".dynamic-message");
var userMessage = $("#user-message");
// Need to remove/replace
// var input = window.prompt("Type 'win' or 'lose'");

function determineOutcome(currentGame) {
  if (currentGame.userWonGame) {
    userMessage.text("You're on a roll Bro!");
  } else {
    userMessage.text("Oh snap! Better luck next time Bro");
  }
  dynamicSection.append(userMessage);
}

// generates empty progress file if no save data is present
function generateEmptyCategoryProgressStorage() {
  let emptyCategoryProgressStorage = [
    { category: "Arts & Literature" },
    { category: "Film & TV" },
    { category: "Food & Drink" },
    { category: "General Knowledge" },
    { category: "Geography" },
    { category: "History" },
    { category: "Music" },
    { category: "Science" },
    { category: "Society & Culture" },
    { category: "Sport & Leisure" },
  ];

  for (let i = 0; i < emptyCategoryProgressStorage.length; i++) {
    emptyCategoryProgressStorage[i].tier = 0;
    emptyCategoryProgressStorage[i].exp = 0;
    emptyCategoryProgressStorage[i].expGainedLastGame = 0;
    emptyCategoryProgressStorage[i].percent = 0;
    emptyCategoryProgressStorage[i].total_questions = 0;
    emptyCategoryProgressStorage[i].total_correct = 0;
    emptyCategoryProgressStorage[i].total_incorrect = 0;
  }

  return emptyCategoryProgressStorage;
}

// searches local storage for the currentGame data that ws just created and any previously saved data if the user had played before.
function getCurrentGame() {
  let currentGame = JSON.parse(localStorage.getItem("currentGame"));
  let categoryProgressStorage = JSON.parse(
    localStorage.getItem("categoryProgressStorage")
  );

  if (!categoryProgressStorage) {
    categoryProgressStorage = generateEmptyCategoryProgressStorage();
  }

  if (currentGame) {
    currentGame.questionBank.length = currentGame.questionsAnswered;
    determineOutcome(currentGame);
    parseAnswers(currentGame, categoryProgressStorage);
  } else {
    console.log("There was an error loading your data.");
  }
}

// parses out the data passed from the currentGame object to determine number of correct/incorrect questions per difficulty per category and sets the appropriate question count and exp value into the main storage.
function parseAnswers(currentGame, categoryProgressStorage) {
  console.log(currentGame);
  console.log(categoryProgressStorage);
  for (let i = 0; i < currentGame.questionBank.length; i++) {
    if (currentGame.questionBank[i].userCorrect) {
      let cat = currentGame.questionBank[i].userCorrect.split("+")[0];
      console.log(cat);
      let diff = currentGame.questionBank[i].userCorrect.split("+")[1];
      console.log(diff);
      for (let j = 0; j < categoryProgressStorage.length; j++) {
        if (diff == "easy" && cat === categoryProgressStorage[j].category) {
          categoryProgressStorage[j].exp += 10;
          categoryProgressStorage[j].expGainedLastGame += 10;
          categoryProgressStorage[j].total_correct++;
        } else if (
          diff == "medium" &&
          cat === categoryProgressStorage[j].category
        ) {
          categoryProgressStorage[j].exp += 15;
          categoryProgressStorage[j].expGainedLastGame += 15;
          categoryProgressStorage[j].total_correct++;
        } else if (
          diff == "hard" &&
          cat === categoryProgressStorage[j].category
        ) {
          categoryProgressStorage[j].exp += 20;
          categoryProgressStorage[j].expGainedLastGame += 20;
          categoryProgressStorage[j].total_correct++;
        }
      }
    } else {
      for (let j = 0; j < categoryProgressStorage.length; j++) {
        let cat = currentGame.questionBank[i].category;
        if (cat === categoryProgressStorage[j].category) {
          categoryProgressStorage[j].total_incorrect++;
        }
      }
    }
  }
  for (let i = 0; i < categoryProgressStorage.length; i++) {
    categoryProgressStorage[i].total_questions =
      categoryProgressStorage[i].total_correct +
      categoryProgressStorage[i].total_incorrect;
  }
  determineTier(categoryProgressStorage);
}

// intakes the main storage with the compiled current game info and determines new percentage values and if any category leveled up.
function determineTier(categoryProgressStorage) {
  let expLimit = [50, 100, 150, 200, 250];

  for (let i = 0; i < categoryProgressStorage.length; i++) {
    if (categoryProgressStorage[i].tier === 0) {
      categoryProgressStorage[i].percent =
        (categoryProgressStorage[i].exp / expLimit[0]) * 100;
      if (categoryProgressStorage[i].expGainedLastGame !== 0) {
        $(
          "[data-container='" + categoryProgressStorage[i].category + "']"
        ).text("+ " + categoryProgressStorage[i].expGainedLastGame + " exp!");
        categoryProgressStorage[i].expGainedLastGame = 0;
      }

      if (categoryProgressStorage[i].exp >= expLimit[0]) {
        categoryProgressStorage[i].tier++;
        console.log(categoryProgressStorage[i].exp);
        categoryProgressStorage[i].exp =
          categoryProgressStorage[i].exp - expLimit[0];
        console.log(categoryProgressStorage[i].exp);
        categoryProgressStorage[i].percent =
          (categoryProgressStorage[i].exp / expLimit[1]) * 100;
        $(
          "[data-container='" + categoryProgressStorage[i].category + "']"
        ).text("LEVEL UP!");
      }
    } else if (categoryProgressStorage[i].tier === 1) {
      categoryProgressStorage[i].percent =
        (categoryProgressStorage[i].exp / expLimit[1]) * 100;
      if (categoryProgressStorage[i].expGainedLastGame !== 0) {
        $(
          "[data-container='" + categoryProgressStorage[i].category + "']"
        ).text("+ " + categoryProgressStorage[i].expGainedLastGame + " exp!");
        categoryProgressStorage[i].expGainedLastGame = 0;
      }

      if (categoryProgressStorage[i].exp >= expLimit[1]) {
        categoryProgressStorage[i].tier++;
        categoryProgressStorage[i].exp =
          categoryProgressStorage[i].exp - expLimit[1];
        categoryProgressStorage[i].percent =
          (categoryProgressStorage[i].exp / expLimit[2]) * 100;
        $(
          "[data-container='" + categoryProgressStorage[i].category + "']"
        ).text("LEVEL UP!");
      }
    } else if (categoryProgressStorage[i].tier === 2) {
      categoryProgressStorage[i].percent =
        (categoryProgressStorage[i].exp / expLimit[2]) * 100;
      if (categoryProgressStorage[i].expGainedLastGame !== 0) {
        $(
          "[data-container='" + categoryProgressStorage[i].category + "']"
        ).text("+ " + categoryProgressStorage[i].expGainedLastGame + " exp!");
        categoryProgressStorage[i].expGainedLastGame = 0;
      }

      if (categoryProgressStorage[i].exp >= expLimit[2]) {
        categoryProgressStorage[i].tier++;
        categoryProgressStorage[i].exp =
          categoryProgressStorage[i].exp - expLimit[2];
        categoryProgressStorage[i].percent =
          (categoryProgressStorage[i].exp / expLimit[3]) * 100;
        $(
          "[data-container='" + categoryProgressStorage[i].category + "']"
        ).text("LEVEL UP!");
      }
    } else if (categoryProgressStorage[i].tier === 3) {
      categoryProgressStorage[i].percent =
        (categoryProgressStorage[i].exp / expLimit[3]) * 100;
      if (categoryProgressStorage[i].expGainedLastGame !== 0) {
        $(
          "[data-container='" + categoryProgressStorage[i].category + "']"
        ).text("+ " + categoryProgressStorage[i].expGainedLastGame + " exp!");
        categoryProgressStorage[i].expGainedLastGame = 0;
      }

      if (categoryProgressStorage[i].exp >= expLimit[3]) {
        categoryProgressStorage[i].tier++;
        categoryProgressStorage[i].exp =
          categoryProgressStorage[i].exp - expLimit[3];
        categoryProgressStorage[i].percent =
          (categoryProgressStorage[i].exp / expLimit[4]) * 100;
        $(
          "[data-container='" + categoryProgressStorage[i].category + "']"
        ).text("LEVEL UP!");
      }
    } else if (categoryProgressStorage[i].tier === 4) {
      categoryProgressStorage[i].percent =
        (categoryProgressStorage[i].exp / expLimit[4]) * 100;
      if (categoryProgressStorage[i].exp >= expLimit[4]) {
        categoryProgressStorage[i].tier++;
        categoryProgressStorage[i].percent = 100;
        // expLimit - categoryProgressStorage[i].exp;
        $(
          "[data-container='" + categoryProgressStorage[i].category + "']"
        ).text("MAX LEVEL REACHED!");
      }
    }
  }
  localStorage.setItem(
    "categoryProgressStorage",
    JSON.stringify(categoryProgressStorage)
  );
  localStorage.removeItem("currentGame");
  renderProgress(categoryProgressStorage);
}

// renders the updated progress bar based on the percentage towards next tier
function renderProgress(categoryProgressStorage) {
  for (let i = 0; i < categoryProgressStorage.length; i++) {
    cat = categoryProgressStorage[i].category;
    let percent = categoryProgressStorage[i].percent;
    $("[data-category='" + cat + "']").css("width", percent + "%");
    $("[data-tier='" + cat + "']").text(categoryProgressStorage[i].tier);
  }
}

getCurrentGame();
