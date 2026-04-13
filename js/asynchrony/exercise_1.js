async function fetchPokemon() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/1');
        const data = await response.json();
        console.log('Pokemon Data:', data);
    } catch (error) {
        console.error('Error fetching pokemon:', error);
    }
}

fetchPokemon();