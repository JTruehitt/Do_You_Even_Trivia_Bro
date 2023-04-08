var dynamicSection = $(".dynamic-message");
var userMessage = $("#user-message");
// Need to remove/replace
// var input = window.prompt("Type 'win' or 'lose'");

function determineOutcome(currentGame) {
  if (currentGame.userWonGame) {
    userMessage.text("You're on a roll bro!");
  } else {
    userMessage.text("Oh snap! Better luck next time bro");
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

  emptyCategoryProgressStorage.total_wins = 0;
  emptyCategoryProgressStorage.total_losses = 0;

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
    if (currentGame.userWonGame) {
      categoryProgressStorage.total_wins++;
    } else {
      categoryProgressStorage.total_losses++;
    }
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
  for (let i = 0; i < currentGame.questionBank.length - 2; i++) {
    if (currentGame.questionBank[i].userCorrect) {
      let cat = currentGame.questionBank[i].userCorrect.split("+")[0];
      console.log(cat);
      let diff = currentGame.questionBank[i].userCorrect.split("+")[1];
      console.log(diff);
      for (let j = 0; j < categoryProgressStorage.length - 2; j++) {
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
      for (let j = 0; j < categoryProgressStorage.length - 2; j++) {
        let cat = currentGame.questionBank[i].category;
        if (cat === categoryProgressStorage[j].category) {
          categoryProgressStorage[j].total_incorrect++;
        }
      }
    }
  }
  for (let i = 0; i < categoryProgressStorage.length - 2; i++) {
    categoryProgressStorage[i].total_questions =
      categoryProgressStorage[i].total_correct +
      categoryProgressStorage[i].total_incorrect;
  }
  determineTier(categoryProgressStorage);
}

// intakes the main storage with the compiled current game info and determines new percentage values and if any category leveled up.
function determineTier(categoryProgressStorage) {
  let expLimit = [50, 100, 150, 200, 250];

  for (let i = 0; i < categoryProgressStorage.length - 2; i++) {
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
  renderStats(categoryProgressStorage);
}

// renders the updated progress bar based on the percentage towards next tier
function renderProgress(categoryProgressStorage) {
  for (let i = 0; i < categoryProgressStorage.length - 2; i++) {
    cat = categoryProgressStorage[i].category;
    let percent = categoryProgressStorage[i].percent;
    $("[data-category='" + cat + "']").css("width", percent + "%");
    $("[data-tier='" + cat + "']").text(categoryProgressStorage[i].tier);
  }
}

function renderStats(categoryProgressStorage) {
  $(".totalGames").text(
    categoryProgressStorage.total_wins + categoryProgressStorage.total_losses
  );
  $(".totalWins").text(categoryProgressStorage.total_wins);
  $(".totalLosses").text(categoryProgressStorage.total_losses);
  $(".winPercentage").text(
    (categoryProgressStorage.total_wins /
      (categoryProgressStorage.total_wins +
        categoryProgressStorage.total_losses)) *
      100 +
      "%"
  );

  let allTimeQuestions = 0;
  let allTimeCorrect = 0;
  let allTimeIncorrect = 0;
  for (let i = 0; i < categoryProgressStorage.length - 2; i++) {
    allTimeQuestions += categoryProgressStorage[i].total_questions;
    allTimeCorrect += categoryProgressStorage[i].total_correct;
    allTimeIncorrect += categoryProgressStorage[i].total_incorrect;

    let categoryBreakdown = $(".categoryBreakdown");
    let categoryStatContainer = $("<div>");
    cat = categoryProgressStorage[i].category;
    let catTotal = $("<p>");
    let catTotalNumber = $("<span>");
    let catTotalCorrect = $("<p>");
    let catTotalCorrectNumber = $("<span>");
    let catTotalIncorrect = $("<p>");
    let catTotalIncorrectNumber = $("<span>");
    let catPercentage = $("<p>");
    let catPercentageNumber = $("<span>");

    catTotal.text("Total Questions: ");
    catTotalNumber.text(categoryProgressStorage[i].total_questions);
    catTotalCorrect.text("Total Correct :");
    catTotalCorrectNumber.text(categoryProgressStorage[i].total_correct);
    catTotalIncorrect.text("Total Incorrect :");
    catTotalIncorrectNumber.text(categoryProgressStorage[i].total_incorrect);
    catPercentage.text("Correct Percentage: ");
    catPercentageNumber.text(
      (categoryProgressStorage[i].total_correct /
        categoryProgressStorage[i].total_questions) *
        100 +
        "%"
    );

    categoryStatContainer.append(
      cat,
      catTotal,
      catTotalNumber,
      catTotalCorrect,
      catTotalCorrectNumber,
      catTotalIncorrect,
      catTotalIncorrectNumber,
      catPercentage,
      catPercentageNumber
    );
    categoryBreakdown.append(categoryStatContainer);
  }

  $(".totalQuestions").text(allTimeQuestions);
  $(".totalCorrect").text(allTimeCorrect);
  $(".totalIncorrect").text(allTimeIncorrect);
  $(".correctPercentage").text((allTimeCorrect / allTimeQuestions) * 100 + "%");
}

getCurrentGame();
