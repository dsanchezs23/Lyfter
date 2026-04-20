const form = document.getElementById('registerForm');
const modal = document.getElementById('idModal');
const idCode = document.getElementById('newUserId');
const copyBtn = document.getElementById('copyIdBtn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("Form submitted!"); // Debug 1

    const userData = {
        name: document.getElementById('name').value,
        data: {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            address: document.getElementById('address').value
        }
    };

    try {
        const result = await createObject(userData);
        console.log("API Result:", result);
        idCode.innerText = result.id;
        modal.style.display = 'flex';
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(result.id);
            localStorage.setItem('user_session_id', result.id);
            window.location.href = 'profile.html';
        });
    } catch (error) {
        alert(error.message);
        console.error("Error during registration:", error);
    }
});

// I added the exercise_2.js function here to avoid circular imports and ensure the createObject function is available when the form is submitted.
// because to fix it, I would have to remove the "const axios = require('axios');" line from exercise_2.js and add "import axios from 'axios';" instead, 
// but that would break the node environment for the axios exercises. So I just moved the function here and exported it from exercise_2.js for use in the other files.

async function createObject(userData) {

    try {
        const response = await axios.post('https://api.restful-api.dev/objects', userData);
        console.log("Object created (Axios):", response.data);
        return response.data;
    } catch (error) {
        console.error("Axios Error:", error.message);
        throw error;
    }
}

const sessionInfo = {
    id: userId,
    loginTime: Date.now()
};
localStorage.setItem('user_session', JSON.stringify(sessionInfo));
localStorage.setItem('user_session_id', userId)