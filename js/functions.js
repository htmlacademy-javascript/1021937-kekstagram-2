const maxLengthStringCount = 10;
const testMaxLengthString = 'Проверяемая строка';

const isValidStringLength = (string, maxLength) => string.length <= maxLength;
isValidStringLength(testMaxLengthString, maxLengthStringCount);

const testPalindromeString = 'Лёша на полке клопа нашёл';
const isPalindrome = (string) => {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }

  return normalizedString === reversedString;
};

isPalindrome(testPalindromeString);
