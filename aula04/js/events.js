window.addEventListener("load", start);

function start() {
  console.log("Aula 04");
  console.log("Pagina totalmente carregada");
  var nameInput = document.querySelector("#nameInput");

  nameInput.addEventListener("keyup", onKeyUp);
}

function onKeyUp(event) {
  var count = 1;

  console.log(event);
  var span = document.querySelector("#name_lenght");
  span.textContent = event.target.value.length;
}
