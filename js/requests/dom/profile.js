window.onload = async () => {
    const userId = localStorage.getItem('user_session_id');

    if (!userId) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const user = await getObject(userId);

        if (user) {
            // 2. Display the data in a card
            document.getElementById('profileCard').innerHTML = `
                <div class="card">
                    <p><strong>User ID:</strong> ${user.id}</p>
                    <p><strong>Name:</strong> ${user.name}</p>
                    <p><strong>Email:</strong> ${user.data.email}</p>
                    <p><strong>Address:</strong> ${user.data.address}</p>
                </div>
            `;
        } else {
            throw new Error("User not found in API");
        }
    } catch (error) {
        console.error(error);
        alert("Session error. Please login again.");
        logoutUser();
    }
};

function logoutUser() {
    localStorage.removeItem('user_session_id');
    window.location.href = 'login.html'; // Goes to login, NOT profile
}

document.getElementById('logoutBtn').addEventListener('click', logoutUser);


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