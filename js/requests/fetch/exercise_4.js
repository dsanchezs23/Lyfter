async function updateObjectAddress(objectId, newName) {
    try {
        const response = await fetch(`https://api.restful-api.dev/objects/${objectId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating object:', error);
    }
}

// the id 'ff8081819d82fab6019d8564e80d023c' is from the previous exercise 2 where we created a user. Make sure to replace it with the actual ID you get when you create a new object.

(async () => {
    console.log(await updateObjectAddress('ff8081819d82fab6019d8564e80d023c', 'Google Pixel 7 Pro'));
})();