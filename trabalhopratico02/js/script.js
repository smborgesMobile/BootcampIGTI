let allPeople = [];
let tabPeople = null;
let statistic = null;
let queryTab = null;
let emptyState = null;
let filteredList = [];

window.addEventListener("load", () => {
  tabPeople = document.querySelector("#filteredItens");
  queryTab = document.querySelector("#queryInput");
  emptyState = document.querySelector("#emptyState");
  statistic = document.querySelector("#filteredStatics");

  queryTab.addEventListener("input", () => {
    filteredList = allPeople.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );

    if (event.target.value == "") {
      filteredList = [];
    }

    //Ordena a lista por ordem alfabética.
    allPeople.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    console.log(allPeople);
    render(filteredList);
  });

  fechData();
});

async function fechData() {
  const promisse = await fetch(
    "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
  );
  const json = await promisse.json();

  allPeople = json.results.map((person) => {
    const { name, picture, dob, gender } = person;
    return {
      name: name.first + " " + name.last,
      picture: picture.large,
      dob: dob.age,
      gender: gender,
    };
  });

  auxList = allPeople;
}

function render(filteredList) {
  fillAllList(filteredList);
  fillQueryStatics(filteredList);
}

function fillQueryStatics(filteredList) {
  const maleCount = filteredList.filter((person) => person.gender == "male")
    .length;
  const femaleCount = filteredList.filter((person) => person.gender == "female")
    .length;
  const ageSum = getSumOfAges(filteredList);
  const avarage = getSumOfAges(filteredList) / filteredList.length;

  let statisticsHTML = "<div>";

  //Item da lista
  var internalHTML = `
      <div class="staticsContent">
        <ul>
        <li>${"<b>Sexo Masculino: </b>" + maleCount}</li>
        <li>${"<b>Sexo Feminino: </b>" + femaleCount}</li>
        <li>${"<b>Soma das Idades: </b>" + ageSum}</li>
        <li>${
          "<b>Média das Idades: </b>" +
          (Math.round(avarage * 100) / 100).toFixed(2)
        }</li>
        </ul>
      </div>
    `;

  if (filteredList.length == 0) {
    internalHTML = `
    <div class="staticsContent">
      <h6>Não existem dados há exibir.</h6>
    </div>
    `;
    statisticsHTML += internalHTML;
  } else {
    statisticsHTML += internalHTML;
    statisticsHTML += "</div>";
  }

  console.log("Tamanho: " + filteredList.length);

  statistic.innerHTML = statisticsHTML;
}

function getSumOfAges(filteredList) {
  const sumAges = filteredList.reduce((accumulator, person) => {
    return accumulator + person.dob;
  }, 0);
  return sumAges;
}

function fillAllList(filteredList) {
  let countriesHTML = null;
  countriesHTML = "<div>";

  filteredList.forEach((person) => {
    const { name, picture, dob, gender } = person;

    //Item da lista
    var countryHTML = `
    <!-- this is the markup. you can change the details (your own name, your own avatar etc.) but don’t change the basic structure! -->

    <aside class="profile-card">
      <div class="mask-shadow"></div>
      <header>
    
        <a href="https://tutsplus.com">
          <img src="${person.picture}">
        </a>
    
        <h1>${person.name}</h1>
      </header>
    
      <!-- bit of a bio; who are you? -->
      <div class="profile-bio">
      <ul>
       <li>${"<b>Genero: </b>" + person.gender}</li>
       <li>${"<b>Idade: </b>" + person.dob}</li>
      </ul>
      </div>
    
      <!-- some social links to show off -->
      <ul class="profile-social-links">
    
        <!-- twitter - el clásico  -->
        <li>
          <a href="https://twitter.com/tutsplus">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/social-twitter.svg">
          </a>
        </li>
    
        <!-- envato – use this one to link to your marketplace profile -->
        <li>
          <a href="https://envato.com">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/social-envato.svg">
          </a>
        </li>
    
        <!-- codepen - your codepen profile-->
        <li>
          <a href="https://codepen.io/tutsplus">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/social-codepen.svg">
          </a>
        </li>
    
        <!-- add or remove social profiles as you see fit -->
    
      </ul>
    
    </aside>
    <!-- that’s all folks! -->
    `;

    countriesHTML += countryHTML;
  });

  if (filteredList.length == 0) {
    countryHTML = `
    <div class="peopleContent">
      <h6>Nenhum item encontrado</h6>
    </div>
    `;

    console.log(filteredList.length);
    countriesHTML += countryHTML;
  }

  countriesHTML += "</div>";
  tabPeople.innerHTML = countriesHTML;
}
