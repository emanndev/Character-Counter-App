import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

// Import all needed functions at the top
import { countCharacters, countWords, countSentences } from '../js/counters.js';
import { updateCharacterDisplay, updateWordDisplay, updateSentenceDisplay } from '../js/display.js';
import { updateTextInput } from '../js/script.js';

describe('Integration Tests', () => {
  let dom;
  let window;
  let document;

  beforeAll(async () => {
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

    dom = new JSDOM(html, {
      url: "http://localhost/",
      runScripts: "dangerously",
      resources: "usable",
      pretendToBeVisual: true,
    });
    
    window = dom.window;
    document = window.document;
    global.window = window;
    global.document = document;
  }, 10000);

  afterAll(() => {
    dom.window.close();
  });

  test('counts characters correctly', () => {
    const { countCharacters } = require('../js/counters.js');
    const testText = 'Hello, world!';
    expect(countCharacters(testText)).toBe(13);
    expect(countCharacters(testText, true)).toBe(12);
  });

  test('counts characters correctly', () => {
    const testText = 'Hello, world!';
    expect(countCharacters(testText)).toBe(13);
    expect(countCharacters(testText, true)).toBe(12); // Excluding spaces
  });
  
  test('counts words correctly', () => {
    expect(countWords('Hello world')).toBe(2);
    expect(countWords('One   two  three')).toBe(3);
    expect(countWords('')).toBe(0);
  });
  
  test('counts sentences correctly', () => {
    expect(countSentences('Hello. World!')).toBe(2);
    expect(countSentences('This is one sentence.')).toBe(1);
  });
  
  test('updates DOM elements when text changes', () => {
    // Setup
    const textInput = document.getElementById('textInput');
    const charCount = document.getElementById('totalCharactersText');
    const wordCount = document.getElementById('wordCountText');
    const sentenceCount = document.getElementById('sentenceCountText');
    
    // Mock necessary functions
    window.updateCharacterDisplay = updateCharacterDisplay;
    window.updateWordDisplay = updateWordDisplay;
    window.updateSentenceDisplay = updateSentenceDisplay;
    
    textInput.value = 'Hello, world! This is a test.';
    
    const count = countCharacters(textInput.value);
    const words = countWords(textInput.value);
    const sentences = countSentences(textInput.value);
    
    updateCharacterDisplay(count, false);
    updateWordDisplay(words);
    updateSentenceDisplay(sentences);
    
    expect(charCount.textContent).toBe('29');
    expect(wordCount.textContent).toBe('6');
    expect(sentenceCount.textContent).toBe('2');
  });
  
  afterAll(() => {
    window.close();
  });
});
