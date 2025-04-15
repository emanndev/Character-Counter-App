document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const textInput = document.getElementById('textInput');
    const totalCharsText = document.getElementById('totalCharactersText');
    const wordCountText = document.getElementById('wordCountText');
    const sentenceCountText = document.getElementById('sentenceCountText');
    const readingTime = document.getElementById('readingTime');
    const densityGrid = document.querySelector('.density-grid');
    const charLimitCheckbox = document.getElementById('charLimit');
    const excludeSpacesCheckbox = document.getElementById('excludeSpaces');
    
    // Variables
    let charLimit = null;
    let showAllLetters = false;
    const averageReadingSpeed = 200; // words per minute
    
 
      // Create See More button with arrowhead down symbol
      const seeMoreBtn = document.createElement('button');
      seeMoreBtn.className = 'see-more';
      seeMoreBtn.innerHTML = 'See more <span class="arrowhead"></span>';
      seeMoreBtn.addEventListener('click', toggleShowMore);
    
    // Event Listeners
    textInput.addEventListener('input', updateTextInput);
    charLimitCheckbox.addEventListener('change', toggleCharLimitInput);
    excludeSpacesCheckbox.addEventListener('change', updateTextInput);
    
    // Initialize UI
    updateTextInput();


    // Update text input function
    // This function updates the character, word, and sentence counts
    function updateTextInput() {
      const text = textInput.value;
      
      // Calculate character, word, and sentence counts
      // Exclude spaces if checkbox is checked
      const charCount = excludeSpacesCheckbox.checked 
        ? text.replace(/\s/g, '').length 
        : text.length;
      const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
      const sentenceCount = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
      
      // Update counters
      totalCharsText.textContent = charCount;
      wordCountText.textContent = wordCount;
      sentenceCountText.textContent = sentenceCount;
      
      // Calculate reading time
      updateReadingTime(wordCount);
      
      // Calculate letter density
      calculateLetterDensity(text);
      
      // Check character limit
      checkCharacterLimit(charCount);
    }
    

  // Toggle Show More/Less
  function toggleShowMore(e) {
    e.preventDefault();
    showAllLetters = !showAllLetters;
    calculateLetterDensity(textInput.value);
}

    
    // Update reading time display
    function updateReadingTime(wordCount) {
      const minutes = Math.ceil(wordCount / averageReadingSpeed);
      readingTime.textContent = `Approx. reading time: ${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }
    
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
        
        // Determine how many to show based on current state
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
      
         // Show See More button with arrowhead if there are more than 5 letters
         if (sortedLetters.length > 5 && !showAllLetters) {
            seeMoreBtn.innerHTML = 'See more <i class="fa-sharp-duotone fa-solid fa-angle-down"></i>';
            densityGrid.appendChild(seeMoreBtn);
        }
        // Show See Less button with arrowhead up when expanded
        else if (sortedLetters.length > 5 && showAllLetters) {
            seeMoreBtn.innerHTML = 'See less <i class="fa-sharp-duotone fa-solid fa-angle-up"></i>';
            densityGrid.appendChild(seeMoreBtn);
        }
    }
    
    // Character Limit Functionality
    function toggleCharLimitInput() {
      if (charLimitCheckbox.checked) {
        const limitInput = document.createElement('input');
        limitInput.type = 'number';
        limitInput.min = '1';
        limitInput.placeholder = 'Enter limit';
        limitInput.className = 'char-limit-input';
        
        limitInput.addEventListener('change', function() {
          charLimit = parseInt(this.value);
          updateTextInput();
        });
        
        const label = charLimitCheckbox.parentElement;
        label.appendChild(limitInput);
      } else {
        const existingInput = document.querySelector('.char-limit-input');
        if (existingInput) {
          existingInput.remove();
        }
        charLimit = null;
        removeLimitWarning();
      }
    }
    
    // Check Character Limit
    function checkCharacterLimit(currentCount) {
      removeLimitWarning();
      if (charLimit && charLimit > 0) {
        const warning = document.createElement('div');
        warning.className = 'limit-warning';
        
        if (currentCount > charLimit) {
          warning.textContent = `ⓘ Limit reached! Your text exceeds ${charLimit} characters`;
          warning.style.color = '#e74c3c';
        } else if (currentCount >= charLimit * 0.9) {
          warning.textContent = `⚠️ Approaching character limit (${currentCount}/${charLimit})`;
          warning.style.color = '#f39c12';
        } else {
          warning.textContent = `Characters: ${currentCount}/${charLimit}`;
          warning.style.color = '#2ecc71';
        }
        
        textInput.parentNode.insertBefore(warning, textInput.nextSibling);
      }
    }
    
    // Remove existing warning
    function removeLimitWarning() {
      const existingWarning = document.querySelector('.limit-warning');
      if (existingWarning) {
        existingWarning.remove();
      }
    }
});

