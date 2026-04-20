const axios = require('axios');

export async function createObject(name, email, password, address) {
    const objectData = {
        name: name,
        data: {
            email: email,
            password: password,
            address: address
        }
    };

    try {
        const response = await axios.post('https://api.restful-api.dev/objects', objectData);
        console.log("Object created (Axios):", response.data);
        return response.data;
    } catch (error) {
        console.error("Axios Error:", error.message);
    }
}

createObject('Apple MacBook Pro 16', 'john@example.com', 'password123', '123 Main Street');

// id created ff8081819d82fab6019d8f5639230e15