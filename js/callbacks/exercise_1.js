function checkNumber(number, onEven, onOdd) {
    if (number % 2 === 0) {
        onEven();
    } else {
        onOdd();
    }
}

const showEven = () => console.log("The number is even!");
const showOdd = () => console.log("The number is odd!");

checkNumber(2, showEven, showOdd);
checkNumber(3, showEven, showOdd);