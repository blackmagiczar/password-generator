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
const strengthOfPassword = ["invalid", "weak", "medium", "strong"];

function passwordStrength(password) {
  if (password.length < 9) {
    return strengthOfPassword[0];
  } else {
    let conditionsPassed = 2;

    conditionsPassed = hasLowercase(password, conditionsPassed);
    conditionsPassed = hasUppercase(password, conditionsPassed);
    conditionsPassed = hasNumber(password, conditionsPassed);
    conditionsPassed = hasWhitespace(password, conditionsPassed);
    conditionsPassed = hasSpecialCharacters(password, conditionsPassed);

    if (conditionsPassed === 3) {
      return strengthOfPassword[1];
    }
    if (conditionsPassed === 4 || conditionsPassed === 5) {
      return strengthOfPassword[2];
    }
    if (conditionsPassed >= 6) {
      return strengthOfPassword[3];
    }
  }
}
