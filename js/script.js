$(document).ready(function() {
  console.log("hiya");
  $(".loading").hide();
  $("#dropdown-menu").on("change", function() {
    $();
    const selected = $(this).val();
    if (selected !== " ") {
    }
    $(".loading").show();
    $("header").addClass("header-active");
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
        $(".stories").empty();
        $.each(data.results.slice(0, 12), function(key, value) {
          console.log(value.multimedia[4].url);
          $(".stories").append(
            `<li><a href=${
              value.url
            }><div class="snippet" style="background-image: url(${
              value.multimedia[4].url
            })">` + `<p>${value.abstract}</p></div></a></li>`
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
