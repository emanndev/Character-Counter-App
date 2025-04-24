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
    // Set up document body
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
});