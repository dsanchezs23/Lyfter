async function fetchPokemon() {
            const pokemonId = document.getElementById('pokemonInput').value;
            const resultDiv = document.getElementById('result');

            if (!pokemonId) {
                resultDiv.textContent = 'Please enter a pokemon ID';
                resultDiv.className = 'error';
                resultDiv.style.display = 'block';
                return;
            }

            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
                if (!response.ok) throw new Error('Pokemon not found');

                const pokemon = await response.json();
                resultDiv.innerHTML = `
                    <strong>Name:</strong> ${pokemon.name}<br>
                    <strong>Weight:</strong> ${pokemon.weight}<br>
                    <strong>Height:</strong> ${pokemon.height}
                `;
                resultDiv.className = 'success';
                resultDiv.style.display = 'block';
            } catch (error) {
                resultDiv.textContent = `Error: ${error.message}`;
                resultDiv.className = 'error';
                resultDiv.style.display = 'block';
            }
        }