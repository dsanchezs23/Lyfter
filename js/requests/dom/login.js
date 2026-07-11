
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('userId').value;
    const pass = document.getElementById('password').value;

    const user = await getObject(id);

    if (user && user.data && user.data.password === pass) {
        localStorage.setItem('user_session_id', id);
        window.location.href = 'profile.html';
    } else {
        alert("Login failed: Invalid ID or incorrect password.");
    }
});

// I added the exercise_3.js function here to avoid circular imports and ensure the createObject function is available when the form is submitted.
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

const sessionInfo = {
    id: userId,
    loginTime: Date.now()
};
localStorage.setItem('user_session', JSON.stringify(sessionInfo));
localStorage.setItem('user_session_id', userId)