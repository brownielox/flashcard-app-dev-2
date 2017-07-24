$(document).ready(function() {
  //use get method to ask for all subjects

  $("#subjects_button").click(function(){
    $.get(`/subjects.json`, function(subjects_json_from_api_request){
      console.log(subjects_json_from_api_request);
      $("#main").html("");
      subjects_json_from_api_request.forEach(function(subject){
        $("#main").append(`<a href=subjects/${subject.id}/cards><p>${subject.name}</p></a>`);
      });
    });
  });
});
