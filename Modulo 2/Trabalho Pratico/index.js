import { promises as fs } from "fs";

let largeCityFromBrasil = "";
let majorStateFromBrasil = "";

let minCityFromBrasil = "";
let minStateFromBrasil = "";

function start() {
  retrieveStateAndCities();
  //getCitiesFromState();
  getMajorMinCitiesFromBrasil();
}

async function retrieveStateAndCities() {
  const states = JSON.parse(await fs.readFile("json/estados.json"));
  const cities = JSON.parse(await fs.readFile("json/cidades.json"));

  states.forEach((element) => {
    const filteredCities = cities.filter((cities) => {
      return element.ID === cities.Estado;
    });

    const onlyCitiesArray = filteredCities.map((citie) => {
      return citie.Nome;
    });

    const filteredObject = {
      cidades: onlyCitiesArray,
    };

    createFile(element, filteredObject);
  });
}

async function getMajorMinCitiesFromBrasil() {
  const cities = JSON.parse(await fs.readFile("json/cidades.json"));
  const states = JSON.parse(await fs.readFile("json/estados.json"));

  var majorCitie = "";
  var majorCitieID = -1;

  var minorCitieID = -1;
  var minorCitie = "Apenas para verificar qual é a menor cidade do Brasil";

  for (const citie of cities) {
    if (citie.Nome.length > majorCitie.length) {
      majorCitie = citie.Nome;
      majorCitieID = citie.Estado;
    } else if (citie.Nome.length == majorCitie.length) {
      if (citie.Nome < majorCitie) {
        majorCitie = citie.Nome;
        majorCitieID = citie.Estado;
      }
    }

    if (citie.Nome.length < minorCitie.length) {
      minorCitie = citie.Nome;
      minorCitieID = citie.Estado;
    } else if (citie.Nome.length == minorCitie.length) {
      if (citie.Nome < minorCitie) {
        minorCitie = citie.Nome;
        minorCitieID = citie.Estado;
      }
    }
  }

  var majorState = states.filter((state) => {
    return state.ID === majorCitieID
  })

  var minorState = states.filter((state) => {
    return state.ID === minorCitieID
  })

  console.log("Maior cidade é: " + majorCitie + " E está no estado do: " + majorState[0].Nome);
  console.log("Menor cidade é: " + minorCitie + " E está no estado do: " + minorState[0].Nome);
}

async function getCitiesFromState() {
  const states = JSON.parse(await fs.readFile("json/estados.json"));
  let countCitiesArray = [];
  let longNameCitiesArray = [];
  let shortNameCitiesArray = [];
  let majorCityFromBrasilArray = [];
  let minCityFromBrasilArray = [];

  for (const state of states) {
    var returnedCities = JSON.parse(
      await fs.readFile(`json/estados_cidades/${state.Sigla}.json`)
    );

    var largNameCitie = "";
    var shortNameCitie =
      "um teste muito grande apenas para titulo de comparacao entre as strings";

    for (const citie of returnedCities.cidades) {
      if (citie.length > largNameCitie.length) {
        largNameCitie = citie;
        largeCityFromBrasil = citie;
        majorStateFromBrasil = state;
      } else if (citie.length === largNameCitie.length) {
        if (citie < largNameCitie) {
          largNameCitie = citie;
          largeCityFromBrasil = citie;
          majorStateFromBrasil = state;
        }
      }

      if (citie.length < shortNameCitie.length) {
        shortNameCitie = citie;
        minCityFromBrasil = citie;
        minStateFromBrasil = state.Sigla;
      } else if (citie.length === largNameCitie.length) {
        if (citie < largNameCitie) {
          shortNameCitie = citie;
          minStateFromBrasil = citie;
          minStateFromBrasil = state.Sigla;
        }
      }
    }

    var largeNameCities = {
      estado: state.Sigla,
      maior_cidade: largNameCitie,
    };

    var newContable = {
      cidade: state.Sigla,
      municipios: returnedCities.cidades.length,
    };

    var shortCities = {
      cidade: state.Sigla,
      municipios: shortNameCitie,
    };

    longNameCitiesArray.push(largeNameCities);
    countCitiesArray.push(newContable);
    shortNameCitiesArray.push(shortCities);
  }

  majorCityFromBrasilArray.push(
    majorStateFromBrasil.Sigla + " : " + largeCityFromBrasil
  );

  minCityFromBrasilArray.push(
    majorStateFromBrasil.Sigla + " : " + minCityFromBrasil
  );

  countCitiesArray.sort((a, b) => {
    return b.municipios - a.municipios;
  });

  console.log("MENOR CIDADE DO BRASIL:\n");
  console.log(minCityFromBrasilArray);
  console.log("\n");

  console.log("MAIOR CIDADE DO BRASIL:\n");
  console.log(majorCityFromBrasilArray);
  console.log("\n");

  console.log("MENOR CIDADE DE CADA ESTADO:\n");
  console.log(shortNameCitiesArray);
  console.log("\n");

  console.log("MAIOR CIDADE DE CADA ESTADO:\n");
  console.log(longNameCitiesArray);
  console.log("\n");

  console.log(`ESTADOS COM MAIS CIDADES:\n`);
  console.log(countCitiesArray.slice(0, 5));
  console.log("\n");

  console.log(`ESTADOS COM MENOS CIDADES:\n`);
  console.log(
    countCitiesArray.slice(countCitiesArray.length - 5, countCitiesArray.length)
  );
  console.log("\n");
}

function createFile(element, filteredObject) {
  fs.writeFile(
    `json/estados_cidades/${element.Sigla}.json`,
    JSON.stringify(filteredObject)
  );
}

start();
