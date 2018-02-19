function fetch(query) {
  return $.ajax({
    url: 'http://en.wikipedia.org/w/api.php',
    data: { action: 'query',
            list: 'search',
            srsearch: query,
            format: 'json' },
    dataType: 'jsonp',

  });
  console.log(query);
}

function render(results) {
  var $out = $("#results");
  var html = results.map(function(result) {
    return '<ul><a href="https://en.wikipedia.org/wiki/' + result.title +'">' +
           '<li><h2 class="heading">' + result.title + '</h2>' +
           '<div class="info">' + result.snippet + '</div>' +
           '</li></a></ul>';
  }).join("\n\n");
  $out.html("");
  $(html).appendTo($out);
}

$(".search-form").on("submit", function(event) {
  event.preventDefault();
  var query = $("#wiki").val();
  fetch(query)
    .done(function(data) {
      console.log(data);
      render(data.query.search);
    });
});
