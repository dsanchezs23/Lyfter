const axios = require('axios');

async function listObjects() {
    try {
        const response = await axios.get('https://api.restful-api.dev/objects');
        return response.data
            .filter(item => item.data)
            .map(item => {
                const name = item.name;
                const specs = Object.entries(item.data)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(', ');
                return `${name} (${specs})`;
            });
    } catch (error) {
        console.error('Error fetching objects:', error.message);
    }
}

(async () => {
    console.log(await listObjects());
})();