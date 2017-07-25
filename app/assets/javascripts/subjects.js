$(document).ready(function() {
  //use get method to ask for all subjects
  // $().click(function(subjects_button_click)){
  $("#subjects_button").click(function() {
    showSubjects();
  });
})

  function showSubjects(){
    $.get(`/subjects.json`, function(subjects_json_from_api_request){
      console.log(subjects_json_from_api_request);
      $("#subjects_button").hide();
      $("#main").html("");
      subjects_json_from_api_request.forEach(function(subject){
      $("#main").append(`<a href=subjects/${subject.id}/cards><p>${subject.name}</p></a>`);
      });
    });
  };

  // function showCards(){
  //   $.get(`/subjects/${subject.id}/cards.json`, function(cards_json_from_api_request){
  //     $("#main").html("");
  //     cards_json_from_api_request.forEach(function(card){
  //       $("#main").append(`<a href=subjects/${subject.id}/cards><p>${card.front}</p></a>`);
  //     });
  //   });
  // });
