/////////////state & data/////////////
var state = {
  subjects: null,
  currentIndex: 0,
  currentSubject: null,
  data: [],
  view: "aSubject",
  userId: null
}
function getUserData(callback){
  $.get(`/subjects.json`, function(allInfo){
    state.subjects = allInfo;
    callback();
  })
};
/////////////show a card/////////////
//function Card(front, back, id, callback) {

//}

const Card = {
  init(front, back, id ) {
    this.front = front;
    this.back = back;
    this.id = id;
  },

  createCardHTML() {
    return `<div class="card_holder">
    <h2 class="front">${this.front}</h2>
    <h2 class="back">${this.back}</h2>
    <div class=mouse_button><button id="delete_${this.id}">Delete</button></div>
    </div>`
  }
}

Card.prototype
/////////////on load/////////////
$('document').ready(function() {
  getUserData(showSubjects);
  addButtons();
  $(document).on('click', '.card_holder', function(event){
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
/////////////show subjects on index/////////////
function showSubjects(){
  $("#main").html("");
  $("#header_div").html("");
  $("#main").append('<h2>Welcome to Flash/Card</h2>')
  state.subjects.forEach(function(subject){
    $("#main").append(`<p id=${subject.name}>${subject.name}</p>`);
    $(`#${subject.name}`).click(function() {
      state.currentSubject = subject
      CardService.getCards(subject, function(){});
    });
  });
  $(".phase0").show();
  $(".phase1, .phase2, .phase3").hide();
}

function createNewSubject() {
  $("#main").append(`
    <div id="new_subject">
    Subject:<br><input type="text" id="name" label="Subject"><br>
    <input type="submit" id="save" value="save">
    </form>
    </div>`);
    $("#save").click(function(){
      var name = $("#name").val();
      state.subjects.push({"name": name, "cards": []});
      $.ajax({
        type: 'POST',
        url: `/subjects`,
        data: {
          name: name
        }
      })
      showSubjects();
    });
  }
/////////////card service/////////////
var CardService = {

  getCards: function(subject, callback){
    $("#main").html("");
    $("#header_div").html(`${subject.name} cards`);
    subject.cards.forEach((card) =>{
      let c = new Card(card.front, card.back, card.id);
      $("#main").append(c.createCardHTML());
      $(`#delete_${card.id}`).click(function(){
        var subjectId = state.currentSubject.id;
        var cardId = `${card.id}`;
        CardService.deleteCard(subjectId, cardId, function(){});
        $(this).parent().parent().remove();
      })
    });
    $("#new_card_button").show();
    state.view = "aSubject"
    $(".phase0, .phase3").hide();
    $(".phase1, .phase2").show();
  },

  getCard: function(subject, cardIndex, callback){
    $("#main").html("");
    var card = subject.cards[cardIndex]
    let c = Card.init(card.front, card.back, card.id);
    $("#main").append(c.createCardHTML());
    $("#new_card_button").show();
    state.view = "aCard"
    $(".phase0, .phase2").hide();
    $(".phase1, .phase3").show();
  },

  deleteCard: function(subjectId, cardId, callback){
    $.ajax({
      type: 'DELETE',
      url: `/subjects/${subjectId}/cards/${cardId}.json`,
    })
  },

  newCardForm: function(){
    $("#main").append(`
      <div class="new_holder card_holder">
      <input type=hidden id="subjectId" label="language" value="${state.currentSubject.id}"><br>
      Front:<br><input type="text" id="front" label="front"><br>
      Back:<br><input type="text" id="back" label="back">
      <input type="submit" id="save" value="save">
      </form>
      </div>`);
      $("#save").click(function(){
        var subjectId = $("#subjectId").val();
        var front = $("#front").val();
        var back = $("#back").val();
        CardService.createNewCard(subjectId, front, back, function(){})
        $(".new_holder").remove();
      });
  },

  createNewCard: function(subjectId, front, back, callback){
    var card = new Card(front, back, subjectId);
    state.currentSubject.cards.push({
      id: subjectId,
      front: front,
      back: back
    });
    $("#main").append(card.createCardHTML());
    $.ajax({
      type: 'POST',
      url: `/subjects/${subjectId}/cards`,
      data: {
        subject_id: subjectId,
        front: front,
        back: back,
      }
    })
  },
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

  $("#new_subject_button").click(function() {
    createNewSubject();
  });
}
