var apiURL = "https://en.wikipedia.org/w/api.php?callback=?";

$(document).ready(function() {
  $('#button').click(function() {
    $("#result").empty(); // clear prior search results
    $.getJSON(apiURL, {
        action: 'query',
        format: 'json',
        inprop: "url",
        formatversion: 2,
        generator: 'search',
        gsrsearch: $("wiki").val(),
        gsrwhat: "text",
        prop: 'extracts|info',
        exsentences: 3,
        exintro: "",
        explaintext: "",
        exlimit: 20,
      })
      .success(function(response) {
        //console.log(response);
        response.query.pages.forEach(function(resp) {
          $('#results').append(
            "<a href='" + resp.fullurl + "' target= '_blank'><div id='result'><h3>" + resp.title + "</h3><p = class='extract'>" + resp.extract + "</p></div>");
        })
      });
  }); // search

  //$('#button').click(function() {

  //}); // randomPage

  // trigger submit on use of enter key
  $("#wiki").keyup(function(event) {
    if (event.keyCode == 13) {
      $("#button").click();
    }
  });
});
