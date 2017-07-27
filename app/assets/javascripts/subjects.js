var cardsBySubject
var currentIndex = 0
var current_subject
var data = []
var current_subject_id

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
    studyCard(currentIndex);
    $("#study_button").hide();
  });

  $("#next_button").click(function() {
    currentIndex += 1;
    if (currentIndex === cardsBySubject.length) {
      currentIndex = 0;
    }
    studyCard(currentIndex);
  });

  $("#random_button").click(function() {
    currentIndex = Math.floor((Math.random() * cardsBySubject.length));
    studyCard(currentIndex);
  });

  $("#back_button").click(function() {
    $("#study_main").html("");
    loadCards();
    attachFlipCard();

    // $("#study_button").hide();
  });

})

function loadCards() {
  $('#subject_name').html(current_subject.name)
  cardsBySubject.forEach(function(c){
    $("#study_main").append(`<div class="card_holder"><h2 class="front">${c.front}</h2><h2 class="back">${c.back}</h2></div>`);
  });
  $("#study_main").append(`
    <div class="new_card_holder">
    <form class="back">
    <div class="new_card_holder">
    <input type=hidden id="subject_name" label="language" value="${current_subject.id}">
    <br>
    Front:<br>
    <input type="text" id="front" label="front"><br>
    Back:<br>
    <input type="text" id="back" label="back">
    <input type="submit" id="save" value="save">
    </form>
    <h2 class="front">Make a New Card</h2>
    </div>`)
    $("#save").click(function(event) {
      event.preventDefault();
      var new_front = $('#front').val();
      var new_back = $('#back').val();
      // console.log(new_front);
      // console.log(new_back);
      $.ajax({
        type: 'POST',
        url: '/cards',
        data: {
          // subject_id: 1,
          // user_id: 1,
          subject_id: current_subject_id,
          front: new_front,
          back: new_back
        },
      }).done(function() {
        $("#study_main").html("");
        loadCards();
        attachFlipCard();
      })
    })
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
          current_subject = subject
          current_subject_id = subject.id
        });
      });
    });
  };

  // function newCard(){
  //   $(".card_holder").html(subject_name_var)
  //   cardsBySubject.forEach(function(c){
  //     $("#study_main").append(`<div class="card_holder"><h2 class="front">${c.front}</h2><h2 class="back">${c.back}</h2></div>`);
  //   });
  // }

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
