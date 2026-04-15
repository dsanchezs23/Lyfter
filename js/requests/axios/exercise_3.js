const axios = require('axios');


async function getObject(objectId) {
    try {
        const response = await axios.get(`https://api.restful-api.dev/objects/${objectId}`);
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            console.error('Object not found');
        } else {
            console.error('Error:', error.message);
        }
        return { error: error.message };
    }
}

(async () => {
    console.log(await getObject('1'));
})();