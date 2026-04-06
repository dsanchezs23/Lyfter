function removeDuplicates(numbers) {
    return [...new Set(numbers)];
}

const numbersWithDuplicates = [1, 2, 3, 2, 4, 1, 5];
console.log("Original array with duplicates:");
console.log(numbersWithDuplicates);
console.log("\nArray after removing duplicates:");
console.log(removeDuplicates(numbersWithDuplicates));