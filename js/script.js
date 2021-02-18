// var word = ["Punch", "Kick", "Knee", "Elbow"];

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
't', 'u', 'v', 'w', 'x', 'y', 'z'];

// let selWord = word[Math.floor(Math.random() * word.length)]
// console.log(selWord);

let wordID = document.getElementById("word");

function getWord() {

  var randWord;
  url = 'https://random-word-api.herokuapp.com/word?number=1';

  fetch(url)
  .then(response => response.json())
  .then(function(data) {
    //console.log("word: ", data);
    
    randWord = data[0];
    
    wordID.innerHTML = randWord; 
    
    getMeaning(randWord);
    
  })
}

function getMeaning(word) {

url = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/';

  fetch(url + word)
  .then(response => response.json())
  .then(function(data) {

    if (data.title == "No Definitions Found")
    {
      console.log(data.message);
    }
    else
    {
      for (let i = 0; i < data.length; i++)
      {
        if (data[i].meanings.length != 0)
        {
          console.log("Meaning:", data[i].meanings[0].definitions[0].definition);

          if (data[i].meanings[0].definitions[0].synonyms != null)
          {
            for (let j = 0; j < data[i].meanings[0].definitions[0].synonyms.length; j++)
            {
              console.log("Synonyms:", data[i].meanings[0].definitions[0].synonyms[j]);
            }
          }
          else
          {
            console.log("Synonyms: Sorry... No synonyms found...");
          }
        }
      }
    }
  })
}
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
    wordName.innerHTML = "The Chosen Category Is Premier League Football Teams";
  } else if (chosenCategory === categories[1]) {
    wordName.innerHTML = "The Chosen Category Is Films";
  } else if (chosenCategory === categories[2]) {
    wordName.innerHTML = "The Chosen Category Is Cities";
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