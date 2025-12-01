const alfabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ";


const [charMap, charMapReverse] = getCharMap();
function encodeCeasar(inputText, shift = 10) {
    const chars = [];
    for (const char of inputText.toUpperCase()) {
        if (!charMap.get(char)) {
            chars.push(char);
            continue;
        }
        chars.push(jumpChar(char, shift));
    }
    return chars.join("");
}

/* Char x linkes til hvor x ligger i alfabetet
 e.g. a = 1, c = 3, f = 8
*/

function getCharMap() {
    const charMap = new Map();
    const charMapReverse = new Map();

    let i = 0;
    for (const char of alfabet) {
        i++;
        charMap.set(char, i);
        charMapReverse.set(i, char);
    }

    return [charMap, charMapReverse];
}

function jumpChar(char, shift) {
    const currentIndex = charMap.get(char);
    let newIndex = currentIndex + shift;

    if (newIndex > alfabet.length) {
        newIndex = newIndex - alfabet.length;
    }

    return charMapReverse.get(newIndex);
}

document.getElementById("unencrypted-textbox").addEventListener("keypress", e => {
    if (e.key === "Enter" && !e.shiftKey) {
        const newEvent = new Event("submit");
        e.target.form.dispatchEvent(newEvent);
        e.preventDefault()
    }
})

const form = document.getElementById("unencrypted");
const shiftAmountInput = document.getElementById("shiftAmount");

form.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(form);
    const shiftAmount = shiftAmountInput.value;
    console.log(shiftAmount)

    handleUnencryptedData(data.get("message"), Number(shiftAmount));
})


function handleUnencryptedData(unencrypted, shiftAmount) {
    const encrypted = encodeCeasar(unencrypted, shiftAmount);

    document.getElementById("output").textContent = encrypted;
}

function bruteforce(encrypted) {
    const container = document.getElementById("guess-container");
    container.innerHTML = "";

    for (let i = 0; i < alfabet.length; i++) {
        const guess = encodeCeasar(encrypted, i);

        const textarea = document.createElement("textarea");
        textarea.readOnly = true;
        textarea.value = guess.toLowerCase();

        container.append(textarea);

        console.log(guess.toLowerCase());
    }
}

document.getElementById("bruteforce-btn").addEventListener("click", e => {
    bruteforce(document.getElementById("output").value)
})