function hasLowercase(password, conditions) {
  return /[a-z]/.test(password) ? (conditions += 1) : conditions;
}

function hasUppercase(password, conditions) {
  return /[A-Z]/.test(password) ? (conditions += 1) : conditions;
}

function hasNumber(password, conditions) {
  return /[0-9]/.test(password) ? (conditions += 1) : conditions;
}

function hasWhitespace(password, conditions) {
  return /\s/.test(password) ? (conditions += 1) : conditions;
}

function hasSpecialCharacters(password, conditions) {
  return /\W/.test(password) ? (conditions += 1) : conditions;
}
module.exports = {
  hasLowercase,
  hasUppercase,
  hasNumber,
  hasWhitespace,
  hasSpecialCharacters,
};
