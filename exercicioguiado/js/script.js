let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let favoriteCounties = [];

let countCountries = 0;
let countFavorties = 0;

let totalPopulation = 0;
let totalPopulationFavorite = 0;

let numberFormat = null;

window.addEventListener("load", () => {
  tabCountries = document.querySelector("#tabCountries");
  tabFavorites = document.querySelector("#tabFavorites");
  countConties = document.querySelector("#countCountries");
  countFavorites = document.querySelector("#countFavorites");

  totalPopulationList = document.querySelector("#totalPopulationList");
  totalPopulationListFavorite = document.querySelector(
    "#totalPopulationListFavorite"
  );

  numberFormat = Intl.NumberFormat("pt-BR");
  fetchCounties();
});

async function fetchCounties() {
  const promisse = await fetch(" https://restcountries.eu/rest/v2/all");
  const json = await promisse.json();
  //Retornando apenas os items que eu quero do vetor.
  allCountries = json.map((country) => {
    const { numericCode, translations, population, flag } = country;
    return {
      id: numericCode,
      name: translations.pt,
      population: population,
      formattedPopulation: formatNumber(population),
      flag: flag,
    };
  });

  render();
}

function render() {
  renderCountryList();
  renderFavories();
  renderSummary();
  handleButtons();
}

function renderCountryList() {
  let countriesHTML = "<div>";

  allCountries.forEach((country) => {
    const { name, flag, id, population, formattedPopulation} = country;

    //Item da lista
    const countryHTML = `
      <div class="country">
        <div>
          <a id=${id} class="waves-effect waves-light btn">+</a>
        </div>
        <div>
          <img src="${flag}" alt="${name}">
        </div>
        <div>
         <ul>
         <li>${name}</li>
         <li>${formattedPopulation}</li>
         </ul>
        </div>
      </div>
    `;

    countriesHTML += countryHTML;
  });

  countriesHTML += "</div>";

  tabCountries.innerHTML = countriesHTML;
}

function renderFavories() {
  let favirotesHTML = "<div>";

  favoriteCounties.forEach((country) => {
    const { name, flag, id, population, formattedPopulation} = country;

    //Item da lista
    const favoriteCountryHTML = `
      <div class="country">
        <div>
          <a id=${id} class="waves-effect waves-light btn red darken4">+</a>
        </div>
        <div>
          <img src="${flag}" alt="${name}">
        </div>
        <div>
         <ul>
         <li>${name}</li>
         <li>${formattedPopulation}</li>
         </ul>
        </div>
      </div>
    `;

    favirotesHTML += favoriteCountryHTML;
  });

  favirotesHTML += "</div>";
  tabFavorites.innerHTML = favirotesHTML;
}

function renderSummary() {
  countConties.textContent = allCountries.length;
  countFavorites.textContent = favoriteCounties.length;

  const totalPopulation = allCountries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);

  const totalFavorite = favoriteCounties.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);

  totalPopulationList.textContent = formatNumber(totalPopulation);
  totalPopulationListFavorite.textContent = formatNumber(totalFavorite);
}

function handleButtons() {
  const countryButtons = Array.from(tabCountries.querySelectorAll(".btn"));
  const favoriteButtons = Array.from(tabFavorites.querySelectorAll(".btn"));

  countryButtons.forEach((button) => {
    button.addEventListener("click", () => addToFavorites(button.id));
  });

  favoriteButtons.forEach((button) => {
    button.addEventListener("click", () => removeFromFavorites(button.id));
  });
}

function addToFavorites(id) {
  const countryToAdd = allCountries.find((button) => button.id === id);

  // espalha o existem e reatribui um novo elemento.
  favoriteCounties = [...favoriteCounties, countryToAdd];

  //Ordena a lista por ordem alfabética.
  favoriteCounties.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  allCountries = allCountries.filter((country) => country.id !== id);

  render();
}

function removeFromFavorites(id) {
  const countryToRemove = favoriteCounties.find((button) => button.id === id);

  // espalha o existem e reatribui um novo elemento.
  allCountries = [...allCountries, countryToRemove];

  //Ordena a lista por ordem alfabética.
  allCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  favoriteCounties = favoriteCounties.filter((country) => country.id !== id);

  render();
}

function formatNumber(number) {
  return numberFormat.format(number);
}
