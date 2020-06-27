// Make connection
var socket = io.connect("http://localhost:8080");
var mySessionId = -1;
//Query DOM
var output = document.getElementById("output"),
  // deal = document.getElementById("deal"),
  hit = document.getElementById("hit"),
  stay = document.getElementById("stay");
replay = document.getElementById("replay");

// deal.addEventListener("click", function() {
//   socket.emit("deal", {});
// });
hit.addEventListener("click", function() {
  socket.emit("hit", {});
});
stay.addEventListener("click", function() {
  socket.emit("stay", {});
});
replay.addEventListener("click", function() {
  socket.emit("rePlay", {});
});

/*****
dealerHand: dealerCards,
players: players,
playerWithOption: playerWithOption
************/
socket.on("updateTable", function(data) {
  document.getElementById("output").innerHTML = "";
  if (mySessionId === data.playerWithOption) {
    hit.disabled = false;
    stay.disabled = false;
    replay.hidden = true;
  } else {
    hit.disabled = true;
    stay.disabled = true;
    replay.hidden = true;
  }

  output.innerHTML +=
    "<p id='dealer'><strong>Dealer: </strong>" + data.dealerHand + "</p>";

  for (var i = 0; i < data.players.length; i++) {
    output.innerHTML +=
      "<p id='player" +
      i +
      "'><strong>Player" +
      i +
      ": </strong>" +
      data.players[i].hand +
      "</p>";
  }

  if (data.playerWithOption === -3) {
    //show replay button
    replay.hidden = false;
  }
});

socket.on("disconnect", function(sessionId) {
  document.getElementById("player" + sessionId).innerHTML = "";
});

// socket.on("hit", function(players){
//   console.log(players);
//   for(var i = 0; i < players.length; i++) {
//     document.getElementById("player"+i).innerHTML = "<strong>Player"+ i +": </strong>" + players[i].hand;
//     if(players[i].busted){
//       setTimeout(alert("Player busted!"),50000);
//       hit.disabled = true;
//       stay.disabled = true;
//     }
//   }
// });
//
// socket.on("stay", function(data){
//   hit.disabled = true;
//   stay.disabled = true;
// });

socket.on("handshake", function(sessionId) {
  // show player sessionID
  mySessionId = sessionId;
  document.getElementById("playername").innerHTML =
    "<strong>You are Player" + sessionId + "</strong>";
});

socket.on("resetTable", function() {
  //
});
