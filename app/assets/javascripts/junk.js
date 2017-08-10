// function grabCards() {
//   $.get(`${window.location.href}.json`, function(cards_returned_by_ajax){
//     cardsBySubject = cards_returned_by_ajax;
//     loadCards();
//     attachFlipCard();
//   }).done(function() {
//     $("#study_main").html("");
//     loadCards();
//     attachFlipCard();
//     $(".new_card_holder").hide();
//   })
// }






// function loadCards() {
//   $('#subject_name').html(current_subject.name + " deck")
//
//   cardsBySubject.forEach(function(c){
//
//     var card = new Card(c.front, c.back, c.id);
//     $("#study_main").append(card.createCardHTML());
//     $(`#delete_${c.id}`).click(function(event){
//       CardService.deleteCard(current_subject.id, c.id, CardService.getCards(current_subject.id, c.id, function(){}));
//       });
//     });
//
//   $("#study_main").append(`
//     <div class="new_card_holder">
//     <form class="form">
//     <input type=hidden id="subject__name" label="language" value="${current_subject.id}">
//     Front:<br>
//     <input type="text" id="front" label="front"><br>
//     Back:<br>
//     <input type="text" id="back" label="back">
//     <input type="submit" id="save" value="save">
//     </form>
//     </div>`)
//     $("#save").click(function(event) {
//       event.preventDefault();
//       var front = $('#front').val();
//       var back = $('#back').val();
//       CardService.newCard(current_subject.id, front, back);
//
//     })
//   }
