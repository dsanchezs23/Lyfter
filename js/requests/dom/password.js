document.getElementById('passwordForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const idInput = document.getElementById('userId').value;
    const oldPass = document.getElementById('oldPass').value;
    const newPass = document.getElementById('newPass').value;
    const confirmPass = document.getElementById('confirmPass').value;

    try {
        const user = await getObject(idInput);
        if (!user) {
            return alert("Error: That User ID does not exist.");
        }

        if (user.data.password !== oldPass) {
            return alert("Error: The current password you entered is incorrect.");
        }

        if (newPass !== confirmPass) {
            return alert("Error: The new passwords do not match.");
        }

        const updatedData = {
            name: user.name, // API requires the name field usually
            data: {
                ...user.data,
                password: newPass
            }
        };

        await updateObject(idInput, updatedData);
        alert("Success! Password updated.");

        localStorage.setItem('user_session_id', idInput);
        window.location.href = 'profile.html';

    } catch (error) {
        alert("Update failed: " + error.message);
    }
});



// I added the exercise_3.js and exercise_4.js functions here to avoid circular imports and ensure the createObject and updateObject functions are available when the form is submitted.
// because to fix it, I would have to remove the "const axios = require('axios');" line from exercise_2.js and add "import axios from 'axios';" instead, 
// but that would break the node environment for the axios exercises. So I just moved the function here and exported it from exercise_2.js for use in the other files.
async function getObject(id) {
    try {
        const response = await axios.get(`https://api.restful-api.dev/objects/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching object:", error);
        return null;
    }
}

async function updateObject(objectId, updatedData) {
    try {
        const response = await axios.put(`https://api.restful-api.dev/objects/${objectId}`, updatedData);
        console.log("Update Response:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating object:', error.message);
        throw error;
    }
}

function checkSession() {
    const sessionRaw = localStorage.getItem('user_session');
    if (!sessionRaw) {
        window.location.href = 'login.html';
        return;
    }

    const session = JSON.parse(sessionRaw);
    const currentTime = Date.now();
    const fiveMinutes = 5 * 60 * 1000;

    if (currentTime - session.loginTime > fiveMinutes) {
        localStorage.removeItem('user_session');
        alert("Session expired, please log in again.");
        window.location.href = 'login.html';
    }
}

checkSession();