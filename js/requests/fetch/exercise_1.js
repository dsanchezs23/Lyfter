async function listObjects() {
    try {
        const response = await fetch('https://api.restful-api.dev/objects');
        const data = await response.json();

        return data
            .filter(item => item.data)
            .map(item => {
                const name = item.name;
                const specs = Object.entries(item.data)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(', ');
                return `${name} (${specs})`;
            });

    } catch (error) {
        console.error('Error fetching objects:', error);
    }
}

(async () => {
    console.log(await listObjects());
})();