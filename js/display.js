// display.js - Handles UI updates
export function updateCharacterDisplay(count, excludeSpaces) {
    const totalCharsText = document.getElementById('totalCharactersText');
    const totalCharSubtext = document.getElementById('totalCharSubtext');
    
    totalCharsText.textContent = count;
    totalCharSubtext.textContent = excludeSpaces ? ' (no spaces)' : '';
  }
  
  export function updateWordDisplay(count) {
    document.getElementById('wordCountText').textContent = count;
  }
  
  export function updateSentenceDisplay(count) {
    document.getElementById('sentenceCountText').textContent = count;
  }
  