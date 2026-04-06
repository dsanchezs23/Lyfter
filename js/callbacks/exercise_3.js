const colors = ['red', 'blue', 'green', 'yellow', 'cyan', 'pink'];
        const button = document.getElementById('changeColorButton');
        const paragraph = document.getElementById('text');

        button.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * colors.length);
            paragraph.style.backgroundColor = colors[randomIndex];
        });