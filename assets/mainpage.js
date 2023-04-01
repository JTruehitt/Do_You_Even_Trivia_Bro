//* MODAL / FORM --------------

let difficultySelect = $(".difficultySelect");
let submitUserSelectionBtn = $(".submitUserSelectionsBtn");
let selectAllCategories = $(".selectAllBtn");

$(".startGameBtn").click(function () {
  $(".modal").modal();
});

difficultySelect.formSelect();

//!remove if don't use
$(".numberSelect").formSelect();

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

//! localStorage data transfer method
// submitUserSelectionBtn.click(() => {
//   let categories = [];
//   $("input[type=checkbox]:checked").each(function () {
//     categories.push($(this).val());
//   });
//   let difficulty = $("#difficulty").val();

//   let number = "&limit=" + $("#number").val();

//   let userSelections = { categories, difficulty, number };
//   localStorage.setItem("userSelections", JSON.stringify(userSelections));
//   location.assign("secondpage.html");
// queryTAPI(userSelections);
// });

//! URL string data transfer method
submitUserSelectionBtn.click(() => {
  let categories = [];
  $("input[type=checkbox]:checked").each(function () {
    categories.push($(this).val());
  });
  let difficulty = $("#difficulty").val();

  let number = "&limit=" + $("#number").val();

  location.assign(
    "quiz_page_assets/Quiz_page.html" +
      "?categories=" +
      categories.join() +
      "?" +
      number +
      "?" +
      difficulty
  );
  // queryTAPI(userSelections);
});