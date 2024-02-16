const gameContainer = document.querySelector(".game-container");
const passwordInput = document.querySelector(".password-input");
const ruleTemplate = document.querySelector(".rule-template");
let password = passwordInput.textContent;

let checkIndex = 1;

passwordInput.addEventListener("keyup", function () {
    checkPassword();
});

function checkPassword() {
    password = passwordInput.value;
    switch (checkIndex) {
        case 1:
            if (checkSamsung()) {
                if (checkRuleExists(1)) {
                    deleteRepeatedRule(checkIndex);
                }

                createRule(checkIndex, "La contraseña debe contener el nombre de la mayor competencia de iPhone.", true);

                checkIndex++;
            } else {
                if (!checkRuleExists(1)) {
                    createRule(checkIndex, "La contraseña debe contener el nombre de la mayor competencia de iPhone.", false);
                }
            }
            break;
        case 2:
            if (checkNAT()) {
                if (checkRuleExists(2)) {
                    deleteRepeatedRule(checkIndex);
                }

                createRule(checkIndex, "La contraseña debe contener las siglas de 'Traducción de direcciones de red'.", true);

                checkIndex++;
            } else {
                if (!checkRuleExists(2)) {
                    createRule(checkIndex, "La contraseña debe contener las siglas de 'Traducción de direcciones de red'.", false);
                }
            }
            break;
        case 3:
            if (check1011()) {
                if (checkRuleExists(3)) {
                    deleteRepeatedRule(checkIndex);
                }

                createRule(checkIndex, "La contraseña debe contener el número '11' en binario.", true);

                checkIndex++;
            } else {
                if (!checkRuleExists(3)) {
                    createRule(checkIndex, "La contraseña debe contener el número '11' en binario.", false);
                }
            }
            break;
        case 4:
            if (checkIV()) {
                if (checkRuleExists(4)) {
                    deleteRepeatedRule(checkIndex);
                }

                createRule(checkIndex, "La contraseña debe contener el número '4' en romano.", true);

                checkIndex++;
            } else {
                if (!checkRuleExists(4)) {
                    createRule(checkIndex, "La contraseña debe contener el número '4' en romano.", false);
                }
            }
            break;
        case 5:
            if (checkDAM()) {
                if (checkRuleExists(5)) {
                    deleteRepeatedRule(checkIndex);
                }

                createRule(checkIndex, "La contraseña debe contener las siglas de 'Desarrollo de aplicaciones multiplataforma'.", true);

                checkIndex++;
            } else {
                if (!checkRuleExists(5)) {
                    createRule(checkIndex, "La contraseña debe contener las siglas de 'Desarrollo de aplicaciones multiplataforma'.", false);
                }
            }
            break;
        case 6:
            if (checkArroba()) {
                if (checkRuleExists(6)) {
                    deleteRepeatedRule(checkIndex);
                }

                createRule(checkIndex, "La contraseña debe contener el símbolo especial usado en correos electrónicos.", true);

                checkIndex++;
            } else {
                if (!checkRuleExists(6)) {
                    createRule(checkIndex, "La contraseña debe contener el símbolo especial usado en correos electrónicos.", false);
                }
            }
            break;
    }
}


function checkSamsung() {
    if (password.substring(0, 7) === "Samsung") {
        return true;
    } else {
        return false;
    }
}

function checkNAT() {
    if (password.substring(7, 10) === "NAT") {
        return true;
    } else {
        return false;
    }
}

function check1011() {
    if (password.substring(10, 14) === "1011") {
        return true;
    } else {
        return false;
    }
}

function checkIV() {
    if (password.substring(14, 16) === "IV") {
        return true;
    } else {
        return false;
    }
}

function checkDAM() {
    if (password.substring(16, 19) === "DAM") {
        return true;
    } else {
        return false;
    }
}

function checkArroba() {
    const specialSymbolsRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return specialSymbolsRegex.test(password);
}

function createRule(number, text, guess) {
    let rule = document.createElement("div");
    let ruleClass = guess ? "rule-correct" : "rule-incorrect";
    rule.classList.add("rule");
    rule.classList.add(ruleClass);
    rule.appendChild(ruleTemplate.content.cloneNode(true));
    rule.children[0].textContent = `Regla ${number}`;
    rule.children[1].textContent = text;
    gameContainer.appendChild(rule);

    setTimeout(function () {
        rule.classList.add("rule-animation");
    }, 100);
    
}

function checkRuleExists(number) {
    let currentRules = document.querySelectorAll(".rule");
    for (rule of currentRules) {
        if (rule.children[0].textContent === `Regla ${number}`) {
            return true;
        }
    }
}

function deleteRepeatedRule(number) {
    let currentRules = document.querySelectorAll(".rule");
    for (let i = 0; i < currentRules.length; i++) {
        console.log(currentRules[i]);
        if (currentRules[i].children[0].textContent === `Regla ${number}` && currentRules[i].classList.contains("rule-incorrect")) {
            currentRules[i].remove();
        }
    }
}