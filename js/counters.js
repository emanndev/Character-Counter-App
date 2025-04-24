export function countCharacters(text, excludeSpaces = false) {
    if (typeof text !== 'string') return 0;
    return excludeSpaces ? text.replace(/\s/g, '').length : text.length;
  }
  
  export function countWords(text) {
    if (typeof text !== 'string') return 0;
    return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  }
  
  export function countSentences(text) {
    if (typeof text !== 'string') return 0;
    const sentences = text.split(/[.!?]+(?=\s|$)/);
    return sentences.filter(s => s.trim().length > 0).length;
  }
  