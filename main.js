// Javascript file for Alec's Resume Site

"use strict"

//Typewriter Effect Functions for Landing Page Banner

//Initialize all variables in typeText class:

var typeText = function(element, words, period) {
  this.words = words;
  this.period = parseInt(period, 10) || 2000; // OR 2000 in case data-period = NaN; prevents default of 0
  this.element = element;
  this.text = '';
  this.loopNum = 0;
  this.isDeleting = false
  this.tick();
};

typeText.prototype.tick = function()  {

  //Check which word in data-word attribute is to be selected, loopNum changes only when current word deletes completely

  var  i = this.loopNum %  this.words.length;
  var fullText = this.words[i];

  //How to string together typewriter effect frame by frame, depending on previous sequence direction
  //Also changes this.txt to reflect current progress

  if (this.isDeleting) {
    this.text = fullText.substring(0, this.text.length - 1);
  } else {
    this.text = fullText.substring(0, this.text.length + 1);
  }

  //Inject HTML this.text

  this.element.innerHTML = '<div id=typeeffect style= "color:white;"><h2>'+this.text+'</h2></div>';

  //Declare timing vaiable and recursive function to call at the end of script for looping

  var loopFunction = this;
  var delay = 250 - Math.random() * 100;

  //Halve delay during during delete (to make it look like someone holding backspace)

  if (this.isDeleting) { delay /= 2;}

  //Check for end of word typing and end of word deleting to change isDeleting and move to next word

  if (!this.isDeleting && this.text === fullText) {
    delay = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.text === '') {
    this.isDeleting = false;
    this.loopNum++;
    delay = 500;
  }

  //Recursive function call to begion next frame of effect with "natural" random delay

  setTimeout(function() {loopFunction.tick();}, delay);

};

//Start tick loop function on window load, initialize variables using element data attributes

window.onload = function() {
  var elements = document.getElementById('typewriterfunction');
  var words = elements.getAttribute('data-words');
  var period = elements.getAttribute('data-period');
  if (words) {
    new typeText(elements, JSON.parse(words), period);
  }
}
