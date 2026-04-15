async function createUser(name, email, password, address) {
    const url = 'https://api.restful-api.dev/objects';

    const userData = {
        name: name,
        data: {
            email: email,
            password: password,
            address: address
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        console.log("User created (Fetch):", result);
        return result.id; // Crucial: Save this ID!
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

createUser('Apple MacBook Pro 16', 'john@example.com', 'password123', '123 Main Street');