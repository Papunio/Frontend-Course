/**
 * Wczytuje i wyświetla 151 pierwszych pokemonów z API
 * @returns {Promise<void>}
 */
async function loadPokemons() {
    const list = document.querySelector(".pokemons");
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151").then(
        (async function (response) {
                if (!response.ok) {
                    getConnectionError();
                    return;
                }
                const fetchedPokemons = await response.json();
                fetchedPokemons.results.map((pokemon, i) => {
                    const button = document.createElement("button");
                    list.appendChild(button);
                    button.outerHTML = `<button aria-label="${pokemon.name.toUpperCase()}" class="pokemons__item" id="${i + 1}"> ${pokemon.name.toUpperCase()}</button>`;
                })
            }
        )
    ).catch((err) => {
        getConnectionError();
    });
}

/**
 * Wczytuje i pokazuje szczegółowe informacje na temat danego pokemona
 * @param e{MouseEvent}
 * @returns {Promise<void>}
 */
async function loadPokemonInfo(e) {
    if (e.target.className !== "pokemons__item") {
        return;
    }
    e.preventDefault();
    Promise.all([fetch(`https://pokeapi.co/api/v2/pokemon/${e.target.id}/`),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${e.target.id}/`)])
        .then(async function ([pokemonResponse, speciesResponse]) {
            if (!pokemonResponse.ok || !speciesResponse.ok) {
                getConnectionError();
                return;
            }
            const item = document.querySelector(".detailedview__pokemon");
            const alert = document.querySelector(".alert");
            const list = document.querySelector(".detailedview");
            const div = document.createElement("div");
            if (alert) {
                alert.remove();
            }
            const pokemonResult = await pokemonResponse.json();
            const speciesResult = await speciesResponse.json();
            item ? list.replaceChild(div, item) : list.appendChild(div);
            div.outerHTML = `
                    <div class="detailedview__pokemon">
                        <div class="pokemon__name">${pokemonResult.name.toUpperCase()}</div>
                        <div class="pokemon__sprite">
                            <img src="${pokemonResult.sprites.front_default}" alt="${pokemonResult.name} sprite">
                        </div>
                        <div class="pokemon__type">${pokemonResult.types[0].type.name}</div>
                        <div class="pokemon__flavor">${speciesResult.flavor_text_entries[0].flavor_text}</div>
                    </div>`
        })
        .catch((err) => {
            getConnectionError();
        });

}


/**
 * Przy problemach z API wyświetla napis o problemach z połączeniem
 */
function getConnectionError() {
    if (document.querySelector(".alert")) {
        return;
    }
    const list = document.querySelector(".detailedview");
    const div = document.createElement("div");
    const item = document.querySelector(".detailedview__pokemon");
    item ? list.replaceChild(div, item) : list.appendChild(div);
    div.outerHTML = `
                <div class="alert">Connection error</div>
                `
}

loadPokemons().then();
document.addEventListener("click", (e) => loadPokemonInfo(e));

