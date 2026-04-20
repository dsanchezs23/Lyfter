const axios = require('axios');

async function updateObject(objectId, newName) {
    try {
        const response = await axios.put(`https://api.restful-api.dev/objects/${objectId}`, { name: newName });
        return response.data;
    } catch (error) {
        console.error('Error updating object:', error.message);
    }
}

//the id ff8081819d82fab6019d8f5639230e15 is created in exercise_2.js

(async () => {
    console.log(await updateObject('ff8081819d82fab6019d8f5639230e15', 'Google Pixel 7 Pro'));
})();