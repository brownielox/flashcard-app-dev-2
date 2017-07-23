$(document).ready(function() {
  //use get method to ask for all subjects
  $.get("/subjects", function(data) {
    console.log(data);
  });
});
