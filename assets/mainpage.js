//* MODAL / FORM --------------

let difficultySelect = $(".difficultySelect");
let numberSelect = $(".numberSelect");
let submitUserSelectionBtn = $(".submitUserSelectionsBtn");
let selectAllCategories = $(".selectAllBtn");
let mainPageBtnWrapper = $(".mainPageBtnWrapper");
let startGameBtn = $(".startGameBtn");
let proceedWithNewGameBtn = $(".proceedWithNewGameBtn");
let resumeGameBtn = $(".resumeGameBtn");
let secondChanceResumeGameBtn = $(".secondChanceResumeGameBtn");
let gameInProgress;

startGameBtn.click(function () {
  if (!gameInProgress) {
    $("#modal1").modal();
  } else {
    startGameBtn.attr("data-target", "modal2");
    $("#modal2").modal();
    // alert("u sure about that?")
  }
});

difficultySelect.formSelect();

numberSelect.formSelect();

selectAllCategories.click((e) => {
  e.preventDefault();
  $("input[type=checkbox]").each(function () {
    if (!$(this).is(":checked")) {
      $(this).attr("checked", true);
    } else {
      $(this).attr("checked", false);
    }
  });
});

submitUserSelectionBtn.click(() => {
  let categories = [];
  $("input[type=checkbox]:checked").each(function () {
    categories.push($(this).val());
  });
  let difficulty = $("#difficulty").val();

  let number = $("#number").val();

  if (!categories.length || !number) {
    let userAlert = $("<p>");
    userAlert.text(
      "Please select at least one category and the number of questions."
    );
    userAlert.css({ color: "red", "font-weight": "bold" });
    $(".modal-validate").append(userAlert);
    setTimeout(function () {
      userAlert.css("display", "none");
    }, 2500);
    submitUserSelectionBtn.removeClass("modal-close");
  } else {
    number = "&limit=" + number;

    location.assign(
      "quiz_page_assets/quiz_page.html" +
        "?categories=" +
        categories.join() +
        "?" +
        number +
        "?" +
        difficulty
    );
  }
});

function checkForGameInProgress() {
  let currentGame = JSON.parse(localStorage.getItem("currentGame"));
  console.log(currentGame);
  if (!currentGame) {
    gameInProgress = false;
    return;
  } else {
    resumeGameBtn.css("display", "block");
    localStorage.setItem("gameInProgress", "true");
    gameInProgress = true;
    // let resumeGameBtn = $("<button>");
    // resumeGameBtn.text("Resume Previous Game");
    // resumeGameBtn.addClass("btn btn-large resumeGameBtn")
    // mainPageBtnWrapper.append(resumeGameBtn);
  }
}

proceedWithNewGameBtn.click(() => {
  localStorage.removeItem("currentGame");
  localStorage.removeItem("gameInProgress");
  $("#modal1").modal();
});

resumeGameBtn.click(() => {
  location.assign("quiz_page_assets/quiz_page.html");
});

secondChanceResumeGameBtn.click(() => {
  location.assign("quiz_page_assets/quiz_page.html");
});

checkForGameInProgress();
