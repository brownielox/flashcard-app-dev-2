var cardsBySubject
var currentIndex = 0
var current_subject
var data = []
var current_subject_id

function Card(front, back, id) {
  this.front = front;
  this.back = back;
  this.id = id;
  this.createCardHTML = function(){return `<div class="card_holder"><h2 class="front">${this.front}</h2><h2 class="back">${this.back}</h2>
  <div class=mouse_button><button id="delete_${this.id}">Delete</button></div>
  </div>`};
}

$(document).on('turbolinks:load', function() {
  showSubjects();
  $.get(`${window.location.href}.json`, function(cards_returned_by_ajax){
    cardsBySubject = cards_returned_by_ajax;
    loadCards();
    attachFlipCard();
    $(".new_card_holder").hide();
  });
  // ADD DESCRIPTION

  // $("#subjects_button").click(function() {
  // });

  $("#next_button").click(function() {
    $("#new_card_button").hide();
    currentIndex += 1;
    if (currentIndex === cardsBySubject.length) {
      currentIndex = 0;
    }
    studyCard(currentIndex);
  });

  $("#previous_button").click(function() {
    $("#new_card_button").hide();
    if (currentIndex === 0) {
      currentIndex = cardsBySubject.length - 1;
    }
    else {
      currentIndex -= 1;
    }

    studyCard(currentIndex);
  });


  $("#random_button").click(function() {
    $("#new_card_button").hide();
    currentIndex = Math.floor((Math.random() * cardsBySubject.length));
    studyCard(currentIndex);
  });

  $("#back_button").click(function() {
    $("#study_main").html("");
    loadCards();
    $(".new_card_holder").hide();
    attachFlipCard();
  });

  $("#new_card_button").click(function() {
    $(".new_card_holder").show();
  });

})

function grabCards() {
  $.get(`${window.location.href}.json`, function(cards_returned_by_ajax){
    cardsBySubject = cards_returned_by_ajax;
    loadCards();
    attachFlipCard();
  }).done(function() {
    $("#study_main").html("");
    loadCards();
    attachFlipCard();
    $(".new_card_holder").hide();
  })
}

function loadCards() {
  $('#subject_name').html(current_subject.name + " deck")
  $("#previous_button").hide();
  $("#new_card_button").show();
  cardsBySubject.forEach(function(c){

    var card = new Card(c.front, c.back, c.id);


    $("#study_main").append(card.createCardHTML());
    $(`#delete_${c.id}`).click(function(event){
      $.ajax({
        type: 'DELETE',
        url: `/cards/${c.id}`,
        success: function() {
          grabCards();
          console.log('Success')
        }
      });
    });
  });

  $("#study_main").append(`
    <div class="new_card_holder">
    <form class="form">
    <input type=hidden id="subject__name" label="language" value="${current_subject.id}">
    Front:<br>
    <input type="text" id="front" label="front"><br>
    Back:<br>
    <input type="text" id="back" label="back">
    <input type="submit" id="save" value="save">
    </form>
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
        grabCards();
        // $.get(`${window.location.href}.json`, function(cards_returned_by_ajax){
        //   cardsBySubject = cards_returned_by_ajax;
        //   loadCards();
        //   attachFlipCard();
        // }).done(function() {
        //   $("#study_main").html("");
        //   loadCards();
        //   attachFlipCard();
        //   $(".new_card_holder").hide();
        // })
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
    // console.log(i);
    $("#previous_button").show();
    var c = cardsBySubject[i];
    var newCard = new Card(c.front, c.back, c.id)
    $("#study_main").html("");
    $("#study_main").append(newCard.createCardHTML());
    // hideCards();
    attachFlipCard();
  }

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
      // $("#subjects_button").hide();
      $("#main").html("");
      $("#main").append('<h2>Welcome to Flash/Card</h2>')
      subjects_json_from_api_request.forEach(function(subject){
        $("#main").append(`<a href=subjects/${subject.id}/cards><p id=${subject.id}>${subject.name}</p></a>`);
        $(`#${subject.id}`).click(function() {
          current_subject = subject
          current_subject_id = subject.id
        });
      });
    });
  };
