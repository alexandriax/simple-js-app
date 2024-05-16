
let pokemonList = (function() {
  let pokemonList = [];
  
  // allow modal access in multiple places
let modalContainer = $('#modal-container');

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
      loadDetails(pokemon).then(function(){
        showDetails(pokemon);

      });
    });
  };

  function addListItem(pokemon) {
    let pokemonRepository = document.querySelector('.pokemon-list');

    let listpokemon = document.createElement('li');
    listpokemon.classList.add('col-md-3', 'pokemon-item', 'mb-4')
    
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-outline-secondary');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal-container');

    listpokemon.appendChild(button);

    pokemonRepository.appendChild(listpokemon);
    addEventListenerButton(button, pokemon);
  };
  
    // show modal content
    function showDetails(item) {
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');
      
  
      modalBody.empty();
      modalTitle.empty();
  
  
      // create element name
      let nameElement = $("<h1>" + item.name + "</h1>");
      // create element image
      let imageElementFront = $('<img class="modal-img" style="width:50%">').attr("src", item.imgUrlFront);
      imageElementFront.attr("src", item.imgUrlFront);
      // create element height
      let heightElement = $("<p>" + "<span class='label'>" + "height : " + "</span>" + item.height + "</p>");
      // create element weight
      let weightElement = $("<p>" + "<span class='label'>" + "weight : " + "</span>" + item.weight + "</p>");
      // create element types,
      let typeElement = $("<p>" + "<span class='label'>" + "types : " + "</span>" + item.type + "</p>");
      let abilitiesElement = $("<p>" + "<span class='label'>" + "abilities: " + "</span>" + item.abilities + "</p>");
      
      modalTitle.append(nameElement);
      modalBody.append(imageElementFront);
      modalBody.append(heightElement);
      modalBody.append(weightElement);
      modalBody.append(typeElement);
      modalBody.append(abilitiesElement);
  
      $('#modal-container').modal('show');
    }

  //modal start
 
  function hideModal() {
    modalContainer.modal('hide');
  }

  window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalContainer.hasClass('show')) {
      hideModal();
    }
  }); // removes modal w esc

  const hideLoadingMessage = function() {
    document.getElementById('loading-message').style.display = 'none';
  };

  const showLoadingMessage = function() {
    document.getElementById('loading-message').style.display = '';
  };

  const loadList = function() {
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

          pokemonObject.height = pokemonData.height;
          pokemonObject.type = pokemonData.types;
          pokemonObject.abilities = pokemonData.abilities;
          add(pokemonObject);
          addListItem(pokemonObject);
        })
        .catch(function(error) {
          hideLoadingMessage();
          console.error('error getting pokemon', error);
    });
    
  });

  renderPokemonList();
  }).catch(function(error) {
    hideLoadingMessage();
    console.error('error getting pokemon list', error);
  });
  };

  //modal end

  const loadDetails = function(pokemon) {
    showLoadingMessage();
    return fetch(pokemon.detailsUrl)
    .then(function(response) {
      hideLoadingMessage();
      return response.json();
      })
      .then(function(data) {
        pokemon.imgUrlFront = data.sprites.front_default;
        pokemon.height = data.height;
        pokemon.weight = data.weight;
        pokemon.type = data.types.map(typeObj => typeObj.type.name).join(', ');
        pokemon.abilities = data.abilities.map(abilityObj => abilityObj.ability.name).join(', ');

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
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonList.loadList();

