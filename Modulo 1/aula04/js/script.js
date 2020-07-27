console.log("Script Iniciado");

var title = document.querySelector("h1");
title.textContent = "Javascript";

var city = document.querySelector("#city");
city.textContent = "São Paulo";

var personalDataArray = document.querySelectorAll('.dados_pessoais');
personalDataArray = Array.from(personalDataArray);

console.log(personalDataArray);
