$(document).ready(function() {
  attachListeners();
    $("#front").show();
    $("#back").hide();
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
  };
}
