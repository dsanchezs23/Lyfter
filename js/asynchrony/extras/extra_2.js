function loadResources() {
    return new Promise(async (resolve) => {
        const loadImage = (name) => new Promise(resolve => {
            setTimeout(() => {
                document.body.innerHTML += `<p>Image ${name} loaded</p>`;
                resolve();
            }, Math.random() * 2000);
        });

        const loadScript = (name) => new Promise(resolve => {
            setTimeout(() => {
                document.body.innerHTML += `<p>Script ${name} loaded</p>`;
                resolve();
            }, 1000);
        });

        await Promise.all([
            loadImage('header.jpg'),
            loadImage('footer.jpg'),
            loadImage('logo.png')
        ]);

        await loadScript('jquery.js');
        await loadScript('bootstrap.js');
        await loadScript('app.js');

        document.body.innerHTML += `<p>Website fully loaded!</p>`;
        resolve();
    });
}

loadResources();
