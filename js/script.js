document.addEventListener('DOMContentLoaded', function() {

const textInput = document.getElementById('text-input');
const totalCharsText = document.getElementById('totalCharactersText');
const wordCountText = document.getElementById('wordCountText');
const sentenceCountText = document.getElementById('sentenceCountText');
const readingTime = document.getElementById('readingTime');
const densityGrid = document.querySelector('.density-grid');
const charLimitCheckbox = document.getElementById('charLimit');
const excludeSpacesCheckbox = document.getElementById('excludeSpaces');



const readingSpeed = 200; 
const seeMoreBtn = document.createElement('a');
let charLimit = null;
let showAllLetters = false;

//Update DOM to show see more button
seeMoreBtn.href = '#';
seeMoreBtn.className = 'see-more';
seeMoreBtn.innerHTML = 'See more <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>';

//Event listener for see more button
seeMoreBtn.addEventListener('click', function(event) {
    event.preventDefault();
    showAllLetters = !showAllLetters;
    updateTextInput();
});

//Event listener for text input, character limit checkbox, and exclude spaces checkbox
textInput.addEventListener('input', updateTextInput);
charLimitCheckbox.addEventListener('change', CharLimitInput);
excludeSpacesCheckbox.addEventListener('change', updateTextInput);







});

