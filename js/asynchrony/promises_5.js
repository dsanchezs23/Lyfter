function fetchPokemonAnyAsync() {
    const urls = [
        'https://pokeapi.co/api/v2/pokemon/1',
        'https://pokeapi.co/api/v2/pokemon/2',
        'https://pokeapi.co/api/v2/pokemon/3'
    ];

    Promise.any(urls.map(url => fetch(url).then(r => r.json())))
        .then(pokemon => console.log('First pokemon:', pokemon.name))
        .catch(error => console.error('Error:', error))
        .finally(() => console.log('Fetch any completed'));
}

fetchPokemonAnyAsync();