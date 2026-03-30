const celsiusTemperatures = [0, 10, 20, 30, 40];

const fahrenheitTemperatures = celsiusTemperatures.map(celsius => {
    return (celsius * 9/5) + 32;
});

console.log("Celsius temperatures:");
console.log(celsiusTemperatures);
console.log("\nFahrenheit temperatures:");
console.log(fahrenheitTemperatures);