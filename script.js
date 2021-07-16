// Empty array
let types = [];

// Grabbing classes and creating vars
let pokemonName = document.querySelector('.pokemon-name');
let pokemonNumber = document.querySelector('.pokemon-number');
let pokemonImage = document.querySelector('.pokemon-image');

let pokemonListItems = document.querySelectorAll('.pokemon-list-item');
let previousButton = document.querySelector('.previous-button');
let nextButton = document.querySelector('.next-button');

// Functions
// Upper case letters
let upperLetter = (str) => str.toUpperCase();

let showData = () => {
  for (let type of types) {
  }
};

let fetchPokeList = url => {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      let { results} = data;     

      for (let i = 0; i < pokemonListItems.length; i++) {
        let pokeListItem = pokemonListItems[i];
        let resultData = results[i];

        if (resultData) {
          let { name, url } = resultData;
          let urlArray = url.split('/');
          let id = urlArray[urlArray.length - 2];
          pokeListItem.innerText =`${id}.${upperLetter(name)}`;
        } else {
          pokeListItem.innerText = 0;
        }
      }
    });
};

// Fetch request formula

// fetch('http://example.com/movies.json')
//   .then(response => response.json())
//   .then(data => console.log(data));

let fetchPokeData = apiId => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${apiId}`)
    .then(res => res.json())
    .then(data => {
      showData();
  
      pokemonName.innerText = upperLetter(data['name']);
      pokemonNumber.innerText = `${'#' + data['id'].toString().padStart(3, '0')}`
      pokemonImage.src = data['sprites']['front_default'] || '';
    });
};

() => {
  fetchPokeList();
};

// window.onclick = e => {
//   console.dir(e.target);  
//   console.log(e.target);  
// }  

let handleListItemClick = (e) => {
  if (!e.target) return;

  let listItem = e.target;
  if (!listItem.innerText) return;

  let id = listItem.innerText.split('.')[0];
  fetchPokeData(id);
};

// API link
fetchPokeList('https://pokeapi.co/api/v2/pokemon/?limit=151');

for (let pokemonListItem of pokemonListItems) {
  pokemonListItem.addEventListener('click', handleListItemClick);
}