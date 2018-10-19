$(document).ready(function() {
  $("#dropdown-menu").on("change", function() {
    const selected = $(this).val();
    if (selected !== "") {
      console.log(selected);
    }
  });
}); // end of DOC
// $.JSON({
//   method: "GET",
//   url:
//     "https://newsapi.org/v2/top-headlines?" +
//     "country=us&canada" +
//     "apiKEY=8397de144fcd4e17a0eadad84f2033cb"
// });
let url = "https://api.nytimes.com/svc/topstories/v2/home.json";
url +=
  "?" +
  $.param({
    "api-key": "8397de144fcd4e17a0eadad84f2033cb"
  });
$.ajax({
  url: url,
  method: "GET"
})
  .done(function(result) {
    console.log(result);
  })
  .fail(function(err) {
    throw err;
  });
