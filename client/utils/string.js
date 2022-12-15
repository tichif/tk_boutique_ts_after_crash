export const convertString = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1);

export const convertMultipleWords = (words) => {
  const wordArray = words.split(' ');

  const newArray = wordArray.map((word) => convertString(word));

  return newArray.join(' ');
};
