const randomize = require('randomatic');
const SEPARATOR_HYPHEN = '-';
const CHAR_COMBINATION = 'Aa0';

const ExposableIdGenerator = {
  EXPOSABLE_ID_USER: async () => {
    return 'USR' + SEPARATOR_HYPHEN + randomize(CHAR_COMBINATION, 20);
  },
};

module.exports = ExposableIdGenerator;
