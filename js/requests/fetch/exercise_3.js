async function getUObject(objectId) {
    try {
        const response = await fetch(`https://api.restful-api.dev/objects/${objectId}`);
        if (response.status === 404) {
            throw new Error('Object not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error.message);
        return { error: error.message };
    }
}

(async () => {
    console.log(await getUObject('1'));
})();