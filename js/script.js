document.addEventListener('DOMContentLoaded', function() {

//Initialize variables

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

//Event listener for text input, character limit checkbox, and exclude spaces checkbox
textInput.addEventListener('input', updateTextInput);
charLimitCheckbox.addEventListener('change', CharLimitInput);
excludeSpacesCheckbox.addEventListener('change', updateTextInput);

function updateTextInput() {
    const text = textInput.value;
    
    // Calculate counts and reading time
    const charCount = excludeSpacesCheckbox.checked ? text.replace(/\s/g, '').length : text.length;
    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const sentenceCount = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
    
  // Update counter in DOM
  totalCharsText.textContent = charCount;
  wordCountText.textContent = wordCount;
  sentenceCountText.textContent = sentenceCount;
  
  // Calculate reading time
  const minutes = Math.ceil(wordCount / averageReadingSpeed);
  readingTime.textContent = `Approx. reading time: ${minutes} minute${minutes !== 1 ? 's' : ''}`;

      // Calculate letter density
      calculateLetterDensity(text);
    
      // Check character limit
      checkCharacterLimit(charCount);
    }

// Letter Density Calculation
function calculateLetterDensity(text) {
    // Clear previous results
    densityGrid.innerHTML = '';
    
    // Filter only letters and convert to lowercase
    const letters = text.toLowerCase().replace(/[^a-z]/g, '');
    const totalLetters = letters.length;
    
    if (totalLetters === 0) {
      densityGrid.innerHTML = '<p>No characters found. Start typing to see letter density</p>';
      return;
    }
    
    // Count each letter occurrence
    const letterCounts = {};
    for (const letter of letters) {
      letterCounts[letter] = (letterCounts[letter] || 0) + 1;
    }
    
    // Convert to array and sort by count (descending)
    const sortedLetters = Object.entries(letterCounts)
      .sort((a, b) => b[1] - a[1]);
    
    // Determine how many to show (5 initially, or all if showAllLetters is true)
    const lettersToShow = showAllLetters ? sortedLetters : sortedLetters.slice(0, 5);
    
    // Create progress bars for each letter
    lettersToShow.forEach(([letter, count]) => {
      const percentage = ((count / totalLetters) * 100).toFixed(2);
      
      const bar = document.createElement('div');
      bar.className = 'bar';
      
      bar.innerHTML = `
        <div class="info">
          <span>${letter.toUpperCase()}</span>
        </div>
        <div class="progress-bar">
          <span class="letter-${letter}" style="width: ${percentage}%"></span>
        </div>
        <div class="percentage">
          <span class="percentage">${count} (${percentage}%)</span>
        </div>
      `;
      
      densityGrid.appendChild(bar);
    });
    
    // Show "See More" if there are more letters to show
    if (sortedLetters.length > 5 && !showAllLetters) {
      densityGrid.appendChild(seeMoreBtn);
    }
  }



   // Letter Density Calculation
   function calculateLetterDensity(text) {
    // Clear previous results
    densityGrid.innerHTML = '';
    
    // Filter only letters and convert to lowercase
    const letters = text.toLowerCase().replace(/[^a-z]/g, '');
    const totalLetters = letters.length;
    
    if (totalLetters === 0) {
      densityGrid.innerHTML = '<p>No characters found. Start typing to see letter density</p>';
      return;
    }
    
    // Count each letter occurrence
    const letterCounts = {};
    for (const letter of letters) {
      letterCounts[letter] = (letterCounts[letter] || 0) + 1;
    }
    
    // Convert to array and sort by count (descending)
    const sortedLetters = Object.entries(letterCounts)
      .sort((a, b) => b[1] - a[1]);
    
    // Determine how many to show (5 initially, or all if showAllLetters is true)
    const lettersToShow = showAllLetters ? sortedLetters : sortedLetters.slice(0, 5);
    
    // Create progress bars for each letter
    lettersToShow.forEach(([letter, count]) => {
      const percentage = ((count / totalLetters) * 100).toFixed(2);
      
      const bar = document.createElement('div');
      bar.className = 'bar';
      
      bar.innerHTML = `
        <div class="info">
          <span>${letter.toUpperCase()}</span>
        </div>
        <div class="progress-bar">
          <span class="letter-${letter}" style="width: ${percentage}%"></span>
        </div>
        <div class="percentage">
          <span class="percentage">${count} (${percentage}%)</span>
        </div>
      `;
      
      densityGrid.appendChild(bar);
    });
    
    // Show "See More" if there are more letters to show
    if (sortedLetters.length > 5 && !showAllLetters) {
      densityGrid.appendChild(seeMoreBtn);
    }
  }
});



//Event listener for see more button
seeMoreBtn.addEventListener('click', function(event) {
    event.preventDefault();
    showAllLetters = !showAllLetters;
    updateTextInput();
});
