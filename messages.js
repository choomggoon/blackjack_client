// Make connection
var socket = io.connect("https://6j06c.sse.codesandbox.io/");

//Query DOM
var output = document.getElementById("output"),
  deal = document.getElementById("deal"),
  hit = document.getElementById("hit"),
  stay = document.getElementById("stay");

deal.addEventListener("click", function() {
  socket.emit("deal", {});
});
hit.addEventListener("click", function() {
  socket.emit("hit", {});
});
stay.addEventListener("click", function() {
  socket.emit("stay", {});
});

socket.on("deal", function(data) {
  document.getElementById("output").innerHTML = "";
  hit.disabled = false;
  stay.disabled = false;
  output.innerHTML +=
    "<p id='dealer'><strong>Dealer: </strong>" +
    data.hiddenDealerCards +
    "</p>";
  output.innerHTML +=
    "<p id='player'><strong>Player: </strong>" + data.playerCards + "</p>";
});

socket.on("hit", function(data) {
  document.getElementById("player").innerHTML =
    "<strong>Player: </strong>" + data.playerCards;
  if (data.playerBusted) {
    setTimeout(alert("Player busted! Dealer wins"), 50000);
    hit.disabled = true;
    stay.disabled = true;
  }
});

socket.on("stay", function(data) {
  hit.disabled = true;
  stay.disabled = true;
});

socket.on("showDealerHidden", function(dealerCards) {
  document.getElementById("dealer").innerHTML =
    "<strong>Dealer: </strong>" + dealerCards;
});

socket.on("dealerHit", function(dealerCards) {
  document.getElementById("dealer").innerHTML =
    "<strong>Dealer: </strong>" + dealerCards;
});

socket.on("announceWinner", function(winner) {
  alert(winner + " won!");
});
