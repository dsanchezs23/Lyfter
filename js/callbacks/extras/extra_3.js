const colors = ['#fA380D', '#33FF57', '#3357FF', '#F5FF33', '#FF33F6'];
        const colorNames = {
            '#fA380D': 'Red',
            '#33FF57': 'Green',
            '#3357FF': 'Blue',
            '#F5FF33': 'Yellow',
            '#FF33F6': 'Pink'
        };

function generateRandomColor(callback) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const selectedColor = colors[randomIndex];
    callback(selectedColor);
}

function updateColorDisplay(color) {
    document.getElementById('colorBox').style.backgroundColor = color;
    document.getElementById('colorName').textContent = `Color: ${colorNames[color]}`;
}

document.getElementById('changeColorBtn').addEventListener('click', () => {
    generateRandomColor(updateColorDisplay);
});