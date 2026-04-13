async function fetchUsersSequentially() {
    try {
        const userIds = [2, 3, 4];
        
        for (const id of userIds) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            if (!response.ok) throw new Error(`Failed to fetch pokemon ${id}`);
            const data = await response.json();
            console.log(`Pokemon ${id}:`, data.name); // data.name instead of data to log the pokemon's name instead of the entire data object
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

fetchUsersSequentially();