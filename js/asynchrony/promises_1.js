function fetchPokemonAll() {
    const urls = [
        'https://pokeapi.co/api/v2/pokemon/1',
        'https://pokeapi.co/api/v2/pokemon/2',
        'https://pokeapi.co/api/v2/pokemon/3'
    ];

    Promise.all(urls.map(url => fetch(url).then(r => r.json())))
        .then(data => {
            data.forEach(pokemon => console.log(pokemon.name));
        })
        .catch(error => console.error('Error:', error));
}

fetchPokemonAll();