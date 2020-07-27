console.log(people);

//Map example
window.addEventListener("load", () => {
  doMap();
  doFilter();
  doForeach();
  doReduce();
  doFind();
  doSome();
  doEvery();
  doSort();
  doSpread();
  doRest()
  doDestruction();
});

function doMap() {
  const nameEmailArray = people.results.map((person) => {
    return {
      name: person.name,
      email: person.email,
    };
  });
  console.log(nameEmailArray);

  return nameEmailArray;
}

//Imutable method, it does not change the original array.
function doFilter() {
  const olderThan50 = people.results.filter((person) => {
    return person.dob.age > 50;
  });
  console.log(olderThan50);
}

// It occurs on the current array
function doForeach() {
  const mappedPeople = doMap();
  mappedPeople.forEach((person) => {
    person.nameSize =
      person.name.title.length +
      person.name.first.length +
      person.name.last.length;
  });
  console.log(mappedPeople);
}

// Used to accumulate values.
function doReduce() {
  const totalAges = people.results.reduce((accumulator, current) => {
    return accumulator + current.dob.age;
  }, 0);

  console.log(totalAges);
}

// Get the first item located.
function doFind() {
  const peopleFromMinas = people.results.find((person) => {
    return person.location.state === "Highlands and Islands";
  });
  console.log(peopleFromMinas);
}

//Verify if condition is already ok.
function doSome() {
  const found = people.results.some((person) => {
    return person.location.state === "Jacoveto";
  });
  console.log(found);
}

function doEvery() {
  const every = people.results.every((person) => {
    return (person.nat = "BR");
  });
  console.log(every);
}

function doSort() {
  const mappedNames = people.results
    .map((person) => {
      return {
        name: person.name.first,
      };
    })
    .filter((person) => {
      return person.name.startsWith("A");
    })
    .sort((a, b) => {
      return a.name.length - b.name.length;
    });

  console.log(mappedNames);
}

/**
 * Espalhou os dois vetores e juntou em um só
 */
function doSpread() {
  const marriedMan = people.results.filter(
    (person) => person.name.title === "Mr"
  );
  const marriedWoman = people.results.filter(
    (person) => person.name.title === "Ms"
  );

  const marriedPeople = [...marriedWoman, ...marriedMan, { msg: "oi" }];

  console.log(marriedPeople);
}

function doRest() {
  console.log(infiniteSum(1, 2, 2, 3, 4, 5));
}

function infiniteSum(...numbers) {
  return numbers.reduce((accumulator, curr) => accumulator + curr, 0);
}

function doDestruction() {
  const first = people.results[0];

  /// repetitivo



  const {username, password} = first.login;

  console.log(username);
  console.log(password);
}
