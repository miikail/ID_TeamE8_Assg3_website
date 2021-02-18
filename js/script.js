var word = ["Punch", "Kick", "Knee", "Elbow"];

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
't', 'u', 'v', 'w', 'x', 'y', 'z'];

let selWord = word[Math.floor(Math.random() * word.length)]
console.log(selWord);

let getCat = document.getElementById("categoryName");
getCat.innerHTML += selWord; 




/*
var categories;         // Array of topics
var chosenCategory;     // Selected catagory
var getHint;            // Word getHint
var word;               // Selected word
var guess;              // Geuss
var guesses = [ ];      // Stored geusses
var lives;              // Lives
var counter;            // Count correct geusses
var space;              // Number of spaces in word '-'

// Get elements
var showLives = document.getElementById("mylives");
var showCategory = document.getElementById("scategory");
var getHint = document.getElementById("hint");
var showClue = document.getElementById("clue");

// create alphabet ul
var buttons = function () {
  myButtons = document.getElementById('buttons');
  letters = document.createElement('ul');

  for (var i = 0; i < alphabet.length; i++) {
    letters.id = 'alphabet';
    list = document.createElement('li');
    list.id = 'letter';
    list.innerHTML = alphabet[i];
    check();
    myButtons.appendChild(letters);
    letters.appendChild(list);
  }
}

// Select Catagory
var selectCat = function () {

  
  if (chosenCategory === categories[0]) {
    categoryName.innerHTML = "The Chosen Category Is Premier League Football Teams";
  } else if (chosenCategory === categories[1]) {
    categoryName.innerHTML = "The Chosen Category Is Films";
  } else if (chosenCategory === categories[2]) {
    categoryName.innerHTML = "The Chosen Category Is Cities";
  }
}

// Create guesses ul
result = function () {
  wordHolder = document.getElementById('hold');
  correct = document.createElement('ul');

  for (var i = 0; i < word.length; i++) {
    correct.setAttribute('id', 'my-word');
    guess = document.createElement('li');
    guess.setAttribute('class', 'guess');
    if (word[i] === "-") {
      guess.innerHTML = "-";
      space = 1;
    } else {
      guess.innerHTML = "_";
    }

    guesses.push(guess);
    wordHolder.appendChild(correct);
    correct.appendChild(guess);
  }
}
  
// Show lives
comments = function () {
  showLives.innerHTML = "You have " + lives + " lives";
  if (lives < 1) {
    showLives.innerHTML = "Game Over";
  }
  for (var i = 0; i < geusses.length; i++) {
    if (counter + space === guesses.length) {
      showLives.innerHTML = "You Win!";
    }
  }
}

// OnClick Function
check = function () {
  list.onclick = function () {
    var geuss = (this.innerHTML);
    this.setAttribute("class", "active");
    this.onclick = null;
    for (var i = 0; i < word.length; i++) {
      if (word[i] === geuss) {
        geusses[i].innerHTML = geuss;
        counter += 1;
      } 
    }
    var j = (word.indexOf(geuss));
    if (j === -1) {
      lives -= 1;
      comments();
      animate();
    } else {
      comments();
    }
  }
}

// Play
play = function () {
  categories = [
      ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
      ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
      ["manchester", "milan", "madrid", "amsterdam", "prague"]
  ];

  chosenCategory = categories[Math.floor(Math.random() * categories.length)];
  word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
  word = word.replace(/\s/g, "-");
  console.log(word);
  buttons();

  geusses = [ ];
  lives = 10;
  counter = 0;
  space = 0;
  result();
  comments();
  selectCat();
  canvas();
}

  play();
*/