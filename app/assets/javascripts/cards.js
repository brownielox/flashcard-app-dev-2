// $(document).ready(function() {
//   showCards();
// });
//
//
// function showCards(id) {
//   $.get(`/subjects/${id}/cards.json`, function(server_response){
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
//   // attachListeners();
//   // $("#front").html("perro").show();
//   // $("#back").html("dog").hide();
//
// // })
// //
// // function attachListeners() {
// //   var front_visible = true;
// //   $('.card_holder').click(function() {
// //     if (front_visible) {
// //       $(".front").hide();
// //       $(".back").show();
// //       front_visible = false;
// //     }
// //     else {
// //       $(".back").hide();
// //       $(".front").show();
// //       front_visible = true;
// //     }
// //   })
// // }
