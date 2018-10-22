$(document).ready(function() {
  console.log("hi how are you?");
  $(".loading").hide();
  $("#dropdown-menu").on("change", function() {
    const selected = $(this).val();
    if (selected !== " ") {
    }
    let url = `https://api.nytimes.com/svc/topstories/v2/${selected}.json`;
    url +=
      "?" +
      $.param({
        "api-key": "8397de144fcd4e17a0eadad84f2033cb"
      });
    $.ajax({
      url: url,
      method: "GET"
    })
      .done(function(data) {
        $(".loading").show();
        $(".stories").empty();
        $.each(data.results.slice(0, 12), function(key, value) {
          console.log(value.multimedia[4].url);
          $(".stories").append(
            `<a href=${value.url}><li><div style="background-image: url(${
              value.multimedia[4].url
            })">` + `<p>${value.abstract}</p></div></li></a>`
          );
        });
      }) // eo .done
      .fail(function(err) {
        throw err;
      }) // eo .fail
      .always(function() {
        $(".loading").hide();
      });
  }); // eo.on
}); // end of DOC
