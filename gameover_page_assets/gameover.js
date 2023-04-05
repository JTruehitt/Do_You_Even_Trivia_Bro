var header = $('.game-over')
var userMessage = $('#user-message');
var input = window.prompt("Enter game status");

if (input === 'win'){
    var winText = userMessage.text("You're on a roll Bro!");
} else if (input === 'lose'){
    var loseText = userMessage.text("Oh snap! Better luck next time Bro");
}
header.append(userMessage);