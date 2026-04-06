function countWords(text) {
    const cleanText = text.toLowerCase().replace(/[.,!?;:—]/g, '');
    
    const words = cleanText.split(/\s+/).filter(word => word.length > 0);
    
    const wordCount = {};
    words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });
    
    return wordCount;
}

const input = "This is a test. This test is simple.";
const result = countWords(input);
console.log("Input text:");
console.log(input);
console.log("\nWord count:");
console.log(result);