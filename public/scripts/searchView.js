(function(module){
  var results = {};
  var availableTags = [];
  results.all = [];

  results.requestRepos = function() {
    $.ajax({
      url: '/database/',
      type: 'GET',

      success: function(data, message, xhr) {
        console.log(data);
        console.log(message);
        results.all = data;
        results.compile();
      },
      error: function(data, status) {
        console.log(data);
        console.log(status);
      }
    });
  };
  results.requestRepos();
  results.compile = function(){
    $(results.all.rows).each(function(i){
      availableTags.push(results.all.rows[i].firstname + " " + results.all.rows[i].lastname)
    });
  };
  $(function() {

      $( "#searchField" ).autocomplete({
        source: availableTags
      });
      $('.searchBtn').on('click', function(){
          var userInput = $('#searchField').val();
          console.log(userInput);
      });
    });
  module.results = results;
  module.resultsName = resultsName;
  module.availableTags = availableTags;
})(window);
