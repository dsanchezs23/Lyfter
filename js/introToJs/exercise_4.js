function stringToWords(str) {
    const words = [];
    let currentWord = '';
    
    for (let char of str) {
        if (char === ' ') {
            if (currentWord.length > 0) {
                words.push(currentWord);
                currentWord = '';
            }
        } else {
            currentWord += char;
        }
    }
    
    if (currentWord.length > 0) {
        words.push(currentWord);
    }
    
    return words;
}

const example = "This is a string!";
console.log("Input string:");
console.log(example);
console.log("\nOutput array of words:");
const result = stringToWords(example);
console.log(result);