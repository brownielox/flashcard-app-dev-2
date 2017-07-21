$(document).ready(function() {
  console.log("cards.js")
  attachListeners();
  $("#front").html("perro").show();
  $("#back").html("dog").hide();

})

function attachListeners() {
  var front_visible = true;
  $('.card_holder').click(function() {
    if (front_visible) {
      $("#front").hide();
      $("#back").show();
      front_visible = false;
    }
    else {
      $("#back").hide();
      $("#front").show();
      front_visible = true;
    }
  });
}

function showCards() {
  $.get("/cards", function(server_response){
    server_response.forEach(function(card){
      var c = `<div>${card.front}</div>`
      $("")
    })
  });
}
