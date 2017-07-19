$(document).ready(function() {
  attachListeners();
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

  // $('#save').click(function() {
  //   saveGame();
  // });
}
