window.onload = async () => {
    checkSession();

    const userId = localStorage.getItem('user_session_id');

    if (!userId) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const user = await getObject(userId);

        if (user) {
            renderProfileCard(user);
        } else {
            throw new Error("User not found in API");
        }
    } catch (error) {
        console.error(error);
        alert("Session error or user deleted. Please login again.");
        logoutUser();
    }
};

function renderProfileCard(user) {
    document.getElementById('profileCard').innerHTML = `
        <div class="card">
            <p><strong>User ID:</strong> ${user.id}</p>
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.data.email}</p>
            <p><strong>Address:</strong> ${user.data.address}</p>
            <hr style="border: 0.5px solid #334155; margin: 15px 0;">
            <button id="editBtn">Edit Profile</button>
        </div>
    `;

    document.getElementById('editBtn').onclick = () => enableEdit(user);
}

async function enableEdit(user) {
    const profileCard = document.getElementById('profileCard');

    profileCard.innerHTML = `
        <div class="card">
            <h3>Edit Profile</h3>
            <label>Full Name</label>
            <input type="text" id="editName" value="${user.name}">
            <label>Address</label>
            <input type="text" id="editAddress" value="${user.data.address}">
            <div style="display: flex; gap: 10px; margin-top: 15px;">
                <button id="saveBtn">Save Changes</button>
                <button id="cancelBtn" class="btn-secondary">Cancel</button>
            </div>
        </div>
    `;

    document.getElementById('saveBtn').onclick = async () => {
        const updatedData = {
            name: document.getElementById('editName').value,
            data: {
                ...user.data,
                address: document.getElementById('editAddress').value
            }
        };

        try {
            const response = await axios.put(`https://api.restful-api.dev/objects/${user.id}`, updatedData);
            alert("Success! Profile updated.");
            renderProfileCard(response.data);
        } catch (e) {
            alert("Error updating profile: " + e.message);
        }
    };

    document.getElementById('cancelBtn').onclick = () => renderProfileCard(user);
}

function checkSession() {
    const sessionRaw = localStorage.getItem('user_session');
    if (!sessionRaw) return;

    const session = JSON.parse(sessionRaw);
    const currentTime = Date.now();
    const fiveMinutes = 5 * 60 * 1000;

    if (currentTime - session.loginTime > fiveMinutes) {
        localStorage.removeItem('user_session');
        localStorage.removeItem('user_session_id');
        alert("Session expired, please log in again.");
        window.location.href = 'login.html';
    }
}

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

function logoutUser() {
    localStorage.removeItem('user_session');
    localStorage.removeItem('user_session_id');
    window.location.href = 'login.html';
}

document.getElementById('logoutBtn').addEventListener('click', logoutUser);