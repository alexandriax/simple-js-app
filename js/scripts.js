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
let pokemonList = (() => {
  let pokemonList = [];

  function add(pokemon) {
  const add = (pokemon) => {
    if(typeof pokemon === 'object') {
      pokemonList.push(pokemon);
    } else {
      console.error('only add objects!');
    }
    
  }
  };


  function getAll() {
    return pokemonList;
  }
  const getAll = () => pokemonList; 

  function addEventListenerButton(button, pokemon) {
    button.addEventListener('click', function() {
  const addEventListenerButton = (button, pokemon) => {
    button.addEventListener('click', () => showDetails(pokemon));
      showDetails(pokemon);
    });
  }
    };

  function addListItem(pokemon){
  const addListItem = (pokemon) => {
    let pokemonRepository = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listpokemon.appendChild(button);
    pokemonRepository.appendChild(listpokemon);
    addEventListenerButton(button, pokemon);
  }
  };

  function showDetails(pokemon){ // event listener
  const showDetails = (pokemon) => { // event listener
    loadDetails(pokemon);
  };

  }

  function hideLoadingMessage() {
    document.getElementById('loading-message').style.display = 'hidden';
  }
  const hideLoadingMessage = () => {
    document.getElementById('loading-message').style.display = 'none';
  };

  function showLoadingMessage(){
  const showLoadingMessage = () => {
    document.getElementById('loading-message').style.display = '';
  }
  };

  function LoadList (){
  const LoadList = () => {
    showLoadingMessage();
    fetch('https://pokeapi.co/api/v2/pokemon/').then(function(response) {
    fetch('https://pokeapi.co/api/v2/pokemon/')
    .then((response) => {
    hideLoadingMessage(); 
    return response.json();
    }).then(function(data){
      data.results.forEach(function(pokemon, index){
    })
    .then((data) => {
      data.results.forEach((pokemon, index) => {
        let pokemonObject = {
          name: pokemon.name,
          detailsUrl: pokemon.url
        };

        let pokemonDetailsUrl = `https://pokeapi.co/api/v2/pokemon/${index + 1}`;
        fetch(pokemonDetailsUrl).then(function(response) {
          return response.json();
        }).then(function(pokemonData){
        fetch(pokemonDetailsUrl)
        .then((response) => response.json())
        .then((pokemonData) => {
          if(pokemonData.sprites && pokemonData.sprites.front_default) {
            pokemonObject.imgUrl = pokemonData.sprites.front_default;
          }else {
            console.error('img not found for', pokemon.name);
          }
          
          pokemonObject.height = pokemonData.height; 

          if (index === data.results.length - 1){
            data.results.forEach(function(pokemon){
            data.results.forEach((pokemon) => {
              let pokemonObject = {
                name: pokemon.name,
                detailsUrl: pokemon.url,
                imgUrl: "",
                height: ""
                imgUrl: '',
                height: ''
              };
              add(pokemonObject);
            });

            renderPokemonList();
            
          }
        }).catch(function(error) {
        })
        .catch((error) => {
          hideLoadingMessage();
          console.error('error getting pokemon', error);
    });
  });
  }).catch(function(error){
  }).catch((error) => {
    hideLoadingMessage();
    console.error('error getting pokemon list', error);
  });
}
};

  function loadDetails(pokemon) {
  const loadDetails = (pokemon) => {
    showLoadingMessage();
    fetch(pokemon.detailsUrl).then(function(response){
    fetch(pokemon.detailsUrl)
    .then((response) => {
      hideLoadingMessage();
      return response.json();
    }).then(function(data){
      })
      .then((data) => {
      if (data.height !== undefined) {
        pokemon.height = data.height;
      }else {
        console.error('height is missing for', pokemon.name);
      }

      if (data.weight !== undefined) {
        pokemon.weight = data.weight;
      }else {
        console.error('weight is missing for', pokemon.name);
      }

      if (data.types !== undefined) {
        pokemon.types = data.types;
      }else {
        console.error('type is missing for', pokemon.name);
      }

      console.log('loaded details for', pokemon.name, ':', pokemon);
    }).catch(function(error) {
    }).catch((error) => {
      hideLoadingMessage();
      console.error(`error getting details for ${pokemon.name}`, error);
    });
  }

  function renderPokemonList(){
    getAll().forEach(function(pokemon) {

  const renderPokemonList = () => {
    getAll().forEach((pokemon) => {
      addListItem(pokemon);
    });
  }
  };

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    LoadList: LoadList,
    loadDetails: loadDetails
  };
})();

pokemonList.LoadList();

pokemonList.getAll().forEach(function(pokemon) {
pokemonList.getAll().forEach((pokemon) => {
  let keys = Object.keys(pokemon);

  pokemonList.addListItem(pokemon);


  keys.forEach(function(key){
  keys.forEach((key) => {
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