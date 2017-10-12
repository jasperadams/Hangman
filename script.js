/**
 * Hangman Project - Jasper Adams - 10/3/17.
 */

var easy = ["APPLE", "HOUSE", "INTERNET", "PLANT", "GOOD"];
var med = ["GENIUS", "COMPUTER", "EXCITING", "CREATIVE"];
var hard = ["AWKWARD", "BAGPIPES", "CRYPT", "DWARVES", "FERVID"];
var alphabet = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split("");
var guessedLetters = "";
var guesses = 6;
var word = "";
var empty = "_ ";
var str = "";


function startGame() {
    var d = document.getElementById("diff").value;
    if (d === "1") {
        word = easy[Math.floor(Math.random() * easy.length)];
    }
    else if (d === "2") {
        word = med[Math.floor(Math.random() * med.length)];
    }
    else if (d === "3") {
        word = hard[Math.floor(Math.random() * hard.length)];
    }
    str = empty.repeat(word.length);
    document.getElementById("word").innerHTML = str;
    document.getElementById("left").innerHTML = "<b>GUESSES LEFT: </b>" + guesses;
}


function guessLetter(){
    var num = document.getElementById("letters").value;
    var index = document.getElementById("letters").selectedIndex;
    document.getElementById("letters").remove(index);
    var letter = alphabet[num - 1];
    for(var i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            str = str.replaceAt(2 * i, letter);
            console.log(str);
        }
    }
    document.getElementById("word").innerHTML = str;
    guessedLetters += letter + " ";
    document.getElementById("used").innerHTML = guessedLetters;
    if(word.indexOf(letter) === -1){
        guesses--;
        document.getElementById("hanger").src = "img/" + (7 - guesses) + ".jpg";
        document.getElementById("left").innerHTML = "<b>GUESSES LEFT: </b>" + guesses;
    }
    if(guesses === 0){
        document.getElementById("hanger").src = "img/Lose.png";
        document.getElementById("word").innerHTML = "The word was " + word;
    }
    if(str.indexOf("_") === -1){
        document.getElementById("hanger").src = "img/Win.gif";
    }
}

function resetGame(){
    resetLetters();
    word = "";
    str = "";
    document.getElementById("word").innerHTML = "";
    guesses = 6;
    document.getElementById("left").innerHTML = "<b>GUESSES LEFT: </b>" + "";
    guessedLetters = "";
    document.getElementById("used").innerHTML = "";
    document.getElementById("hanger").src = "img/1.jpg";
}

function resetLetters(){
    for(var i = 0; i < guessedLetters.length; i += 2){
        var opt = document.createElement('option');
        var letter = guessedLetters[i];
        var num = alphabet.indexOf(letter);
        opt.value = num + 1;
        opt.innerHTML = letter;
        document.getElementById("letters").appendChild(opt);
    }
}

//replaceAt function
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
};