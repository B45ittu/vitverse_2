

const Filter = require("bad-words");


const filter = new Filter();

export function detectOffensiveLanguage(text) {
  return filter.isProfane(text);
}
