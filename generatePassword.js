let updateLength = () => {
  let out = document.getElementById("length");
  out.innerHTML = document.getElementById("lengthSlide").value;
  generatePassword();
};

let generatePassword = () => {
  let password = "";
  let length = Number(document.getElementById("lengthSlide").value);
  let arr = [generateLowercase];

  let hasUppercase = document.getElementById("uppercase").checked;
  let hasNumbers = document.getElementById("numbers").checked;
  let hasSymbols = document.getElementById("symbols").checked;
  while (length > 0) {
    let chooseCharacter = Math.round(Math.random() * 0);

    if (hasUppercase) {
      arr.push(generateUppercase);
    }
    if (hasNumbers) {
      arr.push(generateNumbers);
    }
    if (hasSymbols) {
      arr.push(generateSymbols);
    }
    chooseCharacter = Math.round(Math.random() * (-1 + arr.length));
    password += arr[chooseCharacter]();
    length--;
  }
  document.getElementById("output").innerText = password;
  let strength = passwordStrength(password);

  if (strength === "strong") {
    document.getElementById("bar1").style.backgroundColor = "hsl(80, 43%, 35%)";
    document.getElementById("bar2").style.backgroundColor = "hsl(90, 43%, 41%)";
    document.getElementById("bar3").style.backgroundColor =
      "hsl(100, 43%, 45%)";
    if (password.length > 10) {
      document.getElementById("bar4").style.backgroundColor =
        "hsl(110, 43%, 51%)";
    }
    return;
  } else {
    document.getElementById("bar1").style.backgroundColor = "transparent";
    document.getElementById("bar2").style.backgroundColor = "transparent";
    document.getElementById("bar3").style.backgroundColor = "transparent";
    document.getElementById("bar4").style.backgroundColor = "transparent";
  }

  if (strength === "medium") {
    document.getElementById("bar1").style.backgroundColor = "hsl(80, 43%, 35%)";
    document.getElementById("bar2").style.backgroundColor = "hsl(90, 43%, 41%)";
    if (password.length > 10) {
      document.getElementById("bar3").style.backgroundColor =
        "hsl(100, 43%, 45%)";
    }
    return;
  } else {
    document.getElementById("bar1").style.backgroundColor = "transparent";
    document.getElementById("bar2").style.backgroundColor = "transparent";
    document.getElementById("bar3").style.backgroundColor = "transparent";
  }

  if (strength === "weak") {
    document.getElementById("bar1").style.backgroundColor = "hsl(80, 43%, 35%)";
    if (password.length > 10) {
      document.getElementById("bar2").style.backgroundColor =
        "hsl(90, 43%, 41%)";
    }
  } else {
    document.getElementById("bar1").style.backgroundColor = "transparent";
    document.getElementById("bar2").style.backgroundColor = "transparent";
  }
};

let generateLowercase = () => {
  let min = 97,
    max = 122;
  return String.fromCharCode(Math.random() * (max - min) + min);
};

let generateUppercase = () => {
  let min = 65,
    max = 90;
  return String.fromCharCode(Math.random() * (max - min) + min);
};

let generateNumbers = () => {
  let min = 48,
    max = 57;
  return String.fromCharCode(Math.random() * (max - min) + min);
};

let generateSymbols = () => {
  let min = 32,
    max = 127;
  let rand = Math.random() * (max - min) + min;
  if (
    (rand >= 97 && rand <= 122) ||
    (rand >= 65 && rand <= 90) ||
    (rand >= 48 && rand <= 57)
  ) {
    return generateSymbols();
  } else return String.fromCharCode(rand);
};

let copyPassword = () => {
  document.cookie = "password=;expires=Thu, 01 Jan 1970 00:00:00 UTC";
  var copyText = document.getElementById("output");
  document.cookie = "password=" + copyText.innerHTML;

  navigator.clipboard.writeText(copyText.innerHTML);
};
window.onload = () => {
  var copyText = document.getElementById("output");
  copyText.innerHTML = decodeURIComponent(document.cookie).substring(
    9,
    decodeURIComponent(document.cookie).length
  );
};

/**********PASSWORD STRENGTH CHECKER****************** */
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
  if (password.length < 8) {
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
