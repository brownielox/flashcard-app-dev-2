/////////////state & data///////////////
var state = {
currentSubjectId: null,
subjects: null,
currentIndex: 0,
current_subject: null,
data: [],
userSubjects: null,
}

function getUserData(callback){
  $.get(`/subjects.json`, function(all_info){
    state.subjects = all_info;
    callback();
  })
};


///////////show a card//////////////
function Card(front, back, id) {
  this.front = front;
  this.back = back;
  this.id = id;
  this.createCardHTML = function() {
    return `<div class="card_holder">
      <h2 class="front">${this.front}</h2>
      <h2 class="back">${this.back}</h2>
      <div class=mouse_button><button id="delete_${this.id}">Delete</button></div>
      </div>`
    };
  }


/////////////on load///////////////

$('document').ready(function() {
  getUserData(showSubjects);
})



/////////show subjects on index///////////

  function showSubjects(){
    $("#main").html("");
    $("#main").append('<h2>Welcome to Flash/Card</h2>')
    state.subjects.forEach(function(subject){
      $("#main").append(`<p id=${subject.name}>${subject.name}</p>`);
      $(`#${subject.name}`).click(function() {
        state.current_subject = subject
        CardService.getCards(subject, function(){});
      });
    });
  }



//////////////////card service///////////////////
  var CardService = {

    getCards: function(subject, callback){
      $("#main").html("");
          subject.cards.forEach((card) =>{
            let c = new Card(card.front, card.back, card.id);
            $("#main").append(c.createCardHTML());
          });
          $("#previous_button").hide();
          $("#new_card_button").show();
          addButtons();
          turnOverCard();
      },

    getCard: function(subject, cardId, callback){
      $("#main").html("");
          subject.cards.cardId((card) =>{
            let c = new Card(card.front, card.back, card.id);
            $("#main").append(c.createCardHTML());
          });
          $("#previous_button").hide();
          $("#new_card_button").show();
          addButtons();
          turnOverCard();
      },

    deleteCard: function(subjectId, cardId, callback){
      return $.delete(`/subjects/${subjectId}/cards/${cardId}.json`)
        .done((card) => {
          return callback();
        });
      },

    createNewCard: function(subject_id, front, back, callback){
      var card = new Card(front, back, c.id);
      $("#study_main").append(card.createCardHTML());
          $.ajax({
            type: 'POST',
            url: '/card',
            data: {
              subject_id: subject_id,
              front: front,
              back: back
            }
          })
        // .done(return callback());
      // });
    },

    updateCard: function(callback){
      return $.patch(`/subjects/${subjectId}/cards/${cardId}.json`)
        .done((card) => {
          return callback(card);
        });
    }
  }



//////////study actions/////////
  function flipCard(i) {
    $("#previous_button").show();
    var c = cardsBySubject[i];
    var newCard = new Card(c.front, c.back, c.id)
    $("#study_main").html("");
    $("#study_main").append(newCard.createCardHTML());
  }

  function turnOverCard() {
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

/////////////buttons///////////////

  function addButtons() {
    $("#next_button").click(function() {
      $("#new_card_button").hide();
      currentIndex += 1;
      if (currentIndex === cardsBySubject.length) {
        currentIndex = 0;
      }
      studyCard(findcurrentIndex);
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
      flipCard();
    });

    $("#new_card_button").click(function() {
      $(".new_card_holder").show();
    });
  }
