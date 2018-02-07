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
    return '<a class="result"' +
           '   href="https://en.wikipedia.org/wiki/'+result.title+'">' +
           '  <h2 class="text-center">'+result.title+'</h2>' +
           '  <div class="text-center">'+result.snippet+'</div>' +
           '</a>';
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
