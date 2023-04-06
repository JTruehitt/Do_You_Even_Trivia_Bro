var dynamicSection = $('.dynamic-message')
var userMessage = $('#user-message');
// Need to remove/replace
var input = window.prompt("Type 'win' or 'lose'");

// Need to replace with game data
if (input === 'win'){
    var winText = userMessage.text("You're on a roll Bro!");
} else if (input === 'lose'){
    var loseText = userMessage.text("Oh snap! Better luck next time Bro");
}
dynamicSection.append(userMessage);