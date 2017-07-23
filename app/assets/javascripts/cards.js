$(document).ready(function() {
  showCards();
})

function showCards() {
  $.get(`/subjects/1/cards`, function(server_response){
    server_response.forEach(function(card){
      var f = `<div id=${card.id} class="card_holder"><div class="front">${card.front}</div><div class="back">${card.back}</div></div>`;
      $("body").append(f);
      $(".back").hide();
      $(`#${card.id}`).click(function() {
        console.log(this);
        if ($(this).find(".front").is(":visible")) {
          $(this).find(".front").hide();
          $(this).find(".back").show();
        }
        else {
          $(this).find(".back").hide();
          $(this).find(".front").show();
        }
      });
    })
  });
}
