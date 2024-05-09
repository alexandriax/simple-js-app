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


let pokemonList = (() => {
  let pokemonList = [];

  const add = (pokemon) => {
    if(typeof pokemon === 'object') {
      pokemonList.push(pokemon);
    } else {
      console.error('only add objects!');
    }
    
  };


  const getAll = () => pokemonList; 

  const addEventListenerButton = (button, pokemon) => {
    button.addEventListener('click', () => showDetails(pokemon));
      showDetails(pokemon);
    };

  const addListItem = (pokemon) => {
    let pokemonRepository = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listpokemon.appendChild(button);
    pokemonRepository.appendChild(listpokemon);
    addEventListenerButton(button, pokemon);
  };

  const showDetails = (pokemon) => { // event listener
    loadDetails(pokemon).then((data) => {
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

     showModal('pokemon details')
    })
    .catch((error) => {
      console.error('error loading' + pokemon.name, error);
    });
  };

  //modal start

  (function createModal() {

   let modalContainer = document.querySelector('#modal-container');

   function showModal(title, text) {
      modalContainer.innerHTML = '';
      let modal = document.createElement('div');
      modal.classList.add('modal');

      const modalTemplate = document.getElementById('modal-template');
      const modalContainer = modalTemplate.querySelector('.modal');
      const modalTitle = modalContainer.querySelector('h1');
      const modalBody = modal.querySelector('.modal-body');


      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'close';
      closeButtonElement.addEventListener('click', hideModal);

      let titleElement = document.createElement('h1');
        titleElement.innerText = title;

      let contentElement = document.createElement('p');
        contentElement.innerText = text;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
        
        modalContainer.addEventListener('click', (e) => {
          let target = e.target;
          if (target === modalContainer) {
            hideModal();
          }
        });
  }

  document.querySelector ('#show-modal').addEventListener('click',() => {
    showModal('modal title', 'this is the modal content!');
  });

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');

    if(dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }

  /*function showDialog(title, text) {
    showModal(title, text);
  
    let modal = modalContainer.querySelector('.modal');

    let confirmButton = document.createElement('button');
    confirmButton.classList.add('modal-confirm');
    confirmButton.innerText = 'confirm'
  
    let cancelButton = document.createElement('button');
    cancelButton.classList.add('modal-cancel')
    cancelButton.innerText = 'cancel';
  
    modal.appendChild(confirmButton);
    modal.appendChild(cancelButton);
  
    // allows user to just hit enter
    confirmButton.focus();
    //let modalContainer = document.querySelector('#modal-container');

    return new Promise((resolve, reject) => {
      cancelButton.addEventListener('click', hideModal);

      confirmButton.addEventListener('click', () => {
        dialogPromiseReject = null;
        hideModal();
        resolve();
      });

      dialogPromiseReject = reject;
    });  
  }

  document.querySelector('#show-dialog').addEventListener('click', () => {
    showDialog('confirm action', 'are you sure you want to do this?').then(function() {
      alert('confirmed!');
    }, () => {
      alert('not confirmed');
    });
  });*/

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  }); // removes modal w esc

  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('pokemonList', 'pokemonList.content'); // idk if this is right lol
  });

  return {
    showModal,
    hideModal
  };

})(); 


// modal end
  
    
});

  const hideLoadingMessage = () => {
    document.getElementById('loading-message').style.display = 'none';
  };

  const showLoadingMessage = () => {
    document.getElementById('loading-message').style.display = '';
  };

  const LoadList = () => {
    showLoadingMessage();
    fetch('https://pokeapi.co/api/v2/pokemon/')
    .then((response) => {
    hideLoadingMessage(); 
    return response.json();
    })
    .then((data) => {
      data.results.forEach((pokemon, index) => {
        let pokemonObject = {
          name: pokemon.name,
          detailsUrl: pokemon.url
        };

        let pokemonDetailsUrl = `https://pokeapi.co/api/v2/pokemon/${index + 1}`;
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
            data.results.forEach((pokemon) => {
              let pokemonObject = {
                name: pokemon.name,
                detailsUrl: pokemon.url,
                imgUrl: '',
                height: ''
              };
            });

            
          }
        })
        .catch((error) => {
          hideLoadingMessage();
          console.error('error getting pokemon', error);
    });
    add(pokemonObject);
  });
  renderPokemonList();
  }).catch((error) => {
    hideLoadingMessage();
    console.error('error getting pokemon list', error);
  });
};

  const loadDetails = (pokemon) => {
    showLoadingMessage();
    fetch(pokemon.detailsUrl)
    .then((response) => {
      hideLoadingMessage();
      return response.json();
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
    }).catch((error) => {
      hideLoadingMessage();
      console.error(`error getting details for ${pokemon.name}`, error);
    });
  }

  
  const renderPokemonList = () => {
    getAll().forEach((pokemon) => {
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

pokemonList.LoadList();

pokemonList.getAll().forEach((pokemon) => {
  let keys = Object.keys(pokemon);

  pokemonList.addListItem(pokemon);


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