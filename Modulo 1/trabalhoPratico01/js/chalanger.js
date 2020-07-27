window.addEventListener("load", start);

function start() {
  var redBar = document.querySelector("#redBar");
  var greenBar = document.querySelector("#greenBar");
  var blueBar = document.querySelector("#blueBar");

  document.querySelector("#redText").value = 0;
  document.querySelector("#greenText").value = 0;
  document.querySelector("#blueText").value = 0;

  updateDivColor();

  redBar.addEventListener("input", updateRedValue);
  redBar.value = 0;

  greenBar.addEventListener("input", updateGreenValue);
  greenBar.value = 0;

  blueBar.addEventListener("input", updateBlueValue);
  blueBar.value = 0;

  redBar.addEventListener("change", updateDivColor);
  blueBar.addEventListener("change", updateDivColor);
  greenBar.addEventListener("change", updateDivColor);
}

function updateRedValue(event) {
  var redText = document.querySelector("#redText");
  redText.value = event.target.value;
}

function updateGreenValue(event) {
  var greenText = document.querySelector("#greenText");
  greenText.value = event.target.value;
}

function updateBlueValue(event) {
  var blueText = document.querySelector("#blueText");
  blueText.value = event.target.value;
}

function updateDivColor() {
  var div = document.querySelector("#divColors");

  var redText = document.querySelector("#redText");
  var greenText = document.querySelector("#greenText");
  var blueText = document.querySelector("#blueText");

  var rgbString =
    "rgb(" + redText.value + "," + greenText.value + "," + blueText.value + ")";
  console.log(rgbString);
  div.style["background-color"] = rgbString;
}
