$(document).ready(function() {
  console.log("👻 Boo!");
  $(".loading").hide();
  $("#dropdown-menu").on("change", function() {
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
        let filterdata = data.results.filter(function(value) {
          return value.multimedia.length;
        });
        filterdata = filterdata.slice(0, 12);

        console.log(data);
        $.each(filterdata, function(key, value) {
          $(".stories").append(
            `<li><a href=${value.url}><div style="background-image: url(${
              value.multimedia[4].url
            })">` + `<p>${value.abstract}</p></div></a></li>`
          );
        });
      }) // eo .done
      .fail(function(err) {
        $(".stories").empty(err);

        throw err;
        $(".stories").empty();
        $(".stories").append("Sorry there was an error. Please try again.");
        console.log(err);
      }) // eo .fail
      .always(function() {
        $(".loading").hide();
      });
  }); // eo.on
}); // end of DOC
