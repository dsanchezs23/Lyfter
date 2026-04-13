function fetchSentence() {
    const words = ['very', 'dogs', 'cute', 'are'];
    const delays = [3000, 1000, 2000, 0];

    const promises = words.map((word, index) =>
        new Promise(resolve => setTimeout(() => resolve(word), delays[index]))
    );

    Promise.all(promises)
        .then(results => {
            console.log(`${results[1].charAt(0).toUpperCase() + results[1].slice(1)} ${results[3]} ${results[0]} ${results[2]}`);
        });
}

fetchSentence();