
let pokemonList = (function() {
  let pokemonList = [];

  // allow modal access in multiple places
  let modalContainer = document.querySelector('#modal-container');

  function add(pokemon) {
    if(typeof pokemon === 'object') {
      pokemonList.push(pokemon);
    } else {
      console.error('only add objects!');
    }
  };

  function getAll() {
    return pokemonList; 
  }

  function addEventListenerButton(button, pokemon) {
    button.addEventListener('click', function() { 
      showDetails(pokemon);
    });
  };

  function addListItem(pokemon) {
    let pokemonRepository = document.querySelector('.pokemon-list');

    let listpokemon = document.createElement('li');

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');

    listpokemon.appendChild(button)

    pokemonRepository.appendChild(listpokemon);
    addEventListenerButton(button, pokemon);
  };

  function showDetails(pokemon)  { // event listener
      //modal elements
     const modalTitle = document.createElement('h1');
     modalTitle.textContext = pokemon.name;

     const heightParagraph = document.createElement('p');
     heightParagraph.textContent = 'Height: ' + pokemon.height;

     const typeParagraph = document.createElement('p');
     typeParagraph.textContent = 'type: ' + pokemon.type;

     const imageElement = document.createElement('img');
     imageElement.src = pokemon.imgUrl;
     imageElement.alt = pokemon.name;

     const modalContent = document.getElementById('modal-content');
     modalContent.innerHTML ='';

     modalContent.appendChild(modalTitle);
     modalContent.appendChild(heightParagraph);
     modalContent.appendChild(typeParagraph);
     modalContent.appendChild(imageElement);


      let contentElement = document.createElement('p');
        contentElement.innerText = text;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);
     modalContainer.addEventListener('click', function(e) {
      let Target = e.target;
      if(Target === modalContainer) {
        hideModal();
      }

  //modal start

 

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  }); // removes modal w esc


  const hideLoadingMessage = function() {
    document.getElementById('loading-message').style.display = 'none';
  };

  const showLoadingMessage = function() {
    document.getElementById('loading-message').style.display = '';
  };

  const LoadList = function() {
    showLoadingMessage();
    fetch('https://pokeapi.co/api/v2/pokemon/')
    .then(function(response) {
    hideLoadingMessage(); 
    return response.json();
    })
    .then(function(data) {
      data.results.forEach(function(pokemon, index) {
        let pokemonObject = {
          name: pokemon.name,
          detailsUrl: pokemon.url
        };

        let pokemonDetailsUrl = `https://pokeapi.co/api/v2/pokemon/${index + 1}`;
        fetch(pokemonDetailsUrl)
        .then(function(response) {
          hideLoadingMessage();
          return response.json();
        })
        .then(function(pokemonData) {
          if(pokemonData.sprites && pokemonData.sprites.front_default) {
            pokemonObject.imgUrl = pokemonData.sprites.front_default;
          }else {
            console.error('img not found for', pokemon.name);
          }
        })
        .catch(function(error) {
          hideLoadingMessage();
          console.error('error getting pokemon', error);
    });
    add(pokemonObject);
  });

  renderPokemonList();
  }).catch(function(error) {
    hideLoadingMessage();
    console.error('error getting pokemon list', error);
  });
  };

  const loadDetails = function(pokemon) {
    showLoadingMessage();
    fetch(pokemon.detailsUrl)
    .then(function(response) {
      hideLoadingMessage();
      return response.json();
      })
      .then(function(data) {
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
      hideLoadingMessage();
      console.error(`error getting details for ${pokemon.name}`, error);
    });
  };

  
  const renderPokemonList = function() {
    getAll().forEach(function(pokemon) {
      addListItem(pokemon);
    });
  };


  return{
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    LoadList: LoadList,
    loadDetails: loadDetails
  };
})();


function filterItems(arr, query) {
  return arr.filter(function(el) {
   return el.name.toLowerCase().includes(query.toLowerCase());
  });
};


console.log(filterItems(pokemonList.getAll(), 'bu')); //[bulbasaur]
console.log(filterItems(pokemonList.getAll(), 'ni')); //[ninetales]
console.log(filterItems(pokemonList.getAll(), 'ge')); //[gengar]
console.log(filterItems(pokemonList.getAll(), 'di')); //[ditto]