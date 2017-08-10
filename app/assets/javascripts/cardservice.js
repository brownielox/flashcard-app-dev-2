//card service callbacks

// var CardService = {
//
//   getCards: function(subjectId, callback){
//     return $.get(`/subjects/${subjectId}/cards.json`)
//       .done((cards) => {
//         $("#previous_button").hide();
//         $("#new_card_button").show();
//         return callback(cards);
//       });
//     },
//
//   getCard: function(subjectId, cardId, callback){
//     return $.get(`/subjects/${subjectId}/cards/${cardId}.json`)
//       .done((card) => {
//         return callback(card);
//       });
//     },
//
//   deleteCard: function(subjectId, cardId, callback){
//     return $.delete(`/subjects/${subjectId}/cards/${cardId}.json`)
//       .done((card) => {
//         return callback();
//       });
//     },
//
//   createCard: function(subject_id, front, back, callback){
//     var card = new Card(front, back, c.id);
//     $("#study_main").append(card.createCardHTML());
//         $.ajax({
//           type: 'POST',
//           url: '/cards',
//           data: {
//             subject_id: subject_id,
//             front: front,
//             back: back
//           })
//         .done(return callback());
//       });
//     },
//
//   updateCard: function(callback){
//     return $.patch(`/subjects/${subjectId}/cards/${cardId}.json`)
//       .done((card) => {
//         return callback(card);
//       });
//   }
// }
