$(document).ready(function() {
  $("#dropdown-menu").on("change", function() {
    const selected = $(this).val();
    if (selected !== "") {
    }
  });

  let url = "https://api.nytimes.com/svc/topstories/v2/home.json";
  url +=
    "?" +
    $.param({
      "api-key": "8397de144fcd4e17a0eadad84f2033cb"
    });
  $.ajax({
    url: url,
    method: "GET"
  }) // eo $.ajax
    .done(function(data) {
      $(".stories").empty();
      $.each(data.results, function(key, value) {
        $(".stories").append(
          `<img src="${value.url}">` + `<p>${value.abstract}</p>`
        );
        console.log(data.results);
      });
    }) // eo .done
    .fail(function(err) {
      throw err;
    }); // eo .fail
}); // end of DOC
