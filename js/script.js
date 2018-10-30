$(document).ready(function() {
  console.log("hey");

  const $loader = $(".loading");
  const $stories = $(".stories");
  $loader.hide();
  $("#dropdown-menu").on("change", function() {
    const selected = $(this).val();
    if (!selected.length) {
      // (selected !== " ") {
      return;
    }
    $stories.empty();
    $loader.show();
    // get stories from the API
    getStories(selected);
  }); // end on change

  function getStories(selected) {
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
        $stories.empty();
        // console.log(data);
        let filterArticle = data.results.filter(function(value) {
          return value.multimedia.length;
        });
        const sliceArticle = filterArticle.slice(0, 12);
        // $.each(data.results.slice(0, 12), function(key, value) {
        //   $stories.append(
        //     `<li><a href=${value.url}><div style="background-image: url(${
        //       value.multimedia[4].url
        //     })">` + `<p>${value.abstract}</p></div></a></li>`
        //   );
        // });
        for (let value of sliceArticle) {
          const { url, multimedia, abstract } = value;
          $stories.append(
            `<li><a href=${url}><div style="background-image: url(${
              multimedia[4].url
            })">` + `<p>${abstract}</p></div></a></li>`
          );
        }
      }) // eo .done
      .fail(function(err) {
        console.log("fail function is working");
        $stories.empty();
        throw err;
        // $stories.append("Sorry there was an error. Please try again.");
      }) // eo .fail
      .always(function() {
        $loader.hide();
      });
  } // eo getStories
}); // end of DOC
