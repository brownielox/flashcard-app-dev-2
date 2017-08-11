/////////////state & data/////////////
var state = {
  subjects: null,
  currentIndex: 0,
  currentSubject: null,
  data: [],
  view: "aSubject"
}

function getUserData(callback){
  $.get(`/subjects.json`, function(all_info){
    state.subjects = all_info;
    callback();
  })
};

/////////////show a card/////////////

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

/////////////on load/////////////

$('document').ready(function() {
  getUserData(showSubjects);
  addButtons();
})

/////////////show subjects on index/////////////

function showSubjects(){
  $("#main").html("");
  $("#main").append('<h2>Welcome to Flash/Card</h2>')
  state.subjects.forEach(function(subject){
    $("#main").append(`<p id=${subject.name}>${subject.name}</p>`);
    $(`#${subject.name}`).click(function() {
      state.currentSubject = subject
      CardService.getCards(subject, function(){});
    });
  });
}

/////////////card service/////////////
var CardService = {

  getCards: function(subject, callback){
    $("#main").html("");
    subject.cards.forEach((card) =>{
      let c = new Card(card.front, card.back, card.id);
      $("#main").append(c.createCardHTML());
    });
    $("#new_card_button").show();
    turnOverCard();
    state.view = "aSubject"
  },

  getCard: function(subject, cardIndex, callback){
    $("#main").html("");
    var card = subject.cards[cardIndex]
    let c = new Card(card.front, card.back, card.id);
    $("#main").append(c.createCardHTML());
    $("#new_card_button").show();
    turnOverCard();
    state.view = "aCard"
  },

  deleteCard: function(subjectId, cardId, callback){
    return $.delete(`/subjects/${subjectId}/cards/${cardId}.json`)
    .done((card) => {
      return callback();
    });
  },

  newCardForm: function(){
    console.log("hellow orl");
    $("#main").append(`
      <div class="new_card_holder">
      <form class="back">
      <div class="new_card_holder">
      <input type=hidden id="subject_name" label="language" value="${state.currentSubject.id}">
      <br>
      Front:<br>
      <input type="text" id="front" label="front"><br>
      Back:<br>
      <input type="text" id="back" label="back">
      <input type="submit" id="save" value="save">
      </form>
      <h2 class="front">Make a New Card</h2>
      </div>`)
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
  },

  updateCard: function(callback){
    return $.patch(`/subjects/${subjectId}/cards/${cardId}.json`)
    .done((card) => {
      return callback(card);
    });
  }
}

/////////////study actions/////////////

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

/////////////buttons/////////////

function addButtons() {
  $("#study_button").click(function() {
    CardService.getCard(state.currentSubject, state.currentIndex, function(){});
  });

  $("#next_button").click(function() {
    $("#new_card_button").hide();
    if (state.currentIndex === state.currentSubject.cards.length - 1) {
      state.currentIndex = 0;
    }
    else {
      state.currentIndex += 1;
    }
    CardService.getCard(state.currentSubject, state.currentIndex, function(){});
  });

  $("#previous_button").click(function() {
    $("#new_card_button").hide();
    if (state.currentIndex === 0) {
      state.currentIndex = state.currentSubject.cards.length - 1;
    }
    else {
      state.currentIndex -= 1;
    }
    CardService.getCard(state.currentSubject, state.currentIndex, function(){});
  });

  $("#random_button").click(function() {
    $("#new_card_button").hide();
    state.currentIndex = Math.floor((Math.random() * state.currentSubject.cards.length));
    CardService.getCard(state.currentSubject, state.currentIndex, function(){});
  });

  $("#back_button").click(function() {
    $("#new_card_button").hide();
    $("#study_main").html("");
    if (state.view === "aSubject") {
      showSubjects();
    }
    else if (state.view === "aCard"){
      CardService.getCards(state.currentSubject, function(){});
    }
  });

  $("#new_card_button").click(function() {
    CardService.newCardForm();
  });
}
