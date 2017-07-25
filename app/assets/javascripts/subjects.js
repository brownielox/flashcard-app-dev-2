$(document).on('turbolinks:load', function() {
  console.log('doc is ready')
  // ADD DESCRIPTION

  loadCards();
  attachFlipCard();
  $("#subjects_button").click(function() {
    showSubjects();
  });
  $("#study_button").click(function() {
    studyCard();
  });
})


function loadCards() {
  $(".card_holder").find(".back").hide();
  $(".card_holder").find(".front").show();
}

function studyCard() {
  $("#study_main").html("");
  $("#study_main").append(`<a href=subjects/${subject.id}/cards/${card.id}><p id="card_front">${card.front}</p></a>`);
}

function attachFlipCard() {
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
      $("#main").append(`<a href=subjects/${subject.id}/cards><p id="subject_name">${subject.name}</p></a>`);
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
