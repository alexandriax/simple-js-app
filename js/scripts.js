/*
let pokemonList = [
    {
      name: 'Bulbasaur',
      height: 5,
      types: ['grass', 'poison'],
    },

    {
      name: 'Ninetales',
      height: 7,
      types: ['fire'],
    },

    {
      name: "Gengar",
      height: 4,
      types: ['ghost', 'poison'],
    },

    {
      name: 'Ditto',
      height: 1,
      types: ['normal'],
    }
];
*/

/*
for(let i=0; i<pokemonList.length; i++) {
    document.write(pokemonList[i].name    + ' (height: ' + pokemonList[i].height + ') ' + '  ');
    if (pokemonList[i].height <=2) {
        document.write(' That\'s a tiny pokemon! ');
    }else if (pokemonList[i].height >2 && pokemonList[i].height <=5) {
        document.write(' <br>  ');
    }else {
        document.write(' That\'s a huge pokemon! ');
        document.write(' <br>  ')
    }
}
*/


let pokemonList = (function () {
  let pokemonList = [];

  function add(pokemon) {
    if(typeof pokemon === 'object') {
      pokemonList.push(pokemon);
    } else {
      console.error('only add objects!');
    }
    
  }


  function getAll() {
    return pokemonList;
  }

  function addEventListenerButton(button, pokemon) {
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  function addListItem(pokemon){
    let pokemonRepository = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listpokemon.appendChild(button);
    pokemonRepository.appendChild(listpokemon);
    addEventListenerButton(button, pokemon);
  }

  function showDetails(pokemon){ // event listener
    loadDetails(pokemon);

  }

  function LoadList (){
    showLoadingMessage();
    fetch('https://pokeapi.co/api/v2/pokemon/').then(function(response) {
    return response.json();
    }).then(function(data){
      data.results.forEach(function(pokemon, index){
        let pokemonObject = {
          name: pokemon.name,
          detailsUrl: pokemon.url
        };

        let pokemonDetailsUrl = `https://pokeapi.co/api/v2/pokemon/${index + 1}`;
        fetch(pokemonDetailsUrl).then(function(response) {
          return response.json();
        }).then(function(pokemonData){
          if(pokemonData.sprites && pokemonData.sprites.front_default) {
            pokemonObject.imgUrl = pokemonData.sprites.front_default;
          }else {
            console.error('img not found for', pokemon.name);
          }
          
          pokemonObject.height = pokemonData.height; 

          if (index === data.results.length - 1){
            data.results.forEach(function(pokemon){
              let pokemonObject = {
                name: pokemon.name,
                detailsUrl: pokemon.url,
                imgUrl: "",
                height: ""
              };
              add(pokemonObject);
            });

            renderPokemonList();
          }
        }).catch(function(error) {
          hideLoadingMessage();
          console.error('error getting pokemon', error);
    });
  });
  }).catch(function(error){
    hideLoadingMessage();
    console.error('error getting pokemon list', error);
  });
}
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
  };
})();

pokemonList.getAll().forEach(function(pokemon) {
  let keys = Object.keys(pokemon);

  pokemonList.addListItem(pokemon);


  keys.forEach(function(key){
    document.write(key + ': ' + pokemon[key] + ' ');
  });
  //document.write(pokemon.name + ' height: ' + pokemon.height + ' ')
  if (pokemon.height <=2) {
    document.write(' That\'s a tiny pokemon! ');
  }else if (pokemonList.height > 2 && pokemonList.height <= 5) {
    document.write(' <br>  ');
  }else if(pokemon.height > 5) { 
    document.write(' That\'s a huge pokemon! ');
  }  
  document.write(' <br>  ');
});

function filterItems(arr, query) {
  return arr.filter((el) => el.name.toLowerCase().includes(query.toLowerCase()));
}

console.log(filterItems(pokemonList.getAll(), 'bu')); //[bulbasaur]
console.log(filterItems(pokemonList.getAll(), 'ni')); //[ninetales]
console.log(filterItems(pokemonList.getAll(), 'ge')); //[gengar]
console.log(filterItems(pokemonList.getAll(), 'di')); //[ditto]