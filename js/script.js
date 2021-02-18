var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
't', 'u', 'v', 'w', 'x', 'y', 'z'];

var getHint;            // Word getHint
var word;               // Selected word
var guess;              // Guesss
var guesses = [ ];      // Stored guesses
var lives;              // Lives
var counter;            // Count correct guesses
var space;              // Number of spaces in word '-'

// Get elements
var showLives = document.getElementById("mylives");
var getHint = document.getElementById("hint");
var showClue = document.getElementById("clue");

let wordID = document.getElementById("word"); // display word
let ansID = document.getElementById("wordAns"); // hidden answer


// ~~~~~~~~~~ function to get a random word ~~~~~~~~~~
function getWord() {

  url = 'https://random-word-api.herokuapp.com/word?number=1';

  fetch(url)
  .then(response => response.json())
  .then(function(data) {
    
    randWord = data[0];
    
    getMeaning(randWord);
  })
}


// ~~~~~~~~~~ function to get the meanings of a word ~~~~~~~~~~
function getMeaning(word, type) {

  url = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/';

  fetch(url + word)
  .then(response => response.json())
  .then(function(data) {
    console.log(data);

    // if the word is not found in the dictionary, display error message.
    if (data.title == "No Definitions Found")
    {
      console.log(data.message + "\ntrying again...");
      getWord();
    }

    // else display the results
    else
    {
      for (let i = 0; i < data.length; i++)
      {
        var meanings = data[i].meanings;

        // if word is found and there is meaning in the dictionary, display meanings
        if (meanings.length != 0)
        {        
          var definition = meanings[0].definitions[0].definition;
          var synonyms = data[i].meanings[0].definitions[0].synonyms;
         
          console.log("Meaning:", definition);

          // if synonyms of word found, display synonyms
          if (synonyms != null)
          {
            for (let j = 0; j < synonyms.length; j++)
            {
              console.log("Synonyms:", synonyms[j]);
            }
          }

          // if no synonyms found, display error message
          else
          {
            console.log("Synonyms: Sorry... No synonyms found...");
          }

          if (type == "hint")
          {
            console.log(definition);
            showClue.innerHTML = "Clue: - " +  definition; // display meaning as clues
          }

          hide = HideWord(word);

          ansID.innerHTML = hide[0]   // hidden answer
          wordID.innerHTML = hide[1]; // unsolved, word is white to blend in background
        }

        // if word is found but no meaning, return to take new word
        else
        {
          console.log("no meaning... trying again...");
          getWord();
        }
      }
    }
  })
}


// ~~~~~~~~~~ hide unsolved word ~~~~~~~~~~
function HideWord(orig) {
  hidden = "";
  for (let i = 0; i < orig.length; i++)
  {
    hidden += "*";
  }

  return [orig, hidden];
}


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

// Create guesses ul
var result = function () {
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
  for (var i = 0; i < guesses.length; i++) {
    if (counter + space === guesses.length) {
      showLives.innerHTML = "You Win!";
    }
  }
}

// OnClick Function
check = function () {
  list.onclick = function () {
    var guess = (this.innerHTML);
    this.setAttribute("class", "active");
    this.onclick = null;
    for (var i = 0; i < word.length; i++) {
      if (word[i] === guess) {
        guesses[i].innerHTML = guess;
        counter += 1;
      } 
    }
    var j = (word.indexOf(guess));
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
  word = document.getElementById("wordAns").innerHTML;
  word = word.replace(/\s/g, "-");
  console.log(word);
  buttons();

  guesses = [ ];
  lives = 10;
  counter = 0;
  space = 0;
  result();
  comments();
}

  play();

/*
*/

// Hint

hint.onclick = function() {
  var word = document.getElementById("wordAns").innerHTML;
  console.log("HINT:", word);
  hints = getMeaning(word, 'hint');
};