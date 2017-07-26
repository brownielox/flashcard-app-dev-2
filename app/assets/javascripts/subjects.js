var cardsBySubject

$(document).on('turbolinks:load', function() {

  $.get(`${window.location.href}.json`, function(cards_returned_by_ajax){
    console.log(cards_returned_by_ajax);
    cardsBySubject = cards_returned_by_ajax;
    loadCards();
    // hideCards();
    attachFlipCard();
  })
  // ADD DESCRIPTION

  $("#subjects_button").click(function() {
    showSubjects();
  });
  $("#study_button").click(function() {
    studyCard(0);
  });
})

function loadCards() {
  cardsBySubject.forEach(function(c){
    $("#study_main").append(`<div class="card_holder"><h2 class="front">${c.front}</h2><h2 class="back">${c.back}</h2></div>`);
  });
}

// function hideCards() {
//   $(".card_holder").find(".back").hide();
//   $(".card_holder").find(".front").show();
// }

function studyCard(i) {
  // cardsBySubject.forEach(function(c){
  //   $("#study_main").append(`<div class="card_holder"><h2 class="front">${c.front}</h2><h2 class="back">${c.back}</h2></div>`).first();
  // });
  var c = cardsBySubject[i];
  $("#study_main").html("");
  $("#study_main").append(`<div class="card_holder"><h2 class="front">${c.front}</h2><h2 class="back">${c.back}</h2></div>`);
  // hideCards();
  attachFlipCard();
}

  // .next()


function attachFlipCard() {
  $(".card_holder").find(".back").hide();
  $(".card_holder").find(".front").show();
  $('.card_holder').click(function() {
    if ($(this).find(".front").is(":visible")) {
      $(this).find(".front").hide();
      $(this).find(".back").show();
    }
    else {
      $(this).find(".back").hide();
      $(this).find(".front").show();
    }
  });
}


  function showSubjects(){
    $.get(`/subjects.json`, function(subjects_json_from_api_request){
      $("#subjects_button").hide();
      $("#main").html("");
      subjects_json_from_api_request.forEach(function(subject){
        $("#main").append(`<a href=subjects/${subject.id}/cards><p id=${subject.id}>${subject.name}</p></a>`);
        $(`#${subject.id}`).click(function() {
        });
      });
    });
  };


  // function flipCard() {
  //   $.get(`/subjects/${id}/cards`, function(server_response){
  //     server_response.forEach(function(card){
  //       var f = `<div id=${card.id} class="card_holder"><div class="front">${card.front}</div><div class="back">${card.back}</div></div>`;
  //       $("body").append(f);
  //       $(".back").hide();
  //       $(`#${card.id}`).click(function() {
  //         if ($(this).find(".front").is(":visible")) {
  //           $(this).find(".front").hide();
  //           $(this).find(".back").show();
  //         }
  //         else {
  //           $(this).find(".back").hide();
  //           $(this).find(".front").show();
  //         }
  //       });
  //     })
  //   })
  // }
