(function(module){
  var results = {};
  var resultsName = [];
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
  results.requestRepos();
  results.compile = function(){
    $(results.all.rows).each(function(i){
      resultsName.push(results.all.rows[i].firstname + " " + results.all.rows[i].lastname)
    });
    // for (var i = 1; i < results.all.rows.length; i += 1) {
    //   resultsName.push(results.all.rows[i].firstname + " " + results.all.rows[i].lastname)
    // };
  };
  module.results = results;
  module.resultsName = resultsName;
})(window);
