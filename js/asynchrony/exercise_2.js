async function fetchPokemonWithError() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/5000');
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }
        const data = await response.json();
        console.log('Pokemon Data:', data.data);
    } catch (error) {
        console.error('Error: Pokemon not found');
    }
}

fetchPokemonWithError();