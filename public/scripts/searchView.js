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
          $('.search-contain').fadeOut();
          setTimeout(function() {
            $('.header-container').append($('.search-contain'));

          }, 400)
          $('.search-contain').fadeIn('slow');
          $('.search-section').delay(400).slideUp(1000);
          $('.header').css('top', '0');
          $('.poli-view').css('margin-top', '10em');
          console.log(userInput);
      });
    });
  module.results = results;
  module.availableTags = availableTags;
})(window);
