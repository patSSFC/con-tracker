(function(module){
  var results = {};

  results.all = [];

  results.requestRepos = function() {
    $.ajax({
      url: '/database/',
      type: 'GET',

      success: function(data, message, xhr) {
        console.log(data);
        console.log(message);
        results.all = data;
      },
      error: function(data, status) {
        console.log(data);
        console.log(status);
      }
    });
  };
  module.results = results;
})(window);
