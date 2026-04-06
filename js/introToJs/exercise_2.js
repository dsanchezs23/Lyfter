const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = [];

for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
        evenNumbers.push(numbers[i]);
    }
}

console.log("Even numbers using for loop:");
console.log(evenNumbers);

const evenNumbersFiltered = numbers.filter(num => num % 2 === 0);
console.log("\nEven numbers using filter method:");
console.log(evenNumbersFiltered);