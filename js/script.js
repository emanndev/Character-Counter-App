import { countCharacters, countWords, countSentences } from './counters.js';
import { updateCharacterDisplay, updateWordDisplay, updateSentenceDisplay } from './display.js';

// DOM Elements
const textInput = document.getElementById('textInput');
const readingTime = document.getElementById('readingTime');
const densityGrid = document.querySelector('.density-grid');
const charLimitCheckbox = document.getElementById('charLimit');
const excludeSpacesCheckbox = document.getElementById('excludeSpaces');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;
const logo = document.getElementById('logo');

// Application state
let charLimit = null;
let showAllLetters = false;
const averageReadingSpeed = 200;

// Create See More button (only once!)
const seeMoreBtn = document.createElement('button');
seeMoreBtn.className = 'see-more';
seeMoreBtn.innerHTML = 'See more <span class="arrowhead"></span>';

// Initialize theme
let currentTheme = localStorage.getItem('theme') || 
                 (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Main application functions
function updateTextInput() {
    const text = textInput.value;
    const excludeSpaces = excludeSpacesCheckbox.checked;
    
    const charCount = countCharacters(text, excludeSpaces);
    const wordCount = countWords(text);
    const sentenceCount = countSentences(text);
    
    updateCharacterDisplay(charCount, excludeSpaces);
    updateWordDisplay(wordCount);
    updateSentenceDisplay(sentenceCount);
    
    updateReadingTime(wordCount);
    calculateLetterDensity(text);
    checkCharacterLimit(charCount);
}

function toggleShowMore(e) {
    e.preventDefault();
    showAllLetters = !showAllLetters;
    calculateLetterDensity(textInput.value);
}

function updateReadingTime(wordCount) {
    const minutes = Math.ceil(wordCount / averageReadingSpeed);
    readingTime.textContent = `Approx. reading time: ${minutes} minute${minutes !== 1 ? 's' : ''}`;
}

function calculateLetterDensity(text) {
    densityGrid.innerHTML = '';
    const letters = text.toLowerCase().replace(/[^a-z]/g, '');
    const totalLetters = letters.length;
    
    if (totalLetters === 0) {
        densityGrid.innerHTML = '<p>No characters found. Start typing to see letter density</p>';
        return;
    }
    
    const letterCounts = {};
    for (const letter of letters) {
        letterCounts[letter] = (letterCounts[letter] || 0) + 1;
    }
    
    const sortedLetters = Object.entries(letterCounts).sort((a, b) => b[1] - a[1]);
    const lettersToShow = showAllLetters ? sortedLetters : sortedLetters.slice(0, 5);
    
    lettersToShow.forEach(([letter, count]) => {
        const percentage = ((count / totalLetters) * 100).toFixed(2);
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.innerHTML = `
            <div class="info"><span>${letter.toUpperCase()}</span></div>
            <div class="progress-bar"><span class="letter-${letter}" style="width: ${percentage}%"></span></div>
            <div class="percentage"><span>${count} (${percentage}%)</span></div>
        `;
        densityGrid.appendChild(bar);
    });
    
    if (sortedLetters.length > 5) {
        seeMoreBtn.innerHTML = showAllLetters 
            ? 'See less <i class="fa-sharp-duotone fa-solid fa-angle-up"></i>'
            : 'See more <i class="fa-sharp-duotone fa-solid fa-angle-down"></i>';
        densityGrid.appendChild(seeMoreBtn);
    }
}

function toggleCharLimitInput() {
    if (charLimitCheckbox.checked) {
        const limitInput = document.createElement('input');
        limitInput.type = 'number';
        limitInput.min = '1';
        limitInput.placeholder = 'Enter limit';
        limitInput.className = 'char-limit-input';
        limitInput.addEventListener('change', () => {
            charLimit = parseInt(limitInput.value);
            updateTextInput();
        });
        charLimitCheckbox.parentElement.appendChild(limitInput);
    } else {
        const existingInput = document.querySelector('.char-limit-input');
        if (existingInput) existingInput.remove();
        charLimit = null;
        removeLimitWarning();
    }
}

function checkCharacterLimit(currentCount) {
    removeLimitWarning();
    if (!charLimit || charLimit <= 0) {
        textInput.style.borderColor = '';
        return;
    }
    
    const warning = document.createElement('div');
    warning.className = 'limit-warning';
    
    if (currentCount >= charLimit) {
        textInput.style.borderColor = '#e74c3c';
        textInput.value = textInput.value.substring(0, charLimit);
        warning.textContent = `ⓘ Limit reached at ${charLimit} characters`;
        warning.style.color = '#e74c3c';
    } else if (currentCount >= charLimit * 0.9) {
        textInput.style.borderColor = '';
        warning.textContent = `⚠️ Approaching character limit (${currentCount}/${charLimit})`;
        warning.style.color = '#f39c12';
    } else {
        textInput.style.borderColor = '';
        warning.textContent = `Characters: ${currentCount}/${charLimit}`;
        warning.style.color = '#2ecc71';
    }
    textInput.parentNode.insertBefore(warning, textInput.nextSibling);
}

function removeLimitWarning() {
    const existingWarning = document.querySelector('.limit-warning');
    if (existingWarning) existingWarning.remove();
}

// Theme functions
function setLightTheme() {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.src = "./assets/images/icon-moon.svg";
    logo.src = "./assets/images/logo-light-theme.svg";
    localStorage.setItem('theme', 'light');
    currentTheme = 'light';
    themeToggle.setAttribute('aria-pressed', 'false');
}

function setDarkTheme() {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    document.documentElement.setAttribute('data-theme', 'dark');  
    themeIcon.src = "./assets/images/icon-sun.svg";
    logo.src = "./assets/images/logo-dark-theme.svg";
    localStorage.setItem('theme', 'dark');
    currentTheme = 'dark';
    themeToggle.setAttribute('aria-pressed', 'true');
}

function toggleTheme() {
    if (currentTheme === 'light') setDarkTheme();
    else setLightTheme();
}

// Initialization
function initLoader() {
    const preloader = document.getElementById('preloader');
    preloader.style.transition = "opacity 2s ease";
    preloader.style.opacity = "0";
    setTimeout(() => {
        preloader.style.display = "none";
        document.body.classList.add("page-loaded");
    }, 1000);
}

function initApp() {
    // Set initial theme
    if (currentTheme === 'light') setLightTheme();
    else setDarkTheme();
    
    // Set up event listeners
    textInput.addEventListener('input', updateTextInput);
    charLimitCheckbox.addEventListener('change', toggleCharLimitInput);
    excludeSpacesCheckbox.addEventListener('change', updateTextInput);
    themeToggle.addEventListener('click', toggleTheme);
    seeMoreBtn.addEventListener('click', toggleShowMore);
    
    // Initialize with empty values
    updateTextInput();
    
    // Set up loader
    window.addEventListener('load', initLoader);
}

// Start the application
initApp();
export {
  updateTextInput,
  toggleCharLimitInput,
  checkCharacterLimit,
  removeLimitWarning,
  calculateLetterDensity,
  updateReadingTime
};