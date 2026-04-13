function wait(seconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`${seconds} second(s) have passed`);
            resolve();
        }, seconds * 1000);
    });
}

async function executeTimers() {
    await wait(2);
    await wait(3);
    await wait(1);
}

executeTimers();