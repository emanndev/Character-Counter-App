# 📊 Character Counter Web App
A real-time text analysis tool that helps you measure character count, word count, sentence count, and letter density as you type. 
It comes with a slick preloader animation, light/dark mode toggle, and an interactive UI to set character limits and visualize letter frequency distribution.

## 🚀 Features
🔢 Real-Time Character, Word & Sentence Count

🎯 Exclude Spaces Option

🔡 Letter Density Visualization (with "See More/Less" functionality)

⏱️ Estimated Reading Time Calculation

🚧 Set Character Limit Warning System

🌗 Dark/Light Theme Toggle (with saved preferences)

🌀 Animated Preloader Cube

🎨 Colorful Math Symbols Mouse Trail Effect


## New Testing Features
🧪 Comprehensive Unit Testing (Jest)
✅ Integration Testing for DOM updates
🔄 Mocked dependencies for isolated testing
📊 Test coverage reporting



## 📁 Project Structure

├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── Readme.md
│tests/
├── dom.test.js       - DOM manipulation tests
├── integration.test.js - Full integration tests
└── characterCounter.test.js - Core counter function tests          
└── assets/
    └── images/
    ├── fonts


## Key Test Cases
Character counting (with/without spaces)

Word counting (various whitespace scenarios)

Sentence counting (multiple punctuation cases)

DOM updates verification

Theme toggling functionality

Character limit enforcement

Reading time calculation

Letter density visualization


## Running Tests
npm test          # Run all tests
npm run test:watch # Watch mode
npm run test:coverage # Generate coverage report

## Key Improvements
Modular JavaScript architecture

Comprehensive error handling

Responsive design enhancements

Optimized performance

Rigorous test coverage

## 🛠️ How It Works
Input Box – Type or paste any text in the text area.

Live Analytics – Instantly see updated metrics:

⁍ Total Characters

⁍ Word Count

⁍ Sentence Count

⁍ Reading Time Estimate

⁍ Letter Density Chart – Shows most frequently used letters using horizontal progress bars.

⁍ Toggle Options:

⁍ Exclude Spaces: Ignores spaces in the character count.

⁍ Set Character Limit: Enables input field to specify a limit; shows warnings when approaching or exceeding it.

⁍ Themes – Dark and Light mode switcher with persistent user preference (via localStorage).

⁍ Preloader – Cool 3D cube animation that fades out on load.

⁍ Mouse Trail – Colorful math symbols follow the pointer, giving a playful effect.

## 📷  Demo

🔗 [Live Demo](https://emanndev.github.io/Lab-3/) 

📂 [GitHub Repository](https://github.com/emanndev/Lab-3)


## 💡 Technologies Used

HTML5

CSS3

JavaScript (Vanilla)

FontAwesome (for icons)

LocalStorage (for theme persistence)


## ⚙️ Setup Instructions

⁍ Clone the repository or download the ZIP.

⁍ Open index.html in any modern browser.

⁍ (Optional) Serve with a local development server for enhanced experience.

## If using VS Code
npx live-server
📌 Notes
This app is fully client-side and doesn't store any input data.

Responsive design and animations are included.

Ideal for writers, content creators, and developers who need a quick analysis tool.


## New Features
Testing Infrastructure
Jest test runner configuration

jsdom for browser-like testing environment

Mocked DOM implementations

CI-ready test suite
## Enhanced Functionality
Improved character limit warnings

Optimized letter density algorithm

Theme persistence bug fixes

Performance optimizations

## 🙌 Developer
Developed by: emanndev

## 📄 License

No License.
