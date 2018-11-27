$(document).ready(function() {
  console.log('hey');

  const $loader = $('.loading');
  const $stories = $('.stories');
  $loader.hide();
  $('#dropdown-menu').on('change', function() {
    const selected = $(this).val();
    if (!selected.length) {
      // (selected !== " ") {
      return;
    }

    // get stories from the API
    if (selected != ' ') {
      getStories(selected);
    }
  }); // end on change

  function getStories(selected) {
    $stories.empty();
    $loader.show();
    $('header').addClass('header-active');
    let url = `https://api.nytimes.com/svc/topstories/v2/${selected}.json`;
    url +=
      '?' +
      $.param({
        'api-key': '8397de144fcd4e17a0eadad84f2033cb'
      });
    $.ajax({
      url: url,
      method: 'GET'
    })
      .done(function(data) {
        $stories.empty();
        // console.log(data);
        let filterArticle = data.results.filter(function(value) {
          return value.multimedia[4];
        });
        const sliceArticle = filterArticle.slice(0, 12);

        for (let value of sliceArticle) {
          const { url, multimedia, abstract } = value;
          $stories.append(
            `<li><a href=${url}><div style="background-image: url(${
              multimedia[4].url
            })">` + `<p>${abstract}</p></div></a></li>`
          );
        }
      }) // eo .done
      .fail(function() {
        console.log('fail function is working');
        $stories.empty();
        $stories.append('Sorry there was an error. Please try again.');
      }) // eo .fail
      .always(function() {
        $loader.hide();
      });
  } // eo getStories
}); // end of DOC
