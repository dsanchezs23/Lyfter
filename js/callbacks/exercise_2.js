const fs = require('fs');
const path = require('path');

const file1 = path.join(__dirname, 'file_1.txt');
const file2 = path.join(__dirname, 'file_2.txt');

function extractWords(text) {
    return (text
        .toLowerCase()
        .match(/[a-z]+/g) || []
    );
}

function findCommonWords(wordsA, wordsB) {
    const setA = new Set(wordsA);
    return [...new Set(wordsB.filter(word => setA.has(word)))].sort();
}

fs.readFile(file1, 'utf8', (err, data1) => {
    if (err) {
        console.error('Error reading file_1.txt:', err.message);
        return;
    }

    fs.readFile(file2, 'utf8', (err, data2) => {
        if (err) {
            console.error('Error reading file_2.txt:', err.message);
            return;
        }

        const words1 = extractWords(data1);
        const words2 = extractWords(data2);
        const commonWords = findCommonWords(words1, words2);

        console.log('Common words in both files:');
        console.log(commonWords.join(', ') || 'No repeated words found.');
    });
});