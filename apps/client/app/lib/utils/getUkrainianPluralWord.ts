const pluralForms = {
  курси: ['курс', 'курси', 'курсів'],
  сертифікати: ['сертифікат', 'сертифікати', 'сертифікатів'],
  символи: ['символ', 'символи', 'символів'],
  тести: ['тест', 'тести', 'тестів'],
  лекції: ['лекція', 'лекції', 'лекцій'],
};

export const getUkrainianPluralWord = (
  word: keyof typeof pluralForms,
  number: number,
) => {
  let formIndex;

  if (number % 10 === 1 && number % 100 !== 11) {
    formIndex = 0; // singular form
  } else if (
    [2, 3, 4].includes(number % 10) &&
    ![12, 13, 14].includes(number % 100)
  ) {
    formIndex = 1; // few form
  } else {
    formIndex = 2; // many form
  }

  return pluralForms[word][formIndex];
};
