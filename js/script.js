document.addEventListener('DOMContentLoaded', function() {

    //animation for letters cube preloader
    window.addEventListener("load", () => {
        const preloader = document.getElementById("preloader");
  
      
        // Fade out the cube preloader
        preloader.style.transition = "opacity 2s ease";
        preloader.style.opacity = "0";
      
        setTimeout(() => {
          preloader.style.display = "none";
          document.body.classList.add("page-loaded");
        }, 1000);
      });



    // DOM Elements
    const textInput = document.getElementById('textInput');
    const totalCharsText = document.getElementById('totalCharactersText');
    const wordCountText = document.getElementById('wordCountText');
    const sentenceCountText = document.getElementById('sentenceCountText');
    const readingTime = document.getElementById('readingTime');
    const densityGrid = document.querySelector('.density-grid');
    const charLimitCheckbox = document.getElementById('charLimit');
    const excludeSpacesCheckbox = document.getElementById('excludeSpaces');



     // DOM Elements for theme toggle
     const themeToggle = document.getElementById('themeToggle');
     const themeIcon = document.getElementById('themeIcon');
     const body = document.body;
     const logo = document.getElementById('logo');
     
     // Getting the saved theme from localStorage
     let currentTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
     
     // Set initial theme
     if (currentTheme === 'light') {
         setLightTheme();
     } else {
         setDarkTheme();
     }
 
     // Theme toggle event listener
     themeToggle.addEventListener('click', () => {
         if (currentTheme === 'light') {
             setDarkTheme();
         } else {
             setLightTheme();
         }
     });
 
     function setLightTheme() {
         // Update classes
         body.classList.remove('dark-theme');
         body.classList.add('light-theme');
         document.documentElement.setAttribute('data-theme', 'light');
         themeIcon.src = "./assets/images/icon-moon.svg";
         logo.src = "./assets/images/logo-light-theme.svg";

         localStorage.setItem('theme', 'light');
         currentTheme = 'light';
     }
 
     function setDarkTheme() {
         // Update classes
         body.classList.remove('light-theme');
         body.classList.add('dark-theme');
         document.documentElement.setAttribute('data-theme', 'dark');  
         themeIcon.src = "./assets/images/icon-sun.svg";
         logo.src = "./assets/images/logo-dark-theme.svg";
         
         localStorage.setItem('theme', 'dark');
         currentTheme = 'dark';
     }
     themeToggle.setAttribute('aria-pressed', currentTheme === 'dark');
 

    let charLimit = null;
    let showAllLetters = false;
    const averageReadingSpeed = 200;
    
 
      // Create See More button with arrowhead down symbol
      const seeMoreBtn = document.createElement('button');
      seeMoreBtn.className = 'see-more';
      seeMoreBtn.innerHTML = 'See more <span class="arrowhead"></span>';
      seeMoreBtn.addEventListener('click', toggleShowMore);
    
    // Event Listeners
    textInput.addEventListener('input', updateTextInput);
    charLimitCheckbox.addEventListener('change', toggleCharLimitInput);
    excludeSpacesCheckbox.addEventListener('change', updateTextInput);
    
    updateTextInput();


    // Update text input function

    function updateTextInput() {
      const text = textInput.value;
      
      // Calculate character, word, and sentence counts
      // Exclude spaces if checkbox is checked
      const totalCharSubtext = document.getElementById('totalCharSubtext');
      const excludeSpaces = excludeSpacesCheckbox.checked;
      const charCount = excludeSpacesCheckbox.checked ? text.replace(/\s/g, '').length : text.length;
      const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
      const sentenceCount = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
      
      //No spaces in subtext update
      if (excludeSpaces) {
        totalCharSubtext.textContent = ' (no spaces)';
    } else {
        totalCharSubtext.textContent = '';
    }

      
      // Update counters
      totalCharsText.textContent = charCount;
      wordCountText.textContent = wordCount;
      sentenceCountText.textContent = sentenceCount;
      
      updateReadingTime(wordCount);
      
      calculateLetterDensity(text);
      
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
        densityGrid.innerHTML = '';
        
        // Remove non-letter characters and convert to lowercase
        // Replace all non-letter characters with empty string
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
        
        // Convert to array and sort by count
        const sortedLetters = Object.entries(letterCounts).sort((a, b) => b[1] - a[1]);
        const lettersToShow = showAllLetters ? sortedLetters : sortedLetters.slice(0, 5);
        
        // display each progress bars for the letters
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
        
        // conditon to check if over the limit
        if (currentCount >= charLimit) {
            const textArea = document.querySelector('textarea');
            textArea.style.borderColor = '#e74c3c';
            textInput.value = textInput.value.substring(0, charLimit);
            warning.textContent = `ⓘ Limit reached at ${charLimit} characters`;
            warning.style.color = '#e74c3c';
        } 
        else if (currentCount >= charLimit * 0.9) {
            textInput.style.borderColor = ''; // Reset border color
            warning.textContent = `⚠️ Approaching character limit (${currentCount}/${charLimit})`;
            warning.style.color = '#f39c12';
        } 
        else {
            textInput.style.borderColor = '';
            warning.textContent = `Characters: ${currentCount}/${charLimit}`;
            warning.style.color = '#2ecc71';
        }
        textInput.parentNode.insertBefore(warning, textInput.nextSibling);
    } else {
        textInput.style.borderColor = '';
    }
}
    
    // Remove warning
    function removeLimitWarning() {
      const existingWarning = document.querySelector('.limit-warning');
      if (existingWarning) {
        existingWarning.remove();
      }
    }

    //Mouse trail animation
    const symbols = ['∑', 'π', '√', '∫', '∞'];

    document.addEventListener('mousemove', (e) => {
      const symbol = document.createElement('div');
      symbol.className = 'symbol';
      symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      symbol.style.left = `${e.clientX}px`;
      symbol.style.top = `${e.clientY}px`;
      symbol.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      document.body.appendChild(symbol);
    
      setTimeout(() => {
        symbol.remove();
      }, 1000); 
    });

   
});

