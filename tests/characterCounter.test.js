import { countCharacters, countWords, countSentences } from "../js/counters";

  //Unit testing for character counter

describe('countCharacters', () => {
    test('counts all characters by default', () => {
      expect(countCharacters('Hello world')).toBe(11);
    });
    test('excludes spaces when requested', () => {
        expect(countCharacters('Hello world', true)).toBe(10);
      });
      test('counts special characters', () => {
        expect(countCharacters('café')).toBe(4);
        expect(countCharacters('#$')).toBe(2);
      });
      test('handles empty string', () => {
        expect(countCharacters('')).toBe(0);
      });
      test('checks excessive whitespace', () => {
        expect(countCharacters('hello    world')).toBe(14);
        expect(countCharacters('hello    world', true)).toBe(10);
        expect(countCharacters('   ')).toBe(3);
        expect(countCharacters('   ', true)).toBe(0);
      });
  });

  describe('countWords', () => {
    test('counts words correctly', () => {
      expect(countWords('hello world')).toBe(2);
    });
    test('handles empty string', () => {
        expect(countWords('')).toBe(0);
      });
      test('checks plenty whitespace', () => {
        expect(countWords('hello    world')).toBe(2);
        expect(countWords('   hello   world   ')).toBe(2);
      });
      test('checks for hyphenated words', () => {
        expect(countWords('state-of-the-art')).toBe(1);
      });
      test('handles apostrophes', () => {
        expect(countWords("don't stop")).toBe(2);
      });
  });

  describe('countSentences', () => {
    test('counts sentences', () => {
      expect(countSentences('Hello. World!')).toBe(2);
    });
    test('handles empty string', () => {
        expect(countSentences('')).toBe(0);
      });
      test('handles question and exclamation marks', () => {
        expect(countSentences('Hello? World! How are you?')).toBe(3);
      });
      test('handles quotes and parentheses', () => {
        expect(countSentences('He said, "Hello!" (Then left.)')).toBe(1);
      });
  });
  

