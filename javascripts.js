function attachListeners() {
  $('td').click(function() {
    doTurn(this);
  });

  $('#save').click(function() {
    saveGame();
  });
