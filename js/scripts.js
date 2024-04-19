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

for(let i=0; i<pokemonList.length; i++) {
    document.write(pokemonList[i].name  + ' (height: ' + pokemonList[i].height + ') ');
}