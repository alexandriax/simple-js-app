let pokemonList = (function() {
  let pokemonList = [];
  let modalContainer = $('#modal-container');

  function add(pokemon) {
    if (typeof pokemon === 'object') {
      pokemonList.push(pokemon);
    } else {
      console.error('Only add objects!');
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addEventListenerButton(button, pokemon) {
    button.addEventListener('click', function() {
      loadDetails(pokemon).then(function() {
        showDetails(pokemon);
      });
    });
  }

  function addListItem(pokemon) {
    let pokemonRepository = document.querySelector('.pokemon-list');

    let listpokemon = document.createElement('li');
    listpokemon.classList.add('col-md-3', 'pokemon-item', 'mb-4');

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-outline-secondary');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal-container');

    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;
    imageElement.classList.add('card-img-top');

    button.appendChild(imageElement);
    listpokemon.appendChild(button);
    pokemonRepository.appendChild(listpokemon);

    addEventListenerButton(button, pokemon);
  }

  function showDetails(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalBody.empty();
    modalTitle.empty();

    let nameElement = $("<h1>" + pokemon.name + "</h1>");
    let imageElement = $('<img class="modal-img" style="width:50%">').attr("src", pokemon.imageUrl);
    let heightElement = $("<p>" + "<span class='label'>" + "Height: " + "</span>" + pokemon.height + "</p>");
    let weightElement = $("<p>" + "<span class='label'>" + "Weight: " + "</span>" + pokemon.weight + "</p>");
    let typeElement = $("<p>" + "<span class='label'>" + "Types: " + "</span>" + pokemon.types + "</p>");
    let abilitiesElement = $("<p>" + "<span class='label'>" + "Abilities: " + "</span>" + pokemon.abilities + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typeElement);
    modalBody.append(abilitiesElement);

    $('#modal-container').modal('show');
  }

  function hideModal() {
    modalContainer.modal('hide');
  }

  window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalContainer.hasClass('show')) {
      hideModal();
    }
  });

  const hideLoadingMessage = function() {
    document.getElementById('loading-message').style.display = 'none';
  };

  const showLoadingMessage = function() {
    document.getElementById('loading-message').style.display = '';
  };

  const loadList = function() {
    showLoadingMessage();
    fetch('https://api.pokemontcg.io/v2/cards')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        data.data.forEach(function(card) {
          let pokemonObject = {
            name: card.name,
            imageUrl: card.images.small,
            detailsUrl: `https://pokeapi.co/api/v2/pokemon/${card.name.toLowerCase()}`
          };
          add(pokemonObject);
          addListItem(pokemonObject);
        });
      })
      .catch(function(error) {
        hideLoadingMessage();
        console.error('Error getting Pokémon cards:', error);
      })
      .finally(function() {
        hideLoadingMessage();
      });
  };

  const loadDetails = function(pokemon) {
    showLoadingMessage();
    return fetch(pokemon.detailsUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        pokemon.height = data.height;
        pokemon.weight = data.weight;
        pokemon.types = data.types.map(typeObj => typeObj.type.name).join(', ');
        pokemon.abilities = data.abilities.map(abilityObj => abilityObj.ability.name).join(', ');
      })
      .catch(function(error) {
        console.error(`Error getting details for ${pokemon.name}:`, error);
      })
      .finally(function() {
        hideLoadingMessage();
      });
  };

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonList.loadList();

    /* .then(function(data) {
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

        .then(function(data) {
          let promises = data.results.map(function(pokemon) {
            return fetch(pokemon.url).then(function(response) {
              return response.json().then(function(pokemonData) {
                return {
                  name: pokemonData.name,
                  height: pokemonData.height,
                  weight: pokemonData.weight,
                  types: pokemonData.types.map(typeObj => typeObj.type.name),
                  abilities: pokemonData.abilities.map(abilityObj => abilityObj.ability.name)
                };
              });
            });
          });
          return Promise.all(promises);
        })
        .then(function(pokemonDetails) {
          fetch('https://api.pokemontcg.io/v2/cards')
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            pokemonDetails.forEach(function(pokemon) {
              let card = data.data.find(card => card.name.toLowerCase() === pokemon.name.toLowerCase());
              if (card) {
                pokemon.imgURL = card.images.small;
              } else {
                pokemon.imgURL = 'default-image-url';
              }
              add(pokemon);
              addListItem(pokemon);
            });
          });
        })
        .catch(function(error) {
          hideLoadingMessage();
          console.error('error getting pokemon', error);
        })
        .finally(function() {
          hideLoadingMessage();
        });
    
  };
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: showDetails
  };
})();
pokemonList.loadList();

/*
  renderPokemonList();
  }).catch(function(error) {
    hideLoadingMessage();
    console.error('error getting pokemon list', error);
  });
  };

  //modal end
/*
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
*/
