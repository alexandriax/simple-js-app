
const API_KEY = window.API_KEY;

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

  function addEventListenerCard(cardLink, pokemon) {
    cardLink.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default anchor behavior
      loadDetails(pokemon).then(function() {
        showDetails(pokemon);
      });
    });
  }

  function addListItem(pokemon) {
    let pokemonRepository = document.querySelector('.pokemon-list');

    let listItem = document.createElement('li');
    listItem.classList.add('col-md-3', 'pokemon-item', 'mb-4');

    let cardLink = document.createElement('a');
    cardLink.href = '#'; // Prevent default navigation

    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imgUrl;
    imageElement.classList.add('card-img-top');
    cardLink.appendChild(imageElement);

    listItem.appendChild(cardLink);
    pokemonRepository.appendChild(listItem);

    addEventListenerCard(cardLink, pokemon);
  }

  function showDetails(item) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalBody.empty();
    modalTitle.empty();

    let nameElement = $("<h1>" + item.name + "</h1>");
    let imageElementSprite = $('<img class="modal-img" style="width:50%">').attr("src", item.imageUrl);
    let heightElement = $("<p>" + "<span class='label'>" + "Height: " + "</span>" + item.height + "</p>");
    let weightElement = $("<p>" + "<span class='label'>" + "Weight: " + "</span>" + item.weight + "</p>");
    let typeElement = $("<p>" + "<span class='label'>" + "Types: " + "</span>" + item.type + "</p>");
    let abilitiesElement = $("<p>" + "<span class='label'>" + "Abilities: " + "</span>" + item.abilities + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElementSprite);
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
    fetch('https://api.pokemontcg.io/v2/cards', {
      headers: {
        'X-Api-Key': API_KEY
      }
    })
      .then(response => response.json())
      .then(data => {
        data.data.forEach(card => {
          let pokemonObject = {
            name: card.name,
            imgUrl: card.images.small,
            detailsUrl: `https://pokeapi.co/api/v2/pokemon/${card.name.toLowerCase()}`
          };
          add(pokemonObject);
          addListItem(pokemonObject);
        });
        hideLoadingMessage();
      })
      .catch(error => {
        hideLoadingMessage();
        console.error('Error getting Pokémon cards:', error);
      });
  };

  const loadDetails = function(pokemon) {
    showLoadingMessage();
    return fetch(pokemon.detailsUrl)
      .then(response => response.json())
      .then(data => {
        pokemon.imageUrl = data.sprites.front_default;
        pokemon.height = data.height;
        pokemon.weight = data.weight;
        pokemon.type = data.types.map(typeObj => typeObj.type.name).join(', ');
        pokemon.abilities = data.abilities.map(abilityObj => abilityObj.ability.name).join(', ');
        hideLoadingMessage();
      })
      .catch(error => {
        hideLoadingMessage();
        console.error(`Error getting details for ${pokemon.name}`, error);
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
