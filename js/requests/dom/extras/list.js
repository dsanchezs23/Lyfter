let allObjects = [];
let currentPage = 1;
const itemsPerPage = 5;

const listContainer = document.getElementById('listContainer');
const pageInfo = document.getElementById('pageInfo');

async function fetchData() {
    try {
        const data = await listObjects();

        if (Array.isArray(data)) {
            allObjects = data;
        } else {
            allObjects = [];
        }

        renderPage();
    } catch (error) {
        console.error("Error fetching data:", error);
        listContainer.innerHTML = "<p style='color:red'>Error loading data.</p>";
    }
}

function renderPage() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const paginatedItems = allObjects.slice(start, end);

    if (paginatedItems.length === 0) {
        listContainer.innerHTML = "<p>No items to display.</p>";
        return;
    }

    listContainer.innerHTML = paginatedItems.map(item => `
        <div class="card">
            <p><strong>Name:</strong> ${item.name}</p>
            <p><small>ID: ${item.id}</small></p>
        </div>
    `).join('');

    const totalPages = Math.ceil(allObjects.length / itemsPerPage) || 1;
    pageInfo.innerText = `Page ${currentPage} of ${totalPages}`;

    document.getElementById('prevBtn').disabled = (currentPage === 1);
    document.getElementById('nextBtn').disabled = (end >= allObjects.length);
}

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderPage();
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    const end = currentPage * itemsPerPage;
    if (end < allObjects.length) {
        currentPage++;
        renderPage();
    }
});

async function listObjects() {
    try {
        const response = await axios.get('https://api.restful-api.dev/objects');
        return response.data;
    } catch (error) {
        console.error('Error fetching objects:', error.message);
        return [];
    }
}

fetchData();