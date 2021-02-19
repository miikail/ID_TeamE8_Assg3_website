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

var freshStart = true;

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
    //console.log(data);

    // if the word is not found in the dictionary, display error message.
    if (data.title == "No Definitions Found")
    {
      console.log("No definitions found... \ntrying again...");
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
              document.getElementById("syn").innerHTML += synonyms[j] + ", ";
            }
            
          }
          // if no synonyms found, display error message
          else
          {
            console.log("Synonyms: Sorry... No synonyms found...");
            getWord();
          }

          if (type == "hint")
          {
            console.log(definition);
            showClue.innerHTML = "Clue: - " +  definition; // display meaning as clues

            hide = HideWord(word);
  
            console.log("ANSWER:", hide[0]);
            ansID.innerHTML = hide[0]   // hidden answer
            //wordID.innerHTML = hide[1]; // unsolved, word is white to blend in background
          }
          else
          {
            hide = HideWord(word);

            console.log("ANSWER:", hide[0]);
            ansID.innerHTML = hide[0]   // hidden answer

            play();
          }
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
result = function () {
  console.log("CALLED RESULT");
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
var comments = function () {
  showLives.innerHTML = "You have " + lives + " lives";
  
  var heart = "";
  for (let i = 0; i < lives; i++)
  {
    heart += "💔 ";
  }
  console.log("Heart: ",heart);
  showLives.innerHTML = "<b>Your Lives: " + heart + "</b>";

  if (lives < 1) {
    showLives.innerHTML = "Game Over";
    guesses.innerHTML = ansID;
  }
  for (var i = 0; i < guesses.length; i++) {

    console.log("PLEASE WORK:", counter, space, guesses.length);
    if (counter + space === guesses.length) {
      showLives.innerHTML = "You Win!";
    }
  }
}

// OnClick Function
var check = function () {

  list.onclick = function () {
    console.log("Click Check:");

    var word = ansID.innerHTML;
    var guess = (this.innerHTML);

    console.log("guess:",guess, "\t", guess.length);

    console.log("word:", word, "\t", word.length);

    this.setAttribute("class", "active");
    this.onclick = null;

    for (var i = 0; i < word.length; i++) {
      if (word[i] === guess) {

        guesses[i].innerHTML = guess;
        
        counter += 1;

        console.log("Guesses:", guesses);

        console.log("Guess:", guess);
      } 
    }
    var j = (word.indexOf(guess));
    if (j === -1) {
      lives -= 1;
      comments();
    } else {
      comments();
    }
  }
}

// Play
var play = function () {
  word = document.getElementById("wordAns").innerHTML;
  word = word.replace(/\s/g, "-");
  buttons();

  guesses = [ ];
  lives = 10;
  counter = 0;
  space = 0;
  result();
  comments();
}

// Hint
hint.onclick = function() {
  var word = document.getElementById("wordAns").innerHTML;
  hints = getMeaning(word, 'hint');
};

// Reset
document.getElementById('newGame').onclick = function() {
  console.log(freshStart);
  if(freshStart != true)
  {
    location.reload()
    return false;
  }
  freshStart = false;
  document.getElementById("newGame").innerHTML = "New Game";
  getWord();
}