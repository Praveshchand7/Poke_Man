const pokedex = document.querySelector(".grid");

/*How to fetch the data from API */

const fetchData = () => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=0&offset=200")
    .then((res) => res.json())
    .then((data) => {
      //console.log("fetch result", data);
      //pokeCards(data.results);
      //Fetch another data
      const fetches = data.results.map((p) => {
        return fetch(p.url).then((res) => res.json());
      });
      //   Fetches all the promises
      Promise.all(fetches).then((res) => {
        //console.log(res));
        pokeCards(res);
      });
    });
};

const pokeCards = (data) => {
  console.log("poke card data coming in", data);

  const cards = data
    .map((card) => {
      return `<div class="class">
      <img src="${card.sprites.other.dream_world.front_default}" alt=${card.name}/> <h2>${card.name}</h2></div>`;
      //type from console log and add the copy property path
    })
    .join("");
  pokedex.innerHTML = cards;
};

fetchData();
