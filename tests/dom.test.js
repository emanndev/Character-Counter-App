import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/dom';

// Mocking the necessary modules
jest.mock('../js/display.js', () => ({
  updateCharacterDisplay: jest.fn(),
  updateWordDisplay: jest.fn(),
  updateSentenceDisplay: jest.fn()
}));

// Importing functions directly
import { countCharacters, countWords, countSentences } from '../js/counters.js';
import { updateCharacterDisplay, updateWordDisplay, updateSentenceDisplay } from '../js/display.js';
import { updateTextInput } from '../js/script.js';

describe('DOM Updates', () => {
  let originalBody;

  beforeAll(() => {
    originalBody = document.body.innerHTML;
  });

  beforeEach(() => {
    // Set up document body with ALL required elements
    document.body.innerHTML = `
      <textarea id="textInput"></textarea>
      <span id="totalCharactersText">0</span>
      <span id="totalCharSubtext"></span>
      <span id="wordCountText">0</span>
      <span id="sentenceCountText">0</span>
      <span id="readingTime">Approx. reading time: 0 minutes</span>
      <input type="checkbox" id="charLimit" />
      <input type="checkbox" id="excludeSpaces" />
      <div class="density-grid"></div>
      <div class="limit-warning"></div>
      <button class="theme-toggle" id="themeToggle">
        <img id="themeIcon" class="theme-icon">
      </button>
      <img class="logo" id="logo">
    `;
    
    // Reset all mocks
    jest.clearAllMocks();
  });

  afterAll(() => {
    document.body.innerHTML = originalBody;
  });
  
  test('updates character count on input', () => {
    const textInput = document.getElementById('textInput');
    textInput.value = 'Hello World';
    const result = updateTextInput();
    expect(updateCharacterDisplay).toHaveBeenCalledWith(11, false);
    expect(result.charCount).toBe(11);
  });

  test('shows warning when approaching limit', () => {
    const textInput = document.getElementById('textInput');
    const charLimitCheckbox = document.getElementById('charLimit');
    fireEvent.click(charLimitCheckbox);
    const limitInput = document.createElement('input');
    limitInput.type = 'number';
    limitInput.value = '100'; 
    limitInput.className = 'char-limit-input';
    charLimitCheckbox.parentElement.appendChild(limitInput);
    
    const approachingText = 'a'.repeat(90);
    fireEvent.input(textInput, { target: { value: approachingText } });
    
    const warning = document.querySelector('.limit-warning');
    expect(warning).not.toBeNull();
    expect(warning.textContent).toContain('Approaching');
    expect(warning.style.color).toBe('rgb(243, 156, 18)');
  });

  test('updates reading time', () => {
    const textInput = document.getElementById('textInput');
    const readingTime = document.getElementById('readingTime');
    
    const text200Words = Array(200).fill('word').join(' ');
    fireEvent.input(textInput, { target: { value: text200Words } });
    expect(readingTime.textContent).toBe('Approx. reading time: 1 minute');
    
    const text250Words = Array(250).fill('word').join(' ');
    fireEvent.input(textInput, { target: { value: text250Words } });
    expect(readingTime.textContent).toBe('Approx. reading time: 2 minutes');
  });

  test('handles empty input', () => {
    const textInput = document.getElementById('textInput');
    textInput.value = '';
    const result = updateTextInput();
    expect(result.charCount).toBe(0);
    expect(result.wordCount).toBe(0);
    expect(result.sentenceCount).toBe(0);
  });
  test('correctly excludes spaces when checkbox is checked', () => {
    const textInput = document.getElementById('textInput');
    const excludeSpacesCheckbox = document.getElementById('excludeSpaces');
    
    // Check the exclude spaces checkbox
    fireEvent.click(excludeSpacesCheckbox);
    
    textInput.value = 'Hello World'; // 11 chars total, 10 without space
    const result = updateTextInput();
    
    expect(updateCharacterDisplay).toHaveBeenCalledWith(10, true);
    expect(result.charCount).toBe(10);
  });
  test('enforces character limit when exceeded', () => {
    const textInput = document.getElementById('textInput');
    const charLimitCheckbox = document.getElementById('charLimit');
    
    // Set up character limit
    fireEvent.click(charLimitCheckbox);
    const limitInput = document.createElement('input');
    limitInput.type = 'number';
    limitInput.value = '10';
    limitInput.className = 'char-limit-input';
    charLimitCheckbox.parentElement.appendChild(limitInput);
    fireEvent.change(limitInput); // Trigger the change event
    
    // Try to input more than limit
    const longText = 'This is too long';
    fireEvent.input(textInput, { target: { value: longText } });
    
    // Should be truncated to 10 characters
    expect(textInput.value).toBe('This is to');
    expect(updateCharacterDisplay).toHaveBeenCalledWith(10, false);
  });
  test('calculates letter density ignoring numbers and special chars', () => {
    const textInput = document.getElementById('textInput');
    textInput.value = 'Hello123 World! @#$% Test';
    
    // Mock the density grid update
    const mockAppendChild = jest.fn();
    document.querySelector('.density-grid').appendChild = mockAppendChild;
    
    const result = updateTextInput();
    
    // Verify the letter processing
    const expectedLetters = 'helloworldtest';
    expect(result.charCount).toBe(expectedLetters.length);
    
    // Verify density grid was updated
    expect(mockAppendChild).toHaveBeenCalled();
    
  });
  test('toggles show all letters in density grid', () => {
    const textInput = document.getElementById('textInput');
    textInput.value = 'a b c d e f g h i j k'; // 11 unique letters
    
    // First update with showAllLetters false (default)
    updateTextInput();
    const initialBars = document.querySelectorAll('.density-grid .bar');
    expect(initialBars.length).toBe(5); // Should show top 5
    
  
    showAllLetters = true;
    updateTextInput();
    const allBars = document.querySelectorAll('.density-grid .bar');
    expect(allBars.length).toBe(11); // Should show all letters
    
    // Verify see more/less button text changes
    const seeMoreBtn = document.querySelector('.see-more');
    expect(seeMoreBtn.innerHTML).toContain('See less');
  });
});