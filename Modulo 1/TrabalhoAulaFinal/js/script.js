let globalUsers = [];
let globalCountries = [];
let globalUserCountries = [];
let globalFiltered = [];

async function start() {
  const p1 = promiseUsers();
  const p2 = promiseCountries();

  await Promise.all([p1, p2]);

  configFilter();
  mergeUsersAndCountries();
  hideSpinner();
  render();
}

function promiseUsers() {
  return new Promise(async (resolve, reject) => {
    const users = await fetchUsers();
    resolve(users);
  });
}

function promiseCountries() {
  return new Promise(async (resolve, reject) => {
    const countries = await fetchCountries();
    resolve(countries);
  });
}

async function fetchUsers() {
  const resource = await fetch("http://localhost:3002/users");
  const json = await resource.json();

  globalUsers = json.map(({ name, picture, login, nat }) => {
    return {
      userId: login.uuid,
      userCountry: nat,
      userName: name.first,
      userPicture: picture.large,
    };
  });
}

async function fetchCountries() {
  const resource = await fetch("http://localhost:3001/countries");
  const json = await resource.json();

  globalCountries = json.map(({ name, flag, alpha2Code }) => {
    return {
      countryId: alpha2Code,
      countryName: name,
      countryFlag: flag,
    };
  });
}

function configFilter() {
  const inputFilter = document.querySelector("#inputFilter");
  const buttonFilter = document.querySelector("#buttonFilter");

  buttonFilter.addEventListener("click", () => {
    const filterValue = inputFilter.value.toLowerCase().trim();
    globalFiltered = globalUserCountries.filter((item) => {
      return item.userName.toLowerCase().includes(filterValue);
    }).sort((a, b) => {
        //Compare local
        return a.userName.localeCompare(b.userName);
      });;

    render();
  });
}
function hideSpinner() {
  const spinner = document.querySelector("#spinner");
  spinner.classList.add("hide");
}

function mergeUsersAndCountries() {
  globalUserCountries = [];

  globalUsers.forEach((user) => {
    const country = globalCountries.find(
      (country) => country.countryId == user.userCountry
    );

    // Merge country with  user.
    globalUserCountries.push({
      ...user,
      flag: country.countryFlag,
      countryName: country.countryName,
    });
  });

  //Cria uma cópia.
  globalFiltered = [...globalUserCountries];
}

function render() {
  const divUsers = document.querySelector("#users");

  divUsers.innerHTML = `
        <div class='row'>
            ${globalFiltered
              .map(({ flag, userPicture, userName, countryName }) => {
                return `
                    <div class='col s6 m4 l3'>
                        <div class='flex-row bordered'>
                            <img class='avatar' src='${userPicture}' alt='${userName}' />
                            <div class='flex-column'>
                                <span>${userName}</span>
                                <span><img class='flag' src='${flag}' alt='${countryName}' /></span>
                            </div>
                        </div>
                    </div>
                `;
              })
              .join("")}
        </div>
    `;
}

start();
