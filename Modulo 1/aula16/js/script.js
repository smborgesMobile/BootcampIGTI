window.addEventListener("load", () => {
  doFetch();
  doFetchAsync();
});

function doFetch() {
  const smborges = fetch("https://api.github.com/users/smborgesMobile").then(
    (res) => {
      res.json().then((data) => {
        showData(data);
      });
    }
  );
}

//prefix async must be used.
async function doFetchAsync() {
  //Retrieved res
  const res = await fetch("https://api.github.com/users/smborgesMobile");
  const json = await res.json();

  console.log(json);
}

function showData(data) {
  const user = document.querySelector("#user");
  user.textContent = data.login + " " + data.name;
}
